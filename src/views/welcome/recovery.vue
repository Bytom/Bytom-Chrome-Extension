<style scoped>
</style>

<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../assets/logo.png">
        </section>
        <section class="login-content">
            <div class="title">{{ $t('createAccount.import') }}</div>
            <div class="form">
                <div class="form-item">
                    <label class="form-item-label">{{ $t('createAccount.file') }}</label>
                    <div class="form-item-content" style="margin-left: 95px;">
                        <input type="file" @change="tirggerFile($event)">
                    </div>
                </div>
                <div class="btn-group">
                    <div class="btn bg-green" @click="recovery">{{ $t('createAccount.import') }}</div>
                    <div class="btn bg-red" @click="$router.go(-1)">{{ $t('createAccount.back') }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import account from "../../models/account";
import getLang from "../../assets/language/sdk";
export default {
    name: "",
    data() {
        return {
            formData: {}
        };
    },
    methods: {
        tirggerFile: function (event) {
            var reader = new FileReader();
            reader.onload = e => {
                this.fileTxt = e.target.result;
            };

            var file = event.target.files[0];
            reader.readAsText(file);
        },
        recovery: function () {
            account.restore(this.fileTxt).then(res => {
                localStorage.login = true;
                this.$router.push('/');
            }).catch(error => {
                this.$dialog.show({
                    body: getLang(error.message)
                });
            });
        }
    }
};
</script>