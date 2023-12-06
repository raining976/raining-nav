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
                <span class="amPm" v-if="settings.getIs12Time()">{{ timeData.amPm }}</span>
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

const timeData = ref({}); // 时间数据
const timeInterval = ref(null); // 时间定时器
const lunarTime = ref({}); // 阴历数据
const weatherData = ref({}); // 天气数据

/**
 * 更新时间
 */
const updateTime = () => {
    timeData.value = getCurTime(settings.getIs12Time());
    lunarTime.value = timeData.value.lunar
}

/**
 * 获取天气信息
 */
const getWeatherData = () => {
    getWeather().then(({ data }) => {
        const res = data.result
        weatherData.value = res.condition
    })
}

onMounted(() => {
    updateTime()
    getWeatherData()
    startTimer()
});

/**
 * 开始定时器
 */
const startTimer = () => {
    timeInterval.value = setInterval(() => {
        updateTime()
    }, 1000);
}

/**
 * 介绍定时器
 */
const endTimer = () => {
    if (timeInterval.value)
        clearInterval(timeInterval.value)
}

onBeforeUnmount(() => {
    endTimer()
})

</script>

<style lang="scss" scoped>
.weatherTimeContainer {
    color: #fff;
    margin-top: 150px;

    .time {
        @include flex-center(true);
        transition: 0.4s;

        .clock {
            font-size: 4rem;
            .amPm{
                font-size: 1.4rem;
                opacity: 0.8;
                margin-left: 10px;
            }
            .separator {
                animation: twinkle 1s linear infinite;
            }
        }

        .date {
            opacity: 0.8;

        }

        .solarTime {
            font-size: 1.5rem
        }
    }

    .weather {
        opacity: 0.8;
    }

    &.focus {

        .time {
            transform: translateY(-30px) scale(0.9);
            opacity: 1;
        }

        .weather {
            transform: translateY(-30px) scale(0.7);
            opacity: 0
        }
    }

    .weather {
        @include flex-center();
        transition: 0.5s;

        div {
            margin: 0 4px
        }
    }
}</style>