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
        <!--<div v-if="activeTab === 'register'" class="topbar-middle">-->
          <!--<v-select  class="v-select" v-bind:colorBlack="true" :clearable="false" v-model="selected" :options="nets"></v-select>-->
        <!--</div>-->
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
                    <label :class="formItemLabel">network</label>
                    <div :class="formItemContent">
                      <v-select  class="v-select" v-bind:colorBlack="true" :clearable="false" v-model="selected" :options="nets"></v-select>
                    </div>
                </div>
              <div class="form-item">
                    <label :class="formItemLabel">{{ $t('createAccount.accountAlias') }}</label>
                    <div :class="formItemContent">
                        <input type="text" v-model="formItem.accAlias" autofocus>
                    </div>
                </div>
                <!--<div class="form-item">-->
                    <!--<label :class="formItemLabel">{{ $t('createAccount.keyAlias') }}</label>-->
                    <!--<div :class="formItemContent">-->
                        <!--<input type="text" v-model="formItem.keyAlias">-->
                    <!--</div>-->
                <!--</div>-->
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
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';

let mainNet = null;
let testNet = null;
let soloNet = null;
let vaporTestnet = null;
export default {
    name: "",
    data() {
        return {
            nets: [],
            selected: mainNet,
            formItem: {
                accAlias: "",
                // keyAlias: "",
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
            account.create(this.formItem.accAlias, null, this.formItem.passwd1).then(currentAccount => {
              this[Actions.CREATE_NEW_BYTOM](this.selected.value).then(() =>{
                loader.hide();
                this.formItem = {};
                this.$router.push('/');
              });
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
            this[Actions.IMPORT_BYTOM]().then(() =>{
              this.$router.push('/');
            });
          }).catch(error => {
            this.$dialog.show({
              body: getLang(error.message, this.language)
            });
          });
        },
        ...mapActions([
          Actions.CREATE_NEW_BYTOM,
          Actions.IMPORT_BYTOM,
        ])
    },
    watch: {
        selected: function (value) {
            account.setupNet(`${value.value}bytom`);
        }
    },
    mounted() {
        mainNet = { label: this.$t('main.mainNet'), value: "mainnet" };
        testNet = { label: this.$t('main.testNet'), value: "testnet" };
        soloNet = { label: this.$t('main.soloNet'), value: "solonet" };
        // vaporTestnet = { label: this.$t('main.vaporTestnet'), value: "vaporTestnet" };
        this.nets = [mainNet, testNet,soloNet];
        if (this.net != undefined) {
            if (this.net == "mainnet") {
                this.selected = mainNet;
            } else if (this.net == "testnet") {
                this.selected = testNet;
            } else if (this.net == "solonet") {
                this.selected = soloNet;
            }

            // else if (this.net == "vaporTestnet") {
            //     this.selected = vaporTestnet;
            // }
        } else {
            this.selected = mainNet;
        }
        account.setupNet(`${this.selected}bytom`);
        this.i18n = getLanguage(this.language);
    }
};
</script>
