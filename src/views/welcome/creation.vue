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

.panel{
    position: relative;
    padding: 10px;
    margin-bottom : 15px;
  }
  .container{
    position: relative;
  }
  .form-item{
    margin: 10px 0;
  }
  .btn-group{
    padding: 0 20px;
  }
  .topbar{
    height: 45px;
    padding-top: 10px;
  }
.topbar .topbar-middle {
  text-align: center;
}

/*.topbar img{*/
  /*position: relative;*/
  /*bottom: 23px;*/
  /*right: 65px*/
/*}*/

  .v-select{
    height: 32px;
    width: 100%;
    background: rgba(247,247,247,1);
    font-size: 14px;
    margin: auto;
    border-bottom: 1px solid #E0E0E0;
    /*padding-left: 20px;*/
  }

  .tabs{
    color: rgba(255,255,255, 0.4);
    text-align: center;
  }
  .tabs a{
    margin: 0px 20px;
  }
  .tabs .active{
    color: rgba(255,255,255, 1);
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
  .file-selection{
    height: 50px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    border: 1px dashed #E0E0E0;
    margin-top: 10px;
    padding: 20px;
    background: #F7F7F7;
  }
  .recovery-btn{
    position: fixed;
    bottom: 20px;
    width: 320px;
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
          <div class="welcome-title">{{ $t('createAccount.title')}}</div>
        </h1>
      </div>
      <div class="divider"></div>
      <div class="container">
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
                             :placeholder="$t('createAccount.password')"
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
                             :placeholder="$t('createAccount.confirmPassword')"
                             id="passwd2"
                             name="passwd2"
                             ref="passwd2"
                             v-model="$v.formItem.passwd2.$model"
                      >
                  </div>
              </div>
            <div class="form-checkbox">
              <input type="checkbox"
                     id="checkbox1"
                     v-model="formItem.checked"
              >
              <label for="checkbox1">
                {{ $t('welcome.term1') }}<a class="color-green" @click="$router.push({ name: 'welcome-protocol' })">{{  $t('welcome.term2')}}</a>
              </label>
            </div>
          </div>
          <div>
            <div class="btn btn-primary btn-round float-right" @click="create"><i class="iconfont icon-right-arrow"></i></div>
          </div>
        </div>
     </div>
      <Footer/>
  </div>
</template>

<script>
import account from "../../models/account";
import { getLanguage } from '@/assets/language'
import getLang from "../../assets/language/sdk";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import { required, sameAs } from "vuelidate/lib/validators";


let mainNet = null;
export default {
    name: "",
    data() {
        return {
            nets: [],
            selected: mainNet,
            formItem: {
                accAlias: "",
                passwd1: "",
                passwd2: "",
                checked: true
            },
            activeTab: 'register'
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
      checked:{
        required
      }
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
        'bytom'
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
        create: function () {
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
            if (!this.formItem.checked) {
              this.$toast.error(
                this.$t('createAccount.agreeService'),
              );
              return;
            }
            let loader = this.$loading.show({
              container: null,
              canCancel: true,
              onCancel: this.onCancel
            });
            account.create(this.formItem.accAlias, null, this.formItem.passwd1, this).then(currentAccount => {
              this[Actions.CREATE_NEW_BYTOM](this.selected.value).then(() =>{
                loader.hide();
                this.formItem = {};
                this.$router.push('/');
              });
            }).catch(err => {
              loader.hide();
              this.$toast.error(
                err.message
              )
            });
          }
        },
        tirggerFile: function (event) {
          var reader = new FileReader();
          reader.onload = e => {
            this.restore.fileTxt = e.target.result;
          };

          var file = event.target.files[0];
          reader.readAsText(file);
        },
        recovery: function () {
          if (!this.restore.checked) {
            this.$toast.error(
               this.$t('createAccount.agreeService'),
            );
            return;
          }
          account.restore(this.restore.fileTxt).then(res => {
            this[Actions.IMPORT_BYTOM]().then(() =>{
              this.$router.push('/');
            });
          }).catch(error => {
            this.$toast.error(
               getLang(error.message, this.language)
            );
          });
        },
        ...mapActions([
          Actions.CREATE_NEW_BYTOM,
          Actions.IMPORT_BYTOM,
          Actions.UPDATE_STORED_BYTOM
        ])
    },
    watch: {
        selected: function (value) {
            account.setupNet(`${value.value}`);
        }
    },
    mounted() {
        mainNet = { label: this.$t('main.mainNet'), value: "mainnet" };
        this.nets = [mainNet];
        if (this.net != undefined) {
            if (this.net == "mainnet") {
                this.selected = mainNet;
            }
        } else {
            this.selected = mainNet;
        }
        account.setupNet(`${this.selected.value}`);
        this.i18n = getLanguage(this.language);
    }
};
</script>
