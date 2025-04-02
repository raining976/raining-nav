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
import { getCover } from "@/api";
const emit = defineEmits(["loadComplete"]);
const status = useStatusStore()
const settings = useSettingsStore()
const bgUrl = ref(null)
const imgTimeout = ref(null)
const imgRef = ref(null)

/**
 * 随机时间让图片加载完成
 */
const imgLoadComplete = () => {
    imgTimeout.value = setTimeout(() => {
        status.setCoverLoading(false)
    }, getRandomNumber(600, 300));
}

/**
 * 设置图片url
 */
const setBgUrl = async () => {
    // bgUrl.value = 'https://bing.img.run/uhd.php'
    bgUrl.value = await getCover()
    console.log('bgUrl.value',bgUrl.value)
    
}

/**
 * 图片动画加载完成的回调
 */
const imgAnimationEnd = () => {
    emit("loadComplete");
};

onMounted(() => {
    setBgUrl()
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
