<template>
    <div :class="['searchBar', status.siteStatus == 'focus' ? 'focus' : null]">
        <div class="mask" @click="closeInput()" @contextmenu.stop="(event) => {
            event.preventDefault();
        }
            "></div>
        <div class="all">
            <div class="engine iconBox" @click="changeEngine">
                <transition name="fade" mode="out-in">
                    <SvgIcon :iconName="`icon-${settings.searchEngine}`" :key="settings.searchEngine" />
                </transition>
            </div>
            <input type="text" id="main-input" class="searchInput" @focus="focusInput" v-model="status.searchInputValue"
                @keydown.enter.prevent="handleEnter" @compositionstart="isComposing = true"
                @compositionend="isComposing = false" @input="onInputting">
            <div class="searchBtn iconBox" @click="goSearch(status.searchInputValue)">
                <transition name="fade" mode="out-in">
                    <SvgIcon :iconName="`icon-search`" />
                </transition>
            </div>
        </div>
        <!-- 搜索引擎切换版面 -->
        <ChangeEngine />
        <!-- 搜索建议版面 -->
        <Suggestions ref="suggestionsRef" :keyWord="status.searchInputValue" @toSearch="goSearch" />
    </div>
</template>
<script setup>
import { useSettingsStore, useStatusStore } from '@/store'
import defaultEngine from "@/assets/defaultEngine.json";
import {debounce} from "@/utils/debounce.js"
import { ref } from 'vue';
const settings = useSettingsStore()
const status = useStatusStore()
const isComposing = ref(true) // 是否正在输入拼音 如果正在上输入 此时回车不应该执行搜索

/**
 * 修改搜索引擎
 */
const changeEngine = () => {
    status.setEngineChangeStatus(true)
    status.setSiteStatus('focus');
}

const focusInput = () => {
    status.setSiteStatus('focus');
}

const handleEnter = () => {
    if (isComposing) {
        goSearch(status.searchInputValue)
    }
}

/**
 * 关闭输入框调用 单纯的脱焦并不能完全覆盖所有情况
 */
const closeInput = () => {
    status.setSiteStatus('normal');
    status.setEngineChangeStatus(false);
}


/**
 * 前往搜索页面
 * @param {string} val 最终搜索的字符串
 * @param {number} [type] 搜索类型 默认为 1 表示搜索引擎搜索
 */
const goSearch = (val, type = 1) => {
    const searchValue = val?.trim()
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
                // console.log('engine', engine.url)
                jumpLink(engine?.url + searchFormat)
                break;

            default:
                break;
        }
    }

}

/**
 * 处理输入
 */
const onInputting = debounce(()=>{
    const keywords = status.getSearchInputValue()
    console.log('keywords',keywords)
})

</script>
<style lang="scss" scoped>
$height : 42px;

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
        background-color: #00000070;
    }

    .all {
        position: relative;
        @include flex-center();
        width: 100%;
        margin: 0 auto;
        transition: transform 0.3s;

    }

    .engine {
        position: absolute;
        left: calc($height/3);
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        cursor: pointer;
    }

    .searchInput {
        width: 100%;
        height: 100%;
        height: $height;
        background-color: #00000040;
        backdrop-filter: blur(10px);
        border-radius: calc($height);
        margin: 20px 0;
        padding: 0 calc($height);
        color: #fff;
        font-size: 1rem;
        opacity: 1;
        animation: fade-up-in 0.7s cubic-bezier(0.37, 0.99, 0.36, 1);
        transition: transform 0.3s, background-color 0.3s, opacity 0.5s;

    }

    .searchBtn {
        cursor: pointer;
        position: absolute;
        right: calc($height/3);
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
    }

    &.focus {
        .all {
            transform: translateY(-60px);
            opacity: 1;

            .searchInput {
                background-color: #f1eaea;
                color: #333;
                opacity: 1;
            }

            .iconBox :deep(svg) {
                fill: #333;
            }

        }



    }

}
</style>