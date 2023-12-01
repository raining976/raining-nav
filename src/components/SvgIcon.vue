<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName" />
    </svg>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
    iconName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: 'i-icon'
    }
})


const iconClassName = computed(() => {
    return `#${props.iconName}`;
})

const svgClass = computed(() => {
    return props.className ? `i-icon ${props.className}` : "i-icon";
})

</script>

<style scoped lang="scss">
.i-icon {
    width: 1em;
    height: 1em;
    min-width: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
}
</style>