<style scoped>
  .header {
    position: relative;
    margin:80px 0px 20px;
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


  .tabs a{
    margin: 0px 20px;
  }
  .tabs .active{
    color: rgba(255,255,255, 1);
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
    font-weight: 100;
  }
  .widget{
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .widget h4{
    font-weight: 600;
    font-size: 15px;
  }

  .widget p{
    font-size: 13px;
  }
  .color-widget{
    background: #FAFAFA;
    border-radius: 8px;
  }
  .logo{
    margin-left:16px;
  }

</style>

<template>
  <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <h1>
          <div class="welcome-title">{{ $t('home.welcome')}}</div>
          <div>{{ $t('home.byone')}}</div>
        </h1>
      </div>
      <div class="divider"></div>

      <div class="container">
       <div class="widget color-widget">
         <a @click="$router.push({ name: 'welcome-creation' })">
           <div class="d-flex">
             <div>
               <h4 class="color-black">{{ $t('home.create')}}</h4>
               <p>{{ $t('home.createHint')}}</p>
             </div>
             <img class="logo" src="@/assets/img/icon/wallet-create.svg" alt="">
           </div>
         </a>
       </div>
        <div class="widget" style="margin-top: 16px;">
          <a @click="$router.push({ name: 'welcome-import' })">
            <div class="d-flex">
              <div>
                <h4 class="color-black">{{ $t('home.import')}}</h4>
                <p>{{ $t('home.importHint')}}</p>
              </div>
              <img class="logo" src="@/assets/img/icon/wallet-import.svg" alt="">
            </div>
          </a>
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

let mainNet = null;
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
