<style scoped>
.form-item {
    background: transparent;
    margin: 0;
}
.form-item .form-item-content {
    padding: 0 10px;
    background-color: #282f38;
    border-radius: 5px;
}
.form-item .form-item-label {
    float: none;
    width: 200px;
    line-height: 35px;
    margin: 0 5px;
}
.form-item .btn {
    width: 200px;
    margin-top: 15px;
}
</style>

<template>
    <MenuPage :title="$t('createAccount.title')">
        <div class="form">
            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.accountAlias') }}</label>
                <div class="form-item-content">
                    <input type="text" v-model="formItem.accAlias">
                </div>
            </div>
            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.keyAlias') }}</label>
                <div class="form-item-content">
                    <input type="text" v-model="formItem.keyAlias">
                </div>
            </div>
            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.keyPassword') }}</label>
                <div class="form-item-content">
                    <input type="password" v-model="formItem.passwd1">
                </div>
            </div>
            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.confirmPassword') }}</label>
                <div class="form-item-content">
                    <input type="password" v-model="formItem.passwd2">
                </div>
            </div>
            <div class="tips">{{tips}}</div>
            <div class="form-item bg-gray" style="text-align: center">
                <div class="btn bg-green" @click="create">{{ $t('createAccount.create') }}</div>
            </div>
        </div>
    </MenuPage>
</template>

<script>
import account from "@/models/account";
export default {
    name: "",
    components: {},
    data() {
        return {
            formItem: {
                accAlias: "",
                keyAlias: "",
                passwd1: "",
                passwd2: ""
            },
            tips: ""
        };
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
                    body: this.$t('createAccount.passwordAgain')
                });
                return;
            }

            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel
            });

            account.create(this.formItem.accAlias, this.formItem.keyAlias, this.formItem.passwd1).then(res => {
                loader.hide();
                console.log("bytom.Account.create", res);
                this.$router.push({ name: "home", params: { selectedAccount: res } });
            }).catch(err => {
                console.log(err);
                loader.hide();
                this.$dialog.show({
                    body: err.message
                });
            });
        }
    },
    mounted() { }
};
</script>