<template>
    <Cover @loadComplete="loadComplete" />
    <Transition name="fade " mode="out-in">
        <main id="main" v-if="!status.coverLoading" tabindex="0" @keydown="globalPressDown">
            <WeatherTime />
            <SearchBar />
            <YiYan />
        </main>
        <div v-else id="loading">
            <Loading />
        </div>
    </Transition>
</template>

<script setup>
import { getGreeting } from "@/utils/timeUtil.js"
import { onMounted, ref, nextTick } from 'vue'
import { useCounterStore, useStatusStore } from "@/store"

const store = useCounterStore()
const status = useStatusStore()
const welcomeText = import.meta.env.VITE_WELCOME_TEXT || ''

onMounted(() => {

})

const hello = () => {
    let helloText = getGreeting()
    ElMessage({
        dangerouslyUseHTMLString: true,
        message: `<strong>${helloText}</strong>,${welcomeText}`,
        center: true,
        duration: 3000,
        icon: '',
        type: 'info',
        offset: 30
    })
}

// 加载完成事件
const loadComplete = () => {
    nextTick().then(() => {
        hello()
    });
};

const globalPressDown = (e) => {
    const code = e.keyCode
    if (code == 13) {
        // 聚焦搜索框
        let mainInput = document.getElementById('main-input')
        status.siteStatus = 'focus'
        mainInput?.focus()
    }
    if( code == 27){
        // 搜索框失焦
        let mainInput = document.getElementById('main-input')
        status.siteStatus = 'normal'
        mainInput?.blur()
        document.getElementById('main').focus()
        
    }

}


</script>

<style lang="scss" scoped>
#main,
#loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    z-index: 2; // 要大于1 不然会被背景的蒙版挡住
    outline: none;

}

#main {
    // transform: translateY(-100px);
}
</style>
