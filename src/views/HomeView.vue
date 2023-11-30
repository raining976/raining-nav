<script setup>
import {useCounterStore} from "@/store"
const store = useCounterStore()
function add(){
    ElMessage('test')
}
</script>

<template>
{{ store.count }}
<br>
<button @click="store.increment(),add()">add</button>
</template>