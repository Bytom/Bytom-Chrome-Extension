creation
<style scoped>
.content {
    margin-left: 135px;
}
.content-cn {
    margin-left: 85px;
}
.form-item-label {
    width: 135px;
}
.form-item-label-cn {
    width: 85px;
}
</style>

<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../assets/logo.png">
        </section>
        <section class="login-content">
            <div class="title">{{ $t('createAccount.title') }}</div>
            <div class="form">
                <div class="form-item">
                    <label :class="formItemLabel">{{ $t('createAccount.select') }}</label>
                    <div :class="formItemContent">
                        <v-select :clearable="false" v-model="selected" style="height: 32px;font: 15;" :options="nets"></v-select>
                    </div>
                </div>
                <div class="form-item">
                    <label :class="formItemLabel">{{ $t('createAccount.accountAlias') }}</label>
                    <div :class="formItemContent">
                        <input type="text" v-model="formItem.accAlias" autofocus>
                    </div>
                </div>
                <div class="form-item">
                    <label :class="formItemLabel">{{ $t('createAccount.keyAlias') }}</label>
                    <div :class="formItemContent">
                        <input type="text" v-model="formItem.keyAlias">
                    </div>
                </div>
                <div class="form-item">
                    <label :class="formItemLabel">{{ $t('createAccount.keyPassword') }}</label>
                    <div :class="formItemContent">
                        <input type="password" v-model="formItem.passwd1">
                    </div>
                </div>
                <div class="form-item">
                    <label :class="formItemLabel">{{ $t('createAccount.confirmPassword') }}</label>
                    <div :class="formItemContent">
                        <input type="password" v-model="formItem.passwd2">
                    </div>
                </div>
                <div class="btn-group">
                    <div class="btn bg-green" @click="create">{{ $t('createAccount.create') }}</div>
                    <div class="btn bg-green" @click="$router.push({ name: 'welcome-recovery' })">{{ $t('createAccount.import') }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import account from "../../models/account";
import { getLanguage } from '@/assets/language'
let mainNet = null;
let testNet = null;
export default {
    name: "",
    data() {
        return {
            nets: [],
            selected: mainNet,
            formItem: {
                accAlias: "",
                keyAlias: "",
                passwd1: "",
                passwd2: ""
            }
        };
    },
    computed: {
        formItemLabel: function () {
            if (this.i18n == "cn") {
                return "form-item-label form-item-label-cn";
            } else if (this.i18n == "en") {
                return "form-item-label";
            }
            return "form-item-label form-item-label-cn";
        },
        formItemContent: function () {
            if (this.i18n == "cn") {
                return "form-item-content content-cn";
            } else if (this.i18n == "en") {
                return "form-item-content content";
            }
            return "form-item-label form-item-label-cn";
        }
    },
    props: {
        i18n: {
            type: String,
            default: 'cn',
        }
    },
    methods: {
        create: function () {
            if (this.formItem.accAlias == "") {
                this.$dialog.show({
                    body: this.$t("createAccount.inputAlias")
                });
                return;
            }
            if (this.formItem.keyAlias == "") {
                this.$dialog.show({
                    body: this.$t("createAccount.inputKey")
                });
                return;
            }
            if (this.formItem.passwd1 == "") {
                this.$dialog.show({
                    body: this.$t("createAccount.inputPass")
                });
                return;
            }
            if (this.formItem.passwd1 != this.formItem.passwd2) {
                this.$dialog.show({
                    body: this.$t('createAccount.passwordAgain'),
                });
                return;
            }
            let loader = this.$loading.show({
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });
            account.create(this.formItem.accAlias, this.formItem.keyAlias, this.formItem.passwd1).then(res => {
                localStorage.login = true;
                loader.hide();
                this.formItem = {};
                this.$router.push('/');
            }).catch(err => {
                loader.hide();
                this.$dialog.show({
                    body: err.message,
                });
            });
        },
    },
    watch: {
        selected: function (value) {
            localStorage.bytomNet = value.value;
            account.setupNet(value.value);
        }
    },
    mounted() {
        mainNet = { label: this.$t('main.mainNetShort'), value: "mainnet" };
        testNet = { label: this.$t('main.testNetShort'), value: "testnet" };
        this.nets = [mainNet, testNet];
        if (localStorage.bytomNet != undefined) {
            if (localStorage.bytomNet == "mainnet") {
                this.selected = mainNet;
            } else if (localStorage.bytomNet == "testnet") {
                this.selected = testNet;
            }
        } else {
            this.selected = mainNet;
            localStorage.bytomNet = "mainnet";
        }
        account.setupNet(this.selected);
        this.i18n = getLanguage();
    }
};
</script>