<style scoped>
  .form-item {
      background: transparent;
      margin: 0;
      padding: 0;
  }
  .form-item .form-item-label {
      float: none;
      width: 200px;
      margin: 0;
      padding: 0;
  }
  .submit {
      margin-top: 15px;
      height: 48px;
      padding: 15px;
  }
  .form{
    border-radius:4px;
    background: white;
    padding: 20px 20px 28px;
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
        </div>
        <a class="btn btn-primary submit" @click="create">{{ $t('createAccount.create') }}</a>
    </MenuPage>
</template>

<script>
import account from "@/models/account";
import * as Actions from '@/store/constants';
import { mapActions, mapState, mapGetters } from 'vuex'

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
    computed: {
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'net',
        'netType'
      ])
    },
    methods: {
        create: function () {
            if (this.formItem.accAlias == "") {
                this.$dialog.show({
                    body: this.$t("createAccount.inputAlias")
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

            if(this.netType === 'vapor'){
              account.setupNet(`${this.net}`);
              account.create(this.formItem.accAlias, null, this.formItem.passwd1).then((resp) => {
                account.setupNet(`${this.net}vapor`);
                return account.copy(resp.guid).then((currentRespAccount)=>{
                  this[Actions.CREATE_NEW_BYTOM_ACCOUNT](currentRespAccount).then(()=>{
                    loader.hide();
                    this.$router.push('/');
                  })
                })
              }).catch(err => {
                console.log(err);
                loader.hide();
                this.$dialog.show({
                  body: err.message
                });
              });
            }else{
              account.create(this.formItem.accAlias, null, this.formItem.passwd1).then(account => {
                this[Actions.CREATE_NEW_BYTOM_ACCOUNT](account).then(()=>{
                  loader.hide();
                  this.$router.push('/');
                })

              }).catch(err => {
                console.log(err);
                loader.hide();
                this.$dialog.show({
                  body: err.message
                });
              });
            }
        },
        ...mapActions([
          Actions.CREATE_NEW_BYTOM_ACCOUNT,
        ])
    },
    mounted() { }
};
</script>
