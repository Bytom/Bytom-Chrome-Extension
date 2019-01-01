<style scoped>
</style>

<template>
    <MenuPage :title="$t('help.title')">
        <p>{{ $t("help.page") }}</p>
        <a href="http://github.com/bytom/bytom/wiki" target="_blank">http://github.com/bytom/bytom/wiki</a>
    </MenuPage>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {
    }
};
</script>