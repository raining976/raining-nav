<template>
    <div class="YiYanContainer" :class="['YiYanContainer', status.siteStatus]">
        <transition name="slide-fade" @after-leave="handleAfterLeave">
            <div class="text" v-show="isShow" @click="refreshSentence">{{ hitokoto }}</div>
        </transition>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getOneSentence } from '@/api/index.js';
import { useStatusStore } from '../store';
const status = useStatusStore()
const hitokoto = ref(null)
const isShow = ref(false)
onMounted(() => {
    getSentence()
})

const handleAfterLeave = () => {
    getSentence()
}

const refreshSentence = () => {
    hiddenText()
}

const showText = ()=>{
    isShow.value = true
}

const hiddenText = ()=>{
    isShow.value = false
}
const getSentence = () => {
    getOneSentence().then(({ data }) => {
        hitokoto.value = data.hitokoto
        showText()
    })

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
    .text{
        cursor: pointer;
    }
}

.slide-fade-leave-active,
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}



.slide-fade-enter-from{
    transform: translateX(-20px);
    opacity: 0;
}
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>