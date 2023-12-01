<template>
    <div :class="['weatherTimeContainer', status.siteStatus == 'focus' ? 'focus' : null]">
        <div class="time">
            <div class="clock">
                <span class="hour">{{ timeData.hour ?? "00" }}</span>
                <span class="separator">:</span>
                <span>{{ timeData.minute ?? "00" }}</span>
                <div class="secondBox" v-show="settings.isShowSeconds">
                    <span class="separator">:</span>
                    <span>{{ timeData.second ?? "00" }}</span>
                </div>
            </div>
            <div class="solarTime date">
                <span>{{ timeData.month }}</span>
                <span>月</span>
                <span>{{ timeData.day }}</span>
                <span>日</span>
            </div>
            <div class="lunarTime date" v-show="settings.isShowLunar">
                <span>{{ lunarTime.monthStr }}</span>
                <span>{{ lunarTime.dayStr }}&nbsp;</span>
                <span>{{ lunarTime.ncWeek }}</span>
            </div>
        </div>
        <div class="weather">
            <div class="cityName">{{ weatherData.cityName }}</div>
            <div class="condition">{{ weatherData.condition }}</div>
            <div class="temp">{{ weatherData.temp }}℃</div>
            <div class="wind">{{ weatherData.windDir }}{{ weatherData.windLevel }}级</div>
        </div>
    </div>
</template>

<script setup>
import { getCurTime } from '@/utils/timeUtil';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useSettingsStore, useStatusStore } from '../store';
import { getWeather } from '@/api';
const settings = useSettingsStore();
const status = useStatusStore();

const timeData = ref({});
const timeInterval = ref(null);
const lunarTime = ref({});
const weatherData = ref({});

const updateTime = () => {
    timeData.value = getCurTime();
    lunarTime.value = timeData.value.lunar

}

const getWeatherData = () => {
    getWeather().then(({ data }) => {
        const res = data.result
        weatherData.value = res.condition
        console.log('weatherData', weatherData.value)
    })
}

onMounted(() => {
    updateTime()
    getWeatherData()
    timeInterval.value = setInterval(() => {
        updateTime()
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(timeInterval.value);
})

</script>

<style lang="scss" scoped>
.weatherTimeContainer {
    .time {
        @include flex-center(true);
        transition: 0.3s;

        .clock {
            font-size: 4rem;

            .separator {
                animation: twinkle 1s linear infinite;
            }
        }

        .date {
            opacity: 0.9;
        }

        .solarTime {
            font-size: 1.5rem
        }
    }

    &.focus {
        
        .time {
            transform: translateY(-60px) scale(0.9);
            opacity: 1;
        }
        .weather{
            transform: translateY(-60px) scale(0.7);
            opacity: 0
        }
    }
    .weather{
        @include flex-center();
        transition: 0.3s;
        div{
            margin: 0 4px
        }
    }
}
</style>