<template>
    <Transition name="unfold" mode="out-in">
        <div class="suggestionsContainer" v-if="status.getSearchInputValue() != '' && status.getSiteStatus() == 'focus' && !status.getEngineChangeStatus()">
            <div class="suggestionListBox" ref='suggestionsRef' :style="{ height: suggestionContainerHeight + 'px' }"
                style="transition: height 0.3s ease;" @keydown="keyboardEvents"
                >
                <div class="listItem" v-for="(item, index) in suggestionList" :tabindex="1" :key="index" @click="goSearch(item),console.log(item)">
                    <div>
                        <SvgIcon :iconName="`icon-search`" />
                    </div>
                    <div class="text"> {{ item }}</div>
                </div>
            </div>
            <div class="tipBox">
                <div class="loadingBox" v-show="isLoading">
                    <div class="loading-spinner"></div>
                </div>
                <div class="emptyTip" v-show="!isLoading && suggestionList.length == 0">空空如也~</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { getSearchSuggestions } from "@/api";
import { useStatusStore } from "@/store";
import { debounce } from "@/utils/debounce.js";
const status = useStatusStore()
const emit = defineEmits(["goSearch", "focusInputDom"]);
const suggestionList = ref([]); // 搜索建议列表
const suggestionContainerHeight = ref(0); // 搜索建议容器高度
const isLoading = ref(false);
const props = defineProps({
    keyword: { // 搜索关键词
        type: String,
        required: true
    },
    inputRef: { // input元素
        required: true
    }
})

const curTabIndex = ref(-1); // tab聚焦索引
const suggestionsRef = ref(null) // suggestions的容器dom

// 监听搜索框变化
watch(
    () => props.keyword,
    (val) => {
        suggestionList.value = []
        isLoading.value = true
        associativeSearch(val)
    }
);

watch(
    () => suggestionList.value.length,
    (newLen, oldLen) => {
        if (newLen > 0) {
            updateContainerHeight()
        } else {
            suggestionContainerHeight.value = 0
        }
    })

/**
 * 搜索联想
 *  @param val 当前输入框中的值(用户输入的值)
 */
const associativeSearch = debounce(async (val) => {
    if (val != '') {

        suggestionList.value = await getSearchSuggestions(val)
        isLoading.value = false
    }
}, 500)


/**
 * 键盘事件处理
 * @param {number} keyCode 键盘码
 * @param {object} event 对应的event对象
 */
const keyboardEvents = (e) => {
    const keyCode = e.keyCode;
    const isCtrlPressed = e.ctrlKey
    const isShiftPressed = e.shiftKey
    switch (keyCode) {
        case 27: // esc
            status.setSearchInputValue('')
            status.setSiteStatus('normal')
            document.getElementById("main").focus()
            break
        case 40: // 下键
            focusDom()
            break
        case 9: // tab键
            e.preventDefault()
            focusDom(!isShiftPressed)
            break;
        case 13:// enter键
            const val = props.inputRef.value
            goSearch(val)
            break
        case 38: // ⬆️键
            e.preventDefault()
            focusDom(false)
            break
        case 74: // j 下
        case 75: // k 上
            if (isCtrlPressed) // 同时按下ctrl
                focusDom(keyCode == 74)
            break
        default:
            break;
    }
}

/**
 * 调用父组件事件
 * @param {string} val  搜索内容
 * @param {number} [type] 类型 默认为1 搜索引擎搜索
 */
const goSearch = (val, type = 1) => {
    emit("goSearch", val, type);
};

/**
 * 聚焦搜索框元素以及搜索建议元素
 * @param {boolean} [isNext] 是否聚焦下一个 默认为true false为聚焦上一个
 */
const focusDom = (isNext = true) => {
    if (!suggestionsRef.value || !suggestionsRef.value.children.length !=0) return
    const curIndex = curTabIndex.value
    const suggestions = suggestionsRef.value.children
    const len = suggestionList.value.length

    if (isNext) {
        switch (curIndex) {
            case -1:
                suggestions[0]?.focus()
                curTabIndex.value = 0
                break;
            case len - 1:
                const { inputRef } = props
                inputRef.focus()
                curTabIndex.value = -1
                break
            default:
                suggestions[curIndex + 1]?.focus()
                curTabIndex.value++
                break;
        }
    } else {
        switch (curIndex) {
            case -1:
                suggestions[len - 1]?.focus()
                curTabIndex.value = len - 1
                break;
            case 0:
                const { inputRef } = props
                inputRef.focus()
                curTabIndex.value = -1
                break
            default:
                suggestions[curIndex - 1]?.focus()
                curTabIndex.value--
                break;
        }
    }
    updateInputValue()

}

/**
 * 更新搜索框中的内容 但是不更新最终搜索的那个内容
 */
const updateInputValue = () => {
    const index = curTabIndex.value
    if (index >= 0) {
        const val = suggestionList.value[index]
        props.inputRef.value = val
    }
}

const updateContainerHeight = () => {
    nextTick(() => {
        if (suggestionsRef.value)
            suggestionContainerHeight.value = suggestionsRef.value.scrollHeight
    })
}

// 将子组件的方法暴露出去
defineExpose({ keyboardEvents });

</script>


<style lang="scss" scoped>
.suggestionsContainer {
    position: relative;
    color: #fff;
    width: 100%;
    border-radius: 20px;
    min-height: 35px;
    background-color: $default-background-color;
    transform: translateY(-70px);
    overflow: hidden;
    transition: height 0.3 ease !important;

    .tipBox {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        @include flex-center();
        line-height: 35px;

        .loadingBox {
            height: 35px;
            @include flex-center();

            .loading-spinner {
                border: 3px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top: 3px solid #ffffff50;
                width: 12px;
                height: 12px;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }

        }

        .emptyTip {
            font-size: 14px;
        }

    }

    .listItem {
        display: flex;
        align-items: center;
        padding: 5px 20px;
        height: 25px;
        outline: none;
        transition: 0.3s;
        cursor: pointer;

        div {
            transition: 0.3s;

        }

        .text {
            margin: 0 10px;
        }

        &:hover,
        &:focus {
            background-color: $active-color;

            div {
                transform: translateX(3px);
            }
        }
    }
}

/* 使用 CSS 过渡属性实现平滑过渡效果 */
.unfold-enter-active,
.unfold-leave-active {
    transition: height 0.5s;
}

/* 定义进入过渡的起始状态和结束状态 */
.unfold-enter,
.unfold-leave-to {
    height: 0;
    opacity: 0;
    overflow: hidden;
}
</style>