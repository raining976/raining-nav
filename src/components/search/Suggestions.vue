<template>
    <Transition name="fadeDown" mode="out-in">
        <div class="suggestionContainer" ref='suggestionsRef' @keydown="keyboardEvents"
            v-if="status.getSearchInputValue() != '' && status.getSiteStatus() == 'focus' && !status.getEngineChangeStatus()">
            <div class="listItem" v-for="(item, index) in suggestionList" :tabindex="1" :key="index">
                <div>
                    <SvgIcon :iconName="`icon-search`" />
                </div>
                <div class="text"> {{ item }}</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { getSearchSuggestions } from "@/api";
import { useStatusStore } from "@/store";
import { debounce } from "@/utils/debounce.js";
const status = useStatusStore()
const emit = defineEmits(["goSearch", "focusInputDom"]);
const suggestionList = ref([]); // 搜索建议列表
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
        associativeSearch(val)
    }
);

/**
 * 搜索联想
 *  @param val 当前输入框中的值(用户输入的值)
 */
const associativeSearch = debounce(async (val) => {
    val != '' && (suggestionList.value = await getSearchSuggestions(val))
}, 500)


/**
 * 键盘事件处理
 * @param {number} keyCode 键盘码
 * @param {object} event 对应的event对象
 */
const keyboardEvents = (e) => {
    const keyCode = e.keyCode;
    const isCtrlPressed = e.ctrlKey
    switch (keyCode) {
        case 27:
            status.setSiteStatus('normal')
            document.getElementById("main").focus()
            break
        case 40: // 下键
        case 9: // tab键
            e.preventDefault()
            focusDom()
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
    if (!suggestionsRef.value) return
    const curIndex = curTabIndex.value
    const suggestions = suggestionsRef.value.children
    const len = suggestions.length

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

// 将子组件的方法暴露出去
defineExpose({ keyboardEvents });

</script>


<style lang="scss" scoped>
.suggestionContainer {
    color: #fff;
    width: 100%;
    border-radius: 20px;

    background-color: $default-background-color;
    transform: translateY(-70px);
    overflow: hidden;

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
</style>