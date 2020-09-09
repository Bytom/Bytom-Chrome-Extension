<style lang="scss" scoped>

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
  .form-item{
    margin: 10px 0;
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

  .textarea{
    width: calc(100% - 40px);
    min-height: 213px;
    background: #FAFAFA;
    border-radius: 8px;
    border: none;
    padding: 20px;
  }


  .mnemonic-panel, .target-mnemonic-panel {
    padding: 0 16px;
    &>div{
      width: 25%;
      display: inline-block;
      text-align: center;
      div{
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        box-sizing: border-box;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.88);
        font-weight: 500;
        font-size: 16px;
        margin: 6px;
        cursor: pointer;
        padding: 5px 0;

        &.active{
          background: #004EE4;
          color: white;
          border: 0px;
        }
      }
    }
  }

  .mnemonic-panel{
    margin-bottom: 10px;
  }

  .target-mnemonic-panel {
    background: #FAFAFA;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 18px;
    min-height: 148px;

    div{
      cursor: auto !important;
    }
  }
</style>

<template>
   <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <BackButton :des="'welcome-mnemonic'"/>
        <h1>
          <div class="welcome-title">{{ $t('verifyMnemonic.title')}}</div>
        </h1>
      </div>
      <div class="divider"></div>
      <div class="container">
        <div class="target-mnemonic-panel">
          <div v-for="index in inputMnemonicIndex">
            <div> {{ mnemonicList[index] }}</div>
          </div>
        </div>
          <div class="mnemonic-panel">
            <div v-for="(word, index) in mnemonicList">
              <div :class="activeWord(index)" @click="updateMnemonicList(index)"> {{ word }}</div>
            </div>
          </div>
          <div>
            <button :class="['btn btn-primary btn-round float-right',{disable: disableBtn}]" @click="verify" :disabled="disableBtn"><i class="iconfont icon-right-arrow"></i></button>
          </div>
        </div>
     </div>
      <Footer/>
  </div>
</template>

<script>
import account from "../../models/account";
import { getLanguage } from '@/assets/language'
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import {RouteNames} from '@/router'


export default {
    name: "",
    data() {
        return {
            inputMnemonicIndex:[]
        };
    },
    computed: {
      mnemonicList(){
        if(this.mnemonic){
          const a = this.mnemonic.split(' ')

          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }

          return a;
        } else{
          return []
        }
      },
      disableBtn(){
        const formMnemonic = this.inputMnemonicIndex.map(i => this.mnemonicList[i]).join(" ")
        return this.inputMnemonicIndex.length !==12 || formMnemonic !==this.mnemonic;
      },
      ...mapState([
        'bytom',
        'mnemonic'
      ]),
      ...mapGetters([
        'currentAccount',
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
        verify: function () {
          const formMnemonic = this.inputMnemonicIndex.map(i => this.mnemonicList[i]).join(" ")

          if (formMnemonic !== this.mnemonic) {
            this.$toast.error(
              this.$t("error.BTM0002")
            );
            return;
          }

          let loader = this.$loading.show({
            container: null,
            canCancel: true,
            onCancel: this.onCancel
          });

          account.createAccount(this).then(() => {
            loader.hide();
            this[Actions.PUSH_ALERT](this.$t("successMsg.createWallet"))
          }).catch(error => {
            let e = error
            if (error.code){
              e = this.$t(`error.${error.code}`)
            }else if(error.message){
              e = error.message
            }
            this.$toast.error(e)
          });
        },
        updateMnemonicList(index){
          const i = this.inputMnemonicIndex.indexOf(index)
          if(i !== -1){
            this.inputMnemonicIndex.splice(i, 1)
          }else{
            this.inputMnemonicIndex.push(index)
          }
        },
        activeWord(index){
          return this.inputMnemonicIndex.includes(index)?  "active": "";
        },
        ...mapActions([
          Actions.UPDATE_STORED_BYTOM,
          Actions.PUSH_ALERT
        ])
    },
    mounted() {
      if (!this.mnemonic){
        this.$router.push({ name: RouteNames.MNEMONIC })
      }
    }
};
</script>
