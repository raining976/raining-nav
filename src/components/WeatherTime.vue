<template>
    <div>
        <div class="time">
            <div class="clock">
                <span class="hour">{{ timeData.hour ?? "00" }}</span>
                <span class="separator">:</span>
                <span>{{ timeData.minute ?? "00" }}</span>
                <span class="separator">:</span>
                <span>{{ timeData.second ?? "00" }}</span>
            </div>
            <div class="solarTime date">
                <span>{{ timeData.month }}</span>
                <span>月</span>
                <span>{{ timeData.day }}</span>
                <span>日</span>
            </div>
            <div class="lunarTime date">
                <span>{{ lunarTime.monthStr }}</span>
                <span>{{ lunarTime.dayStr }}&nbsp;</span>
                <span>{{ lunarTime.ncWeek }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurTime } from '../utils/timeUtil';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const timeData = ref({});
const timeInterval = ref(null);
const lunarTime = ref({});

const updateTime = () => {
    timeData.value = getCurTime();
    lunarTime.value = timeData.value.lunar

}


onMounted(() => {
    updateTime()
    timeInterval.value = setInterval(() => {
        updateTime()
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(timeInterval.value);
})

</script>

<style lang="scss" scoped>
.time {
    @include flex-center(true);
    .clock {
        font-size: 4rem;
        .separator {
            animation: twinkle 1s linear infinite;
        }
    }
    .date{
        opacity: 0.9;
    }
    .solarTime {
        font-size: 1.5rem
    }
}
</style>