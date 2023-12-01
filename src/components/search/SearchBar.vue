<template>
    <div :class="['searchBar', status.siteStatus == 'focus' ? 'focus' : null]">
        <div class="mask"></div>
        <div class="all">
            <div class="engine" @click="changeEngine">
                <transition name="fade" mode="out-in">
                    <SvgIcon :iconName="`icon-${settings.searchEngine}`" :key="settings.searchEngine" />
                </transition>
            </div>
            <input type="text" id="main-input" class="searchInput" @focus="focusInput" @blur="blurInput"
                v-model="status.searchInputValue" @keydown.enter.prevent="handleEnter" @compositionstart="isComposing = true"
                @compositionend="isComposing = false">
            <div class="searchBtn" @click="goSearch(status.searchInputValue)">
                <transition name="fade" mode="out-in">
                    <SvgIcon :iconName="`icon-search`" />
                </transition>
            </div>
            <Suggestions ref="suggestionsRef" :keyWord="status.searchInputValue" @toSearch="goSearch" />
        </div>
    </div>
</template>
<script setup>
import { useSettingsStore, useStatusStore } from '@/store'
import defaultEngine from "@/assets/defaultEngine.json";
import { ref } from 'vue';
const settings = useSettingsStore()
const status = useStatusStore()
const isComposing = ref(true)

const changeEngine = () => {
    // TODO: 修改搜索引擎 打开引擎页
}

const focusInput = () => {
    status.siteStatus = 'focus'
}
const blurInput = () => {
    status.siteStatus = 'normal'
}
const handleEnter = () => {
    if(isComposing) {
        goSearch(status.searchInputValue)
    }
}




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
        console.log("前往搜索：" + searchValue, type);
        switch (type) {
            // 默认搜索
            case 1:
                const engine = defaultEngine[settings.searchEngine];
                console.log('engine', engine.url)
                jumpLink(engine?.url + searchFormat)
                break;

            default:
                break;
        }
    }

}

</script>
<style lang="scss" scoped>
$height : 42px;

.searchBar {
    width: 100%;

    // .mask {
    //     position: fixed;
    //     left: 0;
    //     top: 0;
    //     width: 100vw;
    //     height: 100%;
    //     z-index: -1;
    //     background-color: #00000070;
    // }

    .all {
        position: relative;
        @include flex-center();
        width: 60%;
        max-width: 800px;
        min-width: 400px;
        margin: 0 auto;
        transition: transform 0.3s;

    }

    .engine {
        position: absolute;
        left: calc($height/3);
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
    }

    .searchInput {
        width: 100%;
        height: 100%;
        height: $height;
        background-color: #00000070;
        border-radius: calc($height);
        margin: 20px 0;
        padding: 0 calc($height);
        color: #fff;
        font-size: 1rem;
        backdrop-filter: blur(10px);
        opacity: 1;
        animation: fade-up-in 0.7s cubic-bezier(0.37, 0.99, 0.36, 1);
        transition: transform 0.3s, background-color 0.3s, opacity 0.5s;

    }

    .searchBtn {
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

            .searchBtn,
            .engine {
                color: #333;
            }
        }



    }

}
</style>