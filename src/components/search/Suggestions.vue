<template>
    <Transition name="fadeDown" mode="out-in">
        <div class="suggestionContainer"
            v-if="status.getSearchInputValue() != '' && status.getSiteStatus() == 'focus' && !status.getEngineChangeStatus()">
            <div class="listItem" v-for="(item, index) in suggestionList" tabindex="0" :key="index">
                <div>
                    <SvgIcon :iconName="`icon-search`" />
                </div>
                <div class="text"> {{ item }}</div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getSearchSuggestions } from "@/api";
import { useStatusStore } from "@/store";
const status = useStatusStore()
const emit = defineEmits(["goSearch"]);
const suggestionList = ref([]); // 搜索建议列表
const props = defineProps({
    keyWord: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    suggestionList.value = await getSearchSuggestions('测试')

})

/**
 * 键盘事件处理
 * @param {number} keyCode 键盘码
 * @param {object} event 对应的event对象
 */
const keyboardEvents = (keyCode, event) => {
    if (keyCode == 13) {
        goSearch()
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