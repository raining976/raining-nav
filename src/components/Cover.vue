<template>
    <div class="cover">
        <img ref="imgRef" v-show="!status.coverLoading" :class="['background',status.siteStatus == 'focus' ? 'focus' : null]" alt="background" :src="bgUrl" @load="imgLoadComplete"
            @animationend="imgAnimationEnd" :style="{ '--blur': settings.backgroundBlur + 'px' }" />
    </div>
</template>

<script setup>
import { useStatusStore, useSettingsStore } from '../store';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getRandomNumber } from '@/utils/random.js'
const emit = defineEmits(["loadComplete"]);
const status = useStatusStore()
const settings = useSettingsStore()
const bgUrl = ref(null)
const imgTimeout = ref(null)
const imgRef = ref(null)

const imgLoadComplete = () => {
    imgTimeout.value = setTimeout(() => {
        status.setCoverLoading(false)
    }, getRandomNumber(600, 300));
}

const setBgUrl = () => {
    // bgUrl.value = 'https://source.unsplash.com/random/2560x1440'
    bgUrl.value = 'https://tuapi.eees.cc/api.php?category=biying&type=302'
}


// 图片动画完成
const imgAnimationEnd = () => {
    console.log("壁纸加载且动画完成");
    // 加载完成事件
    emit("loadComplete");
};

onMounted(() => {
    setBgUrl()
    // setBgSize()
})
onBeforeUnmount(() => {
    clearTimeout(imgTimeout.value)
})
</script>

<style lang="scss" scoped>
.cover {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: var(--body-background-color);
    // background-color: rgba(255, 255, 255, 0.5); /* 背景颜色，设置透明度 */

    .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        backface-visibility: hidden;
        filter: blur(var(--blur));
        transform: scale(1.2);
        transition: filter 0.3s, transform 0.3s;
        animation: fade-blur-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        &.focus{
            transform: scale(1.3);
            filter: blur(8px);
        }
    }
    &::after{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
    }
}
</style>
