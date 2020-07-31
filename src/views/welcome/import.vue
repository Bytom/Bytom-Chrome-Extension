<style scoped>

  .header {
    position: relative;
    margin: 40px 0px 20px;
    line-height: 37px;
  }

  .header p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    padding-top: 5px;
  }

  .container {
    position: relative;
    margin-top: 24px;
  }

  .panel {
    position: relative;
    padding: 10px;
    margin-bottom: 15px;
  }

  .container {
    position: relative;
  }

  .form-item {
    margin: 10px 0;
  }

  .btn-group {
    padding: 0 20px;
  }

  .topbar {
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

  .v-select {
    height: 32px;
    width: 100%;
    background: rgba(247, 247, 247, 1);
    font-size: 14px;
    margin: auto;
    border-bottom: 1px solid #E0E0E0;
    /*padding-left: 20px;*/
  }

  .tabs {
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }

  .tabs a {
    margin: 0px 20px;
  }

  .tabs .active {
    color: rgba(255, 255, 255, 1);
  }

  .form-checkbox {
    font-size: 14px;
    padding: 5px 0;
  }

  .form-checkbox input {
    margin-left: 0px;
  }

  .topbar a {
    position: fixed;
    top: 10px;
    right: 20px;
  }

  .topbar a i {
    font-size: 25px;
    color: white;
  }

  .file-selection {
    min-height: 156px;
    background: #FAFAFA;
    vertical-align: middle;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
  }

  .recovery-btn {
    position: fixed;
    bottom: 20px;
    width: 320px;
  }

  .welcome-title {
    margin-top: 20px;
  }

  .btn-round {
    padding: 15px 2px;
  }

  .tab {
    font-size: 14px;
    margin-right: 22px
  }

  .tab.active {
    color: rgba(0, 0, 0, 0.88);
  }

  .textarea {
    width: calc(100% - 40px);
    min-height: 156px;
    background: #FAFAFA;
    border-radius: 8px;
    border: none;
    padding: 20px;
  }

  .textarea:focus {
    background: white;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile-1 + label {
    color: white;
    background: #1A1A1A;
    border-radius: 4px;
  }

  .inputfile + label {
    cursor: pointer;
    display: inline-flex;
    padding: 8px 12px;
    align-items: center;
    font-size: 13px;
    max-width: 80%;
  }

  .box {
    margin: auto;
  }
</style>

<template>
  <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <BackButton des="welcome"/>
        <h1>
          <div class="welcome-title">{{ $t('restore.title')}}</div>
        </h1>
      </div>
      <div class="divider"></div>
      <div class="container">
        <div class="form">
          <div>
            <a :class="['tab', { 'active': activeTab === 'mnemonic'}]" @click="updateTap('mnemonic')">{{
              $t('restore.mnemonic') }}</a>
            <a :class="['tab', { 'active': activeTab === 'kfile'}]" @click="updateTap('kfile')">{{ $t('restore.kFile')
              }}</a>
            <a :class="['tab', { 'active': activeTab === 'ktext'}]" @click="updateTap('ktext')">{{ $t('restore.kText')
              }}</a>
          </div>
          <div v-if="activeTab === 'mnemonic'" class="form-item">
            <div :class="[ formItemContent, { 'error': $v.formItem.mnemonic.$error }]">
              <textarea type="text"
                        class="textarea"
                        :placeholder="$t('restore.mHint')"
                        id="mnemonic"
                        name="mnemonic"
                        ref="mnemonic"
                        v-model="$v.formItem.mnemonic.$model"
                        autofocus/>
            </div>
          </div>
          <div v-if="activeTab === 'kfile'" class="form-item">
            <div class="file-selection form-item-content">
              <div class="box">
                <input type="file" id="file" class="inputfile inputfile-1" @change="tirggerFile($event)">
                <label for="file"> <i class="iconfont iconupload"/> <span> {{ uploadPlaceHolder }}</span></label>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'ktext'" class="form-item">
            <div :class="[ formItemContent, { 'error': $v.formItem.keystore.$error }]">
              <textarea type="text"
                        class="textarea"
                        :placeholder="$t('restore.kText')"
                        id="keystore"
                        name="keystore"
                        ref="keystore"
                        v-model="$v.formItem.keystore.$model"
                        autofocus/>
            </div>
          </div>
          <div class="form-checkbox">
            <input type="checkbox"
                   id="checkbox1"
                   v-model="formItem.checked"
            >
            <label for="checkbox1">
              {{ $t('welcome.term1') }}<a class="color-green" @click="$router.push({ name: 'welcome-protocol' })">{{
              $t('welcome.term2')}}</a>
            </label>
          </div>
        </div>
        <div>
          <div class="btn btn-primary btn-round float-right" @click="recovery"><i class="iconfont icon-right-arrow"></i>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import account from "../../models/account";
  import {getLanguage} from '@/assets/language'
  import getLang from "../../assets/language/sdk";
  import {mapActions, mapGetters, mapState} from 'vuex'
  import * as Actions from '@/store/constants';
  import {required, sameAs} from "vuelidate/lib/validators";


  let testNet = null;
  export default {
    name: "",
    data() {
      return {
        nets: [],
        selected: testNet,
        formItem: {
          mnemonic: '',
          keystoreF:'',
          keystore: '',
          checked: true
        },
        activeTab: 'mnemonic',
        uploadPlaceHolder: this.$t('restore.kFHint')
      };
    },
    validations: {
      formItem: {
        mnemonic: {},
        keystore: {},
        checked: {
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
      recovery: function () {
        switch (this.activeTab){
          case 'mnemonic':{
            const mnemonic = this.formItem.mnemonic.trim();
            if(!mnemonic){
              this.$toast.error(
                this.$t('error.BTM0001'),
              );
              return
            }

            try{
              account.isValidMnemonic(mnemonic)
            }catch (e){
              this.$toast.error(
               e.message || e
              );
              return
            }

            this[Actions.SET_DATA]({
              mnemonic: mnemonic
            }).then(() => {
              this.$router.push('/restore-password');
            });
            break;
          }
          case 'kfile':
          {
            if(!this.formItem.keystoreF){
              this.$toast.error(
                this.$t('error.BTM0003'),
              );
              return
            }
            this[Actions.SET_DATA]({
              keystore: this.formItem.keystoreF
            }).then(() => {
              this.$router.push('/restore-password');
            });
            break;
          }
          case 'ktext':
          {
            if(!this.formItem.keystore){
              this.$toast.error(
                this.$t('error.BTM0004'),
              );
              return
            }

            this[Actions.SET_DATA]({
              keystore: this.formItem.keystore
            }).then(() => {
              this.$router.push('/restore-password');
            });
            break;
          }
        }
      },
      updateTap: function (t) {
        this.activeTab = t;
      },
      tirggerFile: function (event) {
        const fileName = event.target.value.split("\\" ).pop();
        if(fileName){
          this.uploadPlaceHolder = fileName;
        }

        var reader = new FileReader();
        reader.onload = e => {
          this.formItem.keystoreF = e.target.result;
        };

        var file = event.target.files[0];
        reader.readAsText(file);
      },
      ...mapActions([
        Actions.SET_DATA,
      ])
    },
    watch: {
      selected: function (value) {
        account.setupNet(`${value.value}`);
      }
    },
    mounted() {
      testNet = {label: this.$t('main.testNet'), value: "testnet"};
      this.nets = [testNet];
      if (this.net != undefined) {
        if (this.net == "testnet") {
          this.selected = testNet;
        }
      } else {
        this.selected = testNet;
      }
      account.setupNet(`${this.selected.value}`);
      this.i18n = getLanguage(this.language);
    }
  };
</script>

<!--<style scoped>-->
<!--/*.content {*/-->
<!--/*margin-left: 135px;*/-->
<!--/*}*/-->
<!--/*.content-cn {*/-->
<!--/*margin-left: 85px;*/-->
<!--/*}*/-->
<!--/*.form-item-label {*/-->
<!--/*width: 135px;*/-->
<!--/*}*/-->
<!--/*.form-item-label-cn {*/-->
<!--/*width: 85px;*/-->
<!--/*}*/-->
<!--.bg-image{-->
<!--height: 420px;-->
<!--width: 360px;-->
<!--background-size: contain;-->
<!-- -webkit-clip-path: polygon(0 0, 100% 0, 100% 75%, 0% 100%);-->
<!--clip-path: polygon(0 0, 100% 0, 100% 75%, 0% 100%);-->
<!--position: absolute;-->
<!--}-->
<!--.header {-->
<!--position: relative;-->
<!--text-align: center;-->
<!--margin:15px 20px 25px;-->
<!--}-->
<!--.header p{-->
<!--font-size: 16px;-->
<!--color: rgba(255,255,255,0.5);-->
<!--padding-top: 5px;-->
<!--}-->
<!--.panel{-->
<!--position: relative;-->
<!--padding: 10px;-->
<!--margin-bottom : 15px;-->
<!--}-->
<!--.container{-->
<!--position: relative;-->
<!--}-->
<!--.form-item{-->
<!--margin: 10px 0;-->
<!--}-->
<!--.btn-group{-->
<!--padding: 0 20px;-->
<!--}-->
<!--.topbar{-->
<!--height: 45px;-->
<!--padding-top: 10px;-->
<!--}-->
<!--.topbar .topbar-middle {-->
<!--text-align: center;-->
<!--}-->

<!--/*.topbar img{*/-->
<!--/*position: relative;*/-->
<!--/*bottom: 23px;*/-->
<!--/*right: 65px*/-->
<!--/*}*/-->

<!--.v-select{-->
<!--height: 32px;-->
<!--width: 100%;-->
<!--background: rgba(247,247,247,1);-->
<!--font-size: 14px;-->
<!--margin: auto;-->
<!--border-bottom: 1px solid #E0E0E0;-->
<!--/*padding-left: 20px;*/-->
<!--}-->

<!--.tabs{-->
<!--color: rgba(255,255,255, 0.4);-->
<!--text-align: center;-->
<!--}-->
<!--.tabs a{-->
<!--margin: 0px 20px;-->
<!--}-->
<!--.tabs .active{-->
<!--color: rgba(255,255,255, 1);-->
<!--}-->
<!--.form-checkbox{-->
<!--font-size: 14px;-->
<!--padding: 5px;-->
<!--}-->
<!--.topbar a{-->
<!--position: fixed;-->
<!--top: 10px;-->
<!--right: 20px;-->
<!--}-->
<!--.topbar a i{-->
<!--font-size: 25px;-->
<!--color: white;-->
<!--}-->
<!--.file-selection{-->
<!--height: 50px;-->
<!--vertical-align: middle;-->
<!--display: flex;-->
<!--align-items: center;-->
<!--border: 1px dashed #E0E0E0;-->
<!--margin-top: 10px;-->
<!--padding: 20px;-->
<!--background: #F7F7F7;-->
<!--}-->
<!--.recovery-btn{-->
<!--position: fixed;-->
<!--bottom: 20px;-->
<!--width: 320px;-->
<!--}-->
<!--</style>-->

<!--<template>-->
<!--<div class="warp bg-gray">-->
<!--<Header :title="$t('welcome.restore')"></Header>-->
<!--<div class="form panel">-->
<!--<div class="form-item">-->
<!--<label class="form-item-label" for="file">{{ $t('createAccount.file') }}</label>-->
<!--<div class="file-selection">-->
<!--<input type="file" id="file" @change="tirggerFile($event)"/>-->
<!--</div>-->
<!--</div>-->
<!--<div class="form-checkbox">-->
<!--<input type="checkbox" id="checkbox2" v-model="restore.checked">-->
<!--<label for="checkbox2">-->
<!--{{ $t('welcome.term1') }}<a class="color-green" @click="$router.push({ name: 'welcome-protocol' })">{{  $t('welcome.term2')}}</a>-->
<!--</label>-->
<!--</div>-->
<!--<div class="form-item">-->
<!--<label :class="formItemLabel" for="password">{{ $t('createAccount.keyPassword') }}</label>-->
<!--<div :class="formItemContent">-->
<!--<input type="password" id="password" v-model="restore.password" />-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="btn-group">-->
<!--<div class="btn btn-primary recovery-btn" @click="recovery">{{ $t('createAccount.import') }}</div>-->
<!--</div>-->
<!--<Footer/>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import account from "../../models/account";-->
<!--import { getLanguage } from '@/assets/language'-->
<!--import getLang from "../../assets/language/sdk";-->
<!--import { mapActions, mapGetters, mapState } from 'vuex'-->
<!--import * as Actions from '@/store/constants';-->

<!--let mainNet = null;-->
<!--export default {-->
<!--name: "",-->
<!--data() {-->
<!--return {-->
<!--nets: [],-->
<!--selected: mainNet,-->
<!--restore:{-->
<!--fileTxt:"",-->
<!--checked: false,-->
<!--password: ""-->
<!--},-->
<!--activeTab: 'register'-->
<!--};-->
<!--},-->
<!--computed: {-->
<!--formItemLabel: function () {-->
<!--if (this.i18n == "cn") {-->
<!--return "form-item-label form-item-label-cn";-->
<!--} else if (this.i18n == "en") {-->
<!--return "form-item-label";-->
<!--}-->
<!--return "form-item-label form-item-label-cn";-->
<!--},-->
<!--formItemContent: function () {-->
<!--if (this.i18n == "cn") {-->
<!--return "form-item-content content-cn";-->
<!--} else if (this.i18n == "en") {-->
<!--return "form-item-content content";-->
<!--}-->
<!--return "form-item-label form-item-label-cn";-->
<!--},-->
<!--...mapState([-->
<!--'bytom'-->
<!--]),-->
<!--...mapGetters([-->
<!--'net',-->
<!--'language',-->
<!--'netType'-->
<!--])-->
<!--},-->
<!--props: {-->
<!--i18n: {-->
<!--type: String,-->
<!--default: 'cn',-->
<!--}-->
<!--},-->
<!--methods: {-->
<!--tirggerFile: function (event) {-->
<!--var reader = new FileReader();-->
<!--reader.onload = e => {-->
<!--this.restore.fileTxt = e.target.result;-->
<!--};-->

<!--var file = event.target.files[0];-->
<!--reader.readAsText(file);-->
<!--},-->
<!--recovery: function () {-->
<!--if (!this.restore.checked) {-->
<!--this.$dialog.show({-->
<!--body: this.$t('createAccount.agreeService'),-->
<!--});-->
<!--return;-->
<!--}-->
<!--account.restore(this.restore.fileTxt, this.restore.password).then(res => {-->
<!--this[Actions.IMPORT_BYTOM]().then(() =>{-->
<!--this.$router.push('/');-->
<!--});-->
<!--}).catch(error => {-->
<!--this.$dialog.show({-->
<!--body: getLang(error.message, this.language)-->
<!--});-->
<!--});-->
<!--},-->
<!--...mapActions([-->
<!--Actions.CREATE_NEW_BYTOM,-->
<!--Actions.IMPORT_BYTOM,-->
<!--])-->
<!--},-->
<!--watch: {-->
<!--selected: function (value) {-->
<!--account.setupNet(`${value.value}`);-->
<!--}-->
<!--},-->
<!--mounted() {-->
<!--mainNet = { label: this.$t('main.mainNet'), value: "mainnet" };-->
<!--this.nets = [mainNet];-->
<!--if (this.net != undefined) {-->
<!--if (this.net == "mainnet") {-->
<!--this.selected = mainNet;-->
<!--}-->
<!--} else {-->
<!--this.selected = mainNet;-->
<!--}-->
<!--account.setupNet(`${this.selected.value}`);-->
<!--this.i18n = getLanguage(this.language);-->
<!--}-->
<!--};-->
<!--</script>-->
