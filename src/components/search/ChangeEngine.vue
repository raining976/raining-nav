<template>
    <Transition name="fadeUnfold" mode="out-in">
        <div class="changeEngineContainer" v-if="status.getEngineChangeStatus()">
            <el-row :gutter="10" justify="start">
                <el-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12" v-for="(engine, key) in engines" :key="key">
                    <div class="engineItem" :class="{ active: key == settings.searchEngine }" @click="selectCurEngine(key)">
                        <SvgIcon :iconName="`icon-${engine.icon}`" />
                        <span class="engineName">{{ engine.name }}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
    </Transition>
</template>

<script setup>
import { useStatusStore, useSettingsStore } from '@/store';
import engines from "@/assets/defaultEngine.json"
const status = useStatusStore()
const settings = useSettingsStore()

/**
 * 选择当前的搜索引擎
 * @param {string} engine 搜索引擎名字 也就是 搜索引擎数组中的图标名称
 */
const selectCurEngine = (engine)=>{
    settings.setSearchEngine(engine)
    status.setEngineChangeStatus(false)
    // status.setSiteStatus('normal') 
}


</script>

<style lang="scss" scoped>

$transition-duration: 300ms;
.changeEngineContainer {
    $offsetX: 5px;
    $gapY: 5px;
    position: absolute;
    top: 10px;
    left: -$offsetX;
    width: calc(100% - $offsetX*2);
    max-height: calc(250px);
    z-index: 2;
    padding: 10px;
    background-color: $default-background-color;
    border-radius: 10px;
    overflow: auto;

    .engineItem {
        position: relative;
        display: flex;
        align-items: center;
        padding: 10px 10px;
        color: #fff;
        border-radius: 10px;
        margin: $gapY 0;
        cursor: pointer;
        background-color: $default-color;
        transition: $transition-duration;
        .engineName {
            margin: 0 10px;
        }

        &.active {
            background-color: $active-color;
            &::before {
                content: '';
                position: absolute;
                border-radius: 14px;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border: 2px solid $active-color;
            }
        }

        &:hover {
            background-color: $active-color;
            box-shadow: 0 0 0px 2px $active-color;
            // 如果是当前选择的item 隐藏一下边框
            &::before {
                opacity: 0;
            }

        }

    }
}


</style>