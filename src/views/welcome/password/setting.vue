<style scoped>

  .header {
    position: relative;
    margin:40px 0px 20px;
    line-height: 37px;
  }
  .header p{
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    padding-top: 5px;
  }
  .container{
    position: relative;
    margin-top: 24px;
  }
  .container{
    position: relative;
  }
  .container p{
    font-size: 14px;

    /* Text / Dark-Routine */

    color: rgba(0, 0, 0, 0.64);
  }
  .form-item{
    margin: 10px 0;
  }
  .form-checkbox{
    font-size: 14px;
    padding: 5px 0;
  }
  .form-checkbox input{
    margin-left:0px;
  }
  .topbar a{
    position: fixed;
    top: 10px;
    right: 20px;
  }
  .topbar a i{
    font-size: 25px;
    color: white;
  }
  .welcome-title{
    margin-top: 20px;
  }
  .btn-round{
    padding: 15px 2px;
  }
</style>

<template>
  <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <BackButton/>
        <h1>
          <div class="welcome-title">{{ (data && data.mnemonic)? $t('restore.sPassword'):$t('restore.vPassword')}}</div>
        </h1>
      </div>
      <div class="divider"></div>
      <div class="container">
        <p>{{ $t('restore.passwordHint') }}</p>
        <div class="form">
          <div class="form-item">
            <div :class="[formItemContent, { 'error': $v.formItem.accAlias.$error }]">
              <input type="text"
                     :placeholder="$t('createAccount.walletName')"
                     id="accAlias"
                     name="accAlias"
                     ref="accAlias"
                     v-model="$v.formItem.accAlias.$model"
                     autofocus />
            </div>
          </div>
          <div class="form-item">
            <div :class="[formItemContent, { 'error': $v.formItem.passwd1.$error }]">
              <input type="password"
                     :placeholder="$t('restore.p1text')"
                     id="passwd1"
                     name="passwd1"
                     ref="passwd1"
                     v-model="$v.formItem.passwd1.$model"
              >
            </div>
          </div>
          <div class="form-item">
            <div :class="[formItemContent, { 'error': $v.formItem.passwd2.$error }]">
              <input type="password"
                     :placeholder="$t('restore.p2text')"
                     id="passwd2"
                     name="passwd2"
                     ref="passwd2"
                     v-model="$v.formItem.passwd2.$model"
              >
            </div>
          </div>
        </div>
        <div>
          <div class="btn btn-primary btn-round float-right" @click="restore"><i class="iconfont icon-right-arrow"></i></div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import account from "@/models/account";
  import { getLanguage } from '@/assets/language'
  import { mapActions, mapGetters, mapState } from 'vuex'
  import * as Actions from '@/store/constants';
  import { required, sameAs } from "vuelidate/lib/validators";


  let testNet = null;
  export default {
    name: "",
    data() {
      return {
        formItem: {
          accAlias:"",
          passwd1: "",
          passwd2: "",
        },
      };
    },
    validations: {
      formItem: {
        accAlias:{
          required
        },
        passwd1:{
          required
        },
        passwd2:{
          required,
          sameAsPassword: sameAs('passwd1')
        },
      }
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
      },
      ...mapState([
        'bytom',
        'data'
      ]),
      ...mapGetters([
        'net',
        'language',
        'netType'
      ])
    },
    props: {
      i18n: {
        type: String,
        default: 'cn',
      }
    },
    methods: {
      restore: function () {
        this.$v.$touch();
        if (this.$v.$invalid) {
          const formItem = this.$v.formItem
          for (let key in Object.keys(formItem)) {
            const input = Object.keys(formItem)[key];
            if (input.includes("$")) return false;

            if (formItem[input].$error) {
              switch(input){
                case 'accAlias':
                  this.$toast.error(
                    this.$t("createAccount.inputAlias")
                  );
                  break;
                case 'passwd1':
                  this.$toast.error(
                    this.$t("createAccount.inputPass")
                  );
                  break;
                case 'passwd2':{
                  if(!formItem[input].required){
                    this.$toast.error(
                      this.$t("createAccount.inputPass")
                    );
                    break;
                  }else if(!formItem[input].sameAsPassword){
                    this.$toast.error(
                      this.$t('createAccount.passwordAgain'),
                    );
                    break;
                  }
                }

              }
              this.$refs[input].focus();
              break;
            }
          }
        } else {
          const mnemonic  = this.data.mnemonic
          const keystore = this.data.keystore
          const accountAlias = this.formItem.accAlias

          try{
            account.isAliasValid(accountAlias, this)
          }catch (e){
            this.$toast.error(
              e.message || e
            );
            this.$refs['accAlias'].focus();
            return;
          }

          let loader = this.$loading.show({
            container: null,
            canCancel: true,
            onCancel: this.onCancel
          });

          if(mnemonic){
            //restore by mnemonic
            account.restoreByMnemonic(accountAlias, mnemonic, this.formItem.passwd1, this).then(currentAccount => {
              loader.hide();
              this.formItem = {};
              this[Actions.CLEAR_DATA]()
              this[Actions.PUSH_ALERT](this.$t("successMsg.restoreWallet"))
            }).catch(err => {
              loader.hide();
              this.$toast.error(
                err.message || err
              )
            });
          }else if(keystore){
            //restore by keystore
            account.restoreByKeystore(accountAlias, keystore, this.formItem.passwd1, this).then(currentAccount => {
              loader.hide();
              this.formItem = {};
              this[Actions.CLEAR_DATA]()
              this[Actions.PUSH_ALERT](this.$t("successMsg.restoreWallet"))
            }).catch(err => {
              loader.hide();
              this.$toast.error(
                err.message || err
              )
            });

          }
        }
      },
      ...mapActions([
        Actions.CLEAR_DATA,
        Actions.PUSH_ALERT,
        Actions.UPDATE_STORED_BYTOM
      ])
    },
    mounted() {
      this.i18n = getLanguage(this.language);
    }
  };
</script>
