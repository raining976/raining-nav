<template>
    <div class="settingsContainer">
        <div class="btnBox">
            <div class="settingBtn" @click="openSettings">
                <SvgIcon iconName="icon-setting" />
            </div>
        </div>
        <Transition name="fadeDown" mode="out-in">
            <div class="listBox" v-show="status.isShowSettings">
                <div class="list">
                    <div class="title">时间相关</div>
                    <div class="item">
                        <div class="text">12小时制</div>
                        <div class="handler"><el-switch v-model="settings.is12Time" /></div>
                    </div>
                    <div class="item">
                        <div class="text">是否显示秒</div>
                        <div class="handler"><el-switch v-model="settings.isShowSeconds" /></div>
                    </div>
                    <div class="item">
                        <div class="text">是否显示农历</div>
                        <div class="handler"><el-switch v-model="settings.isShowLunar" /></div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">背景相关</div>
                    <div class="item">
                        <div class="text">模糊度</div>
                        <div class="handler sliderContainer"><el-slider v-model="settings.backgroundBlur" size="small"
                                :max="20" /></div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">搜索相关</div>
                    <div class="item">
                        <div class="text">默认搜索引擎</div>
                        <div class="handler"><span class="changeEngine" @click="changeEngine">前往修改</span></div>
                    </div>
                    <div class="item">
                        <div class="text">链接打开方式</div>
                        <div class="handler">
                            <el-select v-model="settings.urlJumpType" size="small">
                                <el-option label="当前页面打开" value="href" />
                                <el-option label="在新页面打开" value="open" />
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="title">一言</div>
                    <div class="item">
                        <div class="text">一言刷新间隔(秒,0为不刷新)</div>
                        <div class="handler"><el-input-number class="yiYanTimeInput" size="small" controls-position="right"
                                v-model="settings.refreshYiYanTime" :min="0"
                                @change="settings.setRefreshYiYanTime(value)" /></div>
                    </div>
                    <div class="item inputTagItem">
                        <div class="text">自定义一言</div>
                        <div class="handler ">
                            <InputTag />
                        </div>
                    </div>

                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { useSettingsStore, useStatusStore } from "@/store"
const settings = useSettingsStore()
const status = useStatusStore()

/**
 * 打开设置菜单
 */
const openSettings = () => {
    status.isShowSettings = !status.isShowSettings
    if (status.isShowSettings) {
        status.setSiteStatus('normal')
    }
}

/**
 * 更改搜索引擎
 */
const changeEngine = () => {
    status.setEngineChangeStatus(true)
    status.setIsShowSettings(false)
}
</script>

<style lang="scss" scoped>
.settingsContainer {
    $width: 350px;
    position: fixed;
    top: 20px;
    right: 30px;
    z-index: 1;

    .btnBox {
        width: 100%;
        display: flex;
        justify-content: end;

        .settingBtn {

            width: 30px;
            height: 30px;
            border-radius: 5px;
            @include flex-center();
            cursor: pointer;
            transition: 0.3s;

            .settingTipP {
                outline: none !important;
            }

            :deep(svg) {
                width: 20px;
                height: 20px;
                fill: #ffffff70;
                transition: all 0.3s;
            }

            &:hover {
                background-color: #ffffff40;

                :deep(svg) {
                    fill: #ffffff;
                    transform: scale(1.2);
                }
            }

        }
    }

    .listBox {
        width: $width;
        color: #fff;
        background-color: #ffffff10;
        backdrop-filter: blur(8px);
        padding: 10px;
        border-radius: 10px;
        font-size: 14px;
        margin: 10px 0;

        .list {
            @include flex-center(true);

            .title {
                align-self: flex-start;
                font-size: 16px;
                font-weight: bold;
                margin-top: 8px;
            }

            .item {
                width: 100%;
                min-height: 30px;
                line-height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .sliderContainer {
                    display: flex;
                    align-items: center;
                    width: 50%;
                }

                &.inputTagItem {
                    align-items: start;
                }

                .yiYanTimeInput {
                    width: 90px;
                    :deep(.el-input-number__decrease),
                    :deep(.el-input-number__increase) {
                        &:hover~.el-input .el-input__wrapper{
                            box-shadow: 0 0 0 1px #ffffff inset;
                        }
                        
                    }
                    :deep(.el-input__wrapper){
                        padding-right: 30px;
                    }
                    :deep(.el-input-number__decrease),
                    :deep(.el-input-number__increase),
                    :deep(.el-input__wrapper) {
                        background-color: #ffffff40;

                        .el-icon {
                            color: #ffffff;
                        }

                    }
                }
            }
        }

        .changeEngine {
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 3px;
            background-color: #ffffff20;
            font-size: 12px;
            transition: 0.3s;

            &:hover {
                background-color: #ffffff60;
            }
        }
    }
}
</style>

<style>
/* 全局样式不需要深度选择器 */
/* 切换按钮 */
.el-switch .el-switch__core {
    background-color: #ffffff90 !important;
    border: #00000090 1px solid !important;
}

.el-switch.is-checked .el-switch__core {
    background-color: #00000070 !important;
    border-color: #ffffff70 !important;
}

/* 选择器 */
.el-select .el-input .el-input__wrapper {
    width: 100px;
}

.el-select .el-input .el-input__wrapper,
.el-select .el-input.is-focus .el-input__wrapper.is-focus,
.el-input__wrapper.is-focus {
    transition: all 0.3s !important;
    background-color: #ffffff40 !important;
    border-color: #00000090 !important;
    box-shadow: none !important;
}

.el-select .el-input .el-select__caret {
    transition: all 0.3s !important;
    color: #fff !important;
}

.el-input__inner {
    transition: all 0.3s !important;
    color: #fff !important;
}

.el-select-dropdown__item.selected {
    background-color: #ffffff90 !important;
    color: #192c4a !important;
}

.el-select-dropdown__item:hover {
    background-color: #ffffff !important;
    color: #192c4a !important;


}

.el-select-dropdown__item {
    transition: all 0.3s !important;
    background-color: #00000040 !important;
    color: #efefef !important;
}

.el-slider__bar {
    background-color: #00000040;
}

.el-scrollbar {
    width: 110px;
}

.el-select-dropdown__item {
    padding: 0 5px !important;
    font-size: 12px;
}

.el-popper__arrow::before,
.el-select__popper,
.el-select-dropdown,
.el-scrollbar {
    background-color: transparent !important;
    backdrop-filter: blur(8px);
    border-radius: 3px;
    overflow: hidden;
}

.el-select-dropdown__list {
    background-color: #00000040 !important;
}


/* 滑块 */
.el-slider__button {
    border-color: #00000090;
    transform: scale(0.7);
}

.el-slider__button.hover {
    transform: scale(0.9) !important;
}</style>