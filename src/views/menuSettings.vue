<style scoped>
.row {
    margin: 25px 0;
}
.value {
    font-size: 15px;
    line-height: 30px;
}
.setting {
    margin: 5px 0 0 0;
    width: 120px;
    height: 32px;
    position: relative;
}
.form-item-content .select {
    height: 32px;
}
</style>

<template>
    <MenuPage :title="$t('setting.title')" @back="back">
        <div class="row">
            <p>{{ $t("setting.version") }}</p>
            <p class="value">[AIV]{version}[/AIV]-{{hashVersion}}</p>
        </div>
        <div class="row">
            <p>{{ $t("setting.lang") }}</p>
            <div class="form-item setting">
                <v-select style="height: 32px;" class="select" :value="selected" :clearable="false" :onChange="onChange" :options="i18nOptions"></v-select>
            </div>
        </div>
        <div class="row">
            <p>{{ $t("setting.unit") }}</p>
            <div class="form-item setting">
                <v-select style="height: 32px;" class="select" :value="unit" :clearable="false" :options="['BTM']"></v-select>
            </div>
        </div>
    </MenuPage>
</template>

<script>
import { have } from "@/assets/language";

export default {
    name: "",
    data() {
        return {
            unit: "BTM",
            i18nOptions: [
                { label: "中文", value: "cn" },
                { label: "English", value: "en" }
            ],
            selected: { label: "中文", value: "cn" },
            hashVersion: ""
        };
    },
    methods: {
        onChange: function (value) {
            if (localStorage.lang != value.value) {
                localStorage.lang = value.value;
                this.$i18n.locale = value.value;
                this.selected = value;
            }
        },
        back: function () {
            this.$emit("on-back");
        },
        close: function () {
            this.$emit("on-exit");
        }
    },
    mounted: function () {
        this.hashVersion = version.hash;
        if (have(localStorage.lang)) {
            if (localStorage.lang == "cn") {
                this.selected = { label: "中文", value: "cn" };
            } else if (localStorage.lang == "en") {
                this.selected = { label: "English", value: "en" };
            }
        }
    }
};
</script>