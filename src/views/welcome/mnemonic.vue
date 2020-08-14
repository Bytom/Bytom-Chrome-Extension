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

  .mnemonic{
    font-size: 16px;
    width: 33%;
    display: inline-block;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    text-align: center;
    color: rgba(0, 0, 0, 0.88);
    margin: 10px 0;
  }

  .mnemnonic-box{
    background: #FAFAFA;
    border: 1px solid #EBEBEB;
    box-sizing: border-box;
    border-radius: 8px;
    word-break: break-all;
    padding: 10px;
    margin:12px 0;
  }

  .hint{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.64);
  }
</style>

<template>
  <div  :class="[isCurrentAccoutExist?'warp-menu warp-container':'warp' , 'bg-white' ]">
    <div>
      <div class="header color-black">
        <BackButton des="welcome-creation"/>
        <h1>
          <div class="welcome-title">{{ $t('mnemonic.title')}}</div>
        </h1>
      </div>
      <div class="divider"></div>

      <div v-if="mnemonic" class="container">
        <div>
          <p class="hint">{{ $t('mnemonic.hint')}}</p>
          <div class="mnemnonic-box">
            <span class="mnemonic" v-for="n in inputMnemonic">{{ n }} </span>
          </div>
        </div>
        <div>
          <div class="btn btn-primary btn-round float-right" @click="$router.push({ name: 'welcome-verify-mnemonic' })">
            <i class="iconfont icon-right-arrow"></i></div>
        </div>
      </div>
      <div  class="container" v-else>
        <div>
          <div class="form">
            <div class="form-item">
              <div class="form-item-content">
                <input type="password"
                       id="passwd1"
                       :placeholder="$t('mnemonic.passwordHint')"
                       name="passwd1"
                       ref="passwd1"
                       v-model="passwd"
                >
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="btn btn-primary btn-round float-right" @click="showMnemonic">
            <i class="iconfont icon-right-arrow"></i></div>
        </div>

      </div>
    </div>
    <Footer v-if="!isCurrentAccoutExist"/>
  </div>
</template>

<script>
import { getLanguage } from '@/assets/language'
import { mapActions, mapGetters, mapState } from 'vuex'
import account from "@/models/account";
import {RouteNames} from '@/router'
import * as Actions from '@/store/constants';

export default {
    name: "",
    data() {
      return {
        passwd:''
      };
    },
    computed: {
        isCurrentAccoutExist(){
        return this.currentAccount && this.currentAccount.alias
      },
        inputMnemonic: function () {
            return this.mnemonic? this.mnemonic.split(' '): null;
        },
      ...mapState([
        'bytom',
        'mnemonic'
      ]),
      ...mapGetters([
        'currentAccount'
      ])
    },
    methods: {
      showMnemonic: function () {
          if (! this.passwd) {
            this.$toast.error(
              this.$t("error.BTM0008")
            );
            return;
          }

          const vault = this.currentAccount.vault;
          try{
            const mnemonic = account.decryptMnemonic(vault, this.passwd, this)
            this[Actions.SET_MNEMONIC](mnemonic)
          }
          catch (e){
            this.$toast.error(
              e.message || e
            );
          }
      },
      ...mapActions([
        Actions.SET_MNEMONIC
      ])
    },
};
</script>
