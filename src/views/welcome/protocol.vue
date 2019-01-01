<style scoped>
.protocol {
    height: 385px;
    /* font-size: 12px; */
}
.content {
    white-space: pre-wrap;
    word-wrap: break-word;
    max-height: 340px;
    overflow-y: scroll;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.content::-webkit-scrollbar {
    width: 0 !important;
}
</style>
<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../assets/logo.png">
        </section>
        <section class="login-content protocol">
            <div class="title" style="font-size: 17px;">{{ $t('protocol.title') }}</div>
            <div style="font-size: 11px; width: 100%;">
                <pre class="content">{{ $t('protocol.content') }}</pre>
            </div>
        </section>
        <section class="welcome-bottom bg-green">
            <div class="btn btn-primary btn-startup" @click="$router.push({ name: 'welcome-creation' })">{{ $t('welcome.confirm') }}</div>
        </section>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {
        confirm: function () {
            this.$emit("next");
        }
    }
};
</script>