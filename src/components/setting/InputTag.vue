<template>
    <div class="tagContainer">
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20 input" size="small" maxlength="20"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button class="newTagBtn" v-else type="info" effect="plain" size="small" @click="showInput">
            + New YiYan
        </el-button>
        <el-tag class="tagItem mx-1" type="info" effect="plain"  v-for="(tag, index) in settings.customYiYan" :key="index" closable :disable-transitions="false"
            @close="handleClose(index)">
            {{ tag }}
        </el-tag>
    </div>
</template>
  
<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { ElInput } from 'element-plus'
import { useSettingsStore } from '../../store';

const settings = useSettingsStore()

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (index: number) => {
    settings.customYiYanDel(index)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        settings.customYiYanPush(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.tagContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;
    .tagItem{
        margin: 2px 0;
        background-color: #ffffff40;
        color: #fff;
        :deep(.el-tag__close){
            color: #fff;
        }
    }

    .el-tag--info{
        justify-content: space-between;
    }
    .newTagBtn{
        background-color: #ffffff40;
        border: none;
        &:hover{
            background-color: #ffffff80;
        }
    }
    .input{
        width: 200px;
    }
}
</style>
  