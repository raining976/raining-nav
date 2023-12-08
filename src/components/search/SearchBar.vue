<template>
    <div :class="['searchBar', status.siteStatus == 'focus' ? 'focus' : null]">
        <div class="mask" @click="closeInput()" @contextmenu.stop="(event) => {
            event.preventDefault();
        }
            "></div>
        <div class="all">
            <div class="engine  iconBox" @click="changeEngine" :class="{ focus: 'focus' == status.getSiteStatus() }">
                <transition name="fade" mode="out-in">
                    <SvgIcon :iconName="`icon-${settings.searchEngine}`" :key="settings.searchEngine" />
                </transition>
            </div>
            <input type="text" id="main-input" class="searchInput" ref="inputRef" v-model="status.searchInputValue"
                @focus="focusInput" @keydown.stop="pressedKeyboard" :placeholder="searchTip">
            <div class="searchBtn iconBox" :class="{ focus: 'focus' == status.getSiteStatus() }"
                @click="goSearch(status.searchInputValue)">
                <transition name="fade" mode="out-in">
                    <SvgIcon :iconName="`icon-search`" />
                </transition>
            </div>
        </div>
        <!-- 搜索引擎切换版面 -->
        <ChangeEngine />
        <!-- 搜索建议版面 -->
        <Suggestions ref="suggestionsRef" :inputRef="inputRef" :keyword="status.searchInputValue" @goSearch="goSearch" />
    </div>
</template>
<script setup>
import { useSettingsStore, useStatusStore } from '@/store'
import defaultEngine from "@/assets/defaultEngine.json";
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
const settings = useSettingsStore()
const status = useStatusStore()
const suggestionsRef = ref(null)
const inputRef = ref(null)

const searchTip = import.meta.env.VITE_INPUT_TIP || "" // 搜索提示词

/**
 * 修改搜索引擎
 */
const changeEngine = () => {
    status.setEngineChangeStatus(true)
    status.setSiteStatus('focus');
}

/**
 * 聚焦input事件
 */
const focusInput = () => {
    status.setSiteStatus('focus');
    status.setEngineChangeStatus(false)
}


/**
 * 父组件处理键盘事件
 * @param {event} e 键盘按键事件
 */
const pressedKeyboard = (e) => {
    suggestionsRef.value?.keyboardEvents(e)
}

/**
 * 关闭输入框调用 单纯的脱焦并不能完全覆盖所有情况
 */
const closeInput = () => {
    status.setSiteStatus('normal');
    status.setEngineChangeStatus(false);
    status.setIsShowSettings(false)
}


/**
 * 前往搜索页面
 * @param {string} val 最终搜索的字符串
 * @param {number} [type] 搜索类型 默认为 1 表示搜索引擎搜索
 */
const goSearch = (val, type = 1) => {
    const searchValue = val?.trim()
    /**
     * 根据跳转方式不同进行跳转
     * @param {string} url 目标url
     */
    const jumpLink = (url) => {
        if (settings.urlJumpType === "href") {
            window.location.href = url;
        } else if (settings.urlJumpType === "open") {
            window.open(url, "_blank");
        }
    };
    if (searchValue) {
        const searchFormat = encodeURIComponent(searchValue);
        // console.log("前往搜索：" + searchValue, type);
        switch (type) {
            // 默认搜索
            case 1:
                const engine = defaultEngine[settings.searchEngine];
                jumpLink(engine?.url + searchFormat)
                break;

            default:
                break;
        }
    } else {
        openEmptyTip()
    }

}

/**
 * 搜索内容为空的提示
 */
const openEmptyTip = () => {
    ElMessage({
        message: '搜索内容不能为空哦~',
        grouping: true
    })
}



</script>
<style lang="scss" scoped>
$height : 42px;

$iconWidth: calc($height * 1.3);

.searchBar {
    position: relative;
    width: 60%;
    max-width: 800px;
    min-width: 400px;
    margin: 0 auto;
    @include flex-center(true);

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        // background-color: #00000040;
    }

    .all {
        position: relative;
        @include flex-center();
        width: 100%;
        margin: 0 auto;
        transition: transform 0.3s;


    }

    .iconBox {
        width: $iconWidth;
        height: $height;
        @include flex-center();
        position: absolute;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        border-radius: calc($height / 2);
        z-index: 1;
        transition: 0.3s;

        &:hover {
            background-color: #00000060;
        }

        &.focus:hover {
            background-color: #00000030;
        }

    }

    .engine {
        left: 0;
    }

    .searchBtn {
        right: 0;
    }

    .searchInput {
        width: 100%;
        height: 100%;
        height: $height;
        background-color: #00000040;
        backdrop-filter: blur(10px);
        border-radius: calc($height);
        margin: 20px 0;
        padding: 0 $iconWidth;
        color: #fff;
        font-size: 1rem;
        opacity: 1;
        animation: fade-up-in 0.7s cubic-bezier(0.37, 0.99, 0.36, 1);
        transition: transform 0.3s, background-color 0.3s, opacity 0.5s;

        &::-webkit-input-placeholder {
            color: #fff;
            font-family: Helvetica;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            transition: 0.3s;
        }

    }



    &.focus {
        .all {
            transform: translateY(-60px);
            opacity: 1;

            .searchInput {
                background-color: #f1eaea;
                color: #333;
                opacity: 1;
                &::placeholder{
                    color: transparent;

                }
            }

            .iconBox :deep(svg) {
                fill: #333;
            }

        }



    }

}
</style>