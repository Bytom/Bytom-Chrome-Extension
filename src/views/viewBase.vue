<style>
.warp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
}
.login-header {
    height: 60px;
    text-align: center;
}
.login-header img {
    width: 30px;
    height: 30px;
    margin-top: 15px;
}
.login-content {
    padding: 30px;
}
.login-content .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}
.login-footer {
    padding: 20px 85px;
}
</style>

<template>
    <section id="app">
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>