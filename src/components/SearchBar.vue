<template>
    <div class="searchBar">
        <input type="text" class="searchInput">
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
$height : 50px;

.searchBar {
    position: relative;
    width: 100%;
    @include flex-center();
    width: 60%;
    max-width: 800px;
    min-width: 400px;

    .searchInput {
        width: 100%;
        height: 100%;
        height: $height;
        background-color: #00000070;
        border-radius: calc($height);
        margin: 20px 0;
        // filter: blur(2px);
        padding: 0 calc($height/2);
        color: #fff;

        backdrop-filter: blur(10px);
        opacity: 1;
        animation: fade-up-in 0.7s cubic-bezier(0.37, 0.99, 0.36, 1);
        transition: transform 0.3s, background-color 0.3s, opacity 0.5s;

    }


}
</style>