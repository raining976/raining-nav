<template>
    <div class="suggestionContainer">

    </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["goSearch"]);
const props = defineProps({
    keyWord:{
        type:String,
        required:true
    }
})


const keyboardEvents = (keyCode, event) => {
    if (keyCode == 13) {
        goSearch()
    }
}

// 触发父组件搜索事件
const goSearch = (val, type = 1) => {
  emit("goSearch", val, type);
};


</script>