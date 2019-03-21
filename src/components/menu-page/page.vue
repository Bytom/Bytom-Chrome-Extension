<template>
    <div class="mp bg-sideBar">
        <div>
            <i class="iconfont btn-close" @click="$router.go(-1)">&#xe614;</i>
            <div class="menu-title">{{title}}</div>
        </div>
        <div class="menu-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: ""
    },
    methods: {
    }
};
</script>

<style scoped>
.mp {
    height: 560px;
    width: 260px;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
