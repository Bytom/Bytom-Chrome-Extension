<template>
    <div class="mp bg-gray">
        <div>
            <i class="iconfont btn-close" @click="$router.go(-1)">&#xe605;</i>
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
    height: 520px;
    width: 230px;
    padding: 40px 30px;
    position: absolute;
    top: 0;
    left: 0;
}
</style>