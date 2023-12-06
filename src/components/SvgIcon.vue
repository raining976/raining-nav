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

/**
 * icon类名 通过icon名字计算得到
 */
const iconClassName = computed(() => {
    return `#${props.iconName}`;
})

/**
 * svg的类名 
 */
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
    fill: #fff;
    vertical-align: -2px;
}
</style>