<style scoped>
/*.content {*/
    /*margin-left: 135px;*/
/*}*/
/*.content-cn {*/
    /*margin-left: 85px;*/
/*}*/
/*.form-item-label {*/
    /*width: 135px;*/
/*}*/
/*.form-item-label-cn {*/
    /*width: 85px;*/
/*}*/
  .bg-image{
    height: 420px;
    width: 360px;
    background-size: contain;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 75%, 0% 100%);
    clip-path: polygon(0 0, 100% 0, 100% 75%, 0% 100%);
    position: absolute;
  }
  .header {
    position: relative;
    text-align: center;
    margin:15px 20px 25px;
  }
  .header p{
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    padding-top: 5px;
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
    height: 28px;
    width: 160px;
    background: white;
    border-radius: 15px;
    font-size: 14px;
    margin: auto;
    padding-left: 20px;
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
    padding: 5px;
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
</style>

<template>
    <div class="warp bg-gray">
      <div class="bg-image">
      </div>
      <div class="topbar">
        <div v-if="activeTab === 'register'" class="topbar-middle">
          <v-select  class="v-select" v-bind:colorBlack="true" :clearable="false" v-model="selected" :options="nets"></v-select>
        </div>
        <a href="http://github.com/bycoinio/Bystore" target="_blank"><i class="iconfont icon-github"></i></a>
      </div>
      <div class="header">
        <h1>Byone</h1>
        <p>{{ $t('home.title')}}</p>

      </div>

        <section class="container">
          <div class="tabs">
            <a v-on:click="activeTab='register'" v-bind:class="[ activeTab === 'register' ? 'active' : '' ]">{{ $t('welcome.register') }}</a>
            <a v-on:click="activeTab='restore'" v-bind:class="[ activeTab === 'restore' ? 'active' : '' ]">{{ $t('welcome.restore') }}</a>
          </div>
          <div  v-if="activeTab === 'register'" >
            <div class="form panel">
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
              <div class="form-checkbox">
                <input type="checkbox" id="checkbox1" v-model="formItem.checked">
                <label for="checkbox1">
                  {{ $t('welcome.term1') }}<a class="color-green" @click="$router.push({ name: 'welcome-protocol' })">{{  $t('welcome.term2')}}</a>
                </label>
              </div>
            </div>
            <div class="btn-group">
                <div class="btn btn-primary" @click="create">{{ $t('createAccount.create') }}</div>
            </div>
          </div>
          <div v-if="activeTab === 'restore'">
            <div class="form panel">
              <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.file') }}</label>
                <div class="file-selection">
                  <input type="file" @change="tirggerFile($event)">
                </div>
              </div>
              <div class="form-checkbox">
                <input type="checkbox" id="checkbox2" v-model="restore.checked">
                <label for="checkbox2">
                  {{ $t('welcome.term1') }}<a class="color-green" @click="$router.push({ name: 'welcome-protocol' })">{{  $t('welcome.term2')}}</a>
                </label>
              </div>
            </div>
            <div class="btn-group">
              <div class="btn btn-primary recovery-btn" @click="recovery">{{ $t('createAccount.import') }}</div>
            </div>
          </div>
        </section>
    </div>
</template>

<script>
import account from "../../models/account";
import { getLanguage } from '@/assets/language'
import getLang from "../../assets/language/sdk";
let mainNet = null;
let testNet = null;
let soloNet = null;
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
                passwd2: "",
                checked: false
            },
            restore:{
                fileTxt:"",
                checked: false
            },
            activeTab: 'register'
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
            if (!this.formItem.checked) {
                this.$dialog.show({
                    body: this.$t('createAccount.agreeService'),
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
            this.$dialog.show({
              body: this.$t('createAccount.agreeService'),
            });
            return;
          }
          account.restore(this.restore.fileTxt).then(res => {
            localStorage.login = true;
            this.$router.push('/');
          }).catch(error => {
            this.$dialog.show({
              body: getLang(error.message)
            });
          });
        }
    },
    watch: {
        selected: function (value) {
            localStorage.bytomNet = value.value;
            account.setupNet(value.value);
        }
    },
    mounted() {
        mainNet = { label: this.$t('main.mainNet'), value: "mainnet" };
        testNet = { label: this.$t('main.testNet'), value: "testnet" };
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
