<template>
    <div class="YiYanContainer" :class="['YiYanContainer', status.siteStatus]">
        <transition name="slide-fade" @after-leave="handleAfterLeave">
            <div class="text" id="hitokoto" v-show="isShow" @click="refreshSentence">{{ hitokoto }}</div>
        </transition>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getOneSentence } from '@/api/index.js';
import { useStatusStore, useSettingsStore } from '../store';
const status = useStatusStore()
const settings = useSettingsStore()
const hitokoto = ref(null)
const isShow = ref(false)
const curIndex = ref(0) // 用户自定义语句当前索引
const timer = ref(null)
const hitokotoScript = ref(null)
onMounted(() => {
    getSentence()
    startTimer()
})
onBeforeUnmount(() => {
    destroyTimer()
})
const startTimer = () => {
    timer.value = setInterval(() => {
        refreshSentence()
    }, settings.refreshYiYanTime * 1000)
}

const destroyTimer = () => {
    clearInterval(timer.value)
}

const refreshTimer = () => {
    destroyTimer()
    startTimer()
}

/**
 * 动画离开后回调
 */
const handleAfterLeave = () => {
    getSentence()
}

/**
 * 刷新一言 这里执行隐藏 是因为隐藏动画执行完后自动执行获取新的
 */
const refreshSentence = () => {
    if(hitokotoScript.value){
        document.body.removeChild(hitokotoScript.value)
        hitokotoScript.value = null
    }
    refreshTimer()
    hiddenText()
}

/**
 * 显示一言
 */
const showText = (timeout = 300) => {
    setTimeout(() => {
        isShow.value = true
    }, timeout);
}

/**
 * 隐藏一言
 */
const hiddenText = () => {
    isShow.value = false
}

const getSentence = async () => {
    const len = settings.customYiYan.length
    if (len != 0) {
        hitokoto.value = settings.customYiYan[curIndex.value]
        curIndex.value++
        if (curIndex.value >= len) {
            curIndex.value = 0
        }
        showText()

    } else {
        hitokoto.value = await getOneSentence()
        // hitokotoScript.value = await getOneSentence()
        showText()
    }


}
</script>

<style scoped lang="scss">
.YiYanContainer {
    @include flex-center(true);
    position: absolute;
    bottom: 30px;
    transition: 0.3s;
    font-size: 1rem;
    color: #fff;
    width: 100%;
    margin: 0 auto;

    &.focus {
        bottom: 10px;
        font-size: 0.8rem;
        opacity: 0;
    }

    .text {
        cursor: pointer;
    }
}

.slide-fade-leave-active,
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}



.slide-fade-enter-from {
    transform: translateX(-20px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>