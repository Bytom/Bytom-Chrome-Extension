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
  <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <BackButton des="welcome-creation"/>
        <h1>
          <div class="welcome-title">{{ $t('mnemonic.title')}}</div>
        </h1>
      </div>
      <div class="divider"></div>
      <div class="container">
          <div>
            <p class="hint">{{ $t('mnemonic.hint')}}</p>
            <div class="mnemnonic-box">
                <span class="mnemonic" v-for="n in mnemonic">{{ n }} </span>
            </div>
          </div>
          <div>
            <div class="btn btn-primary btn-round float-right" @click="$router.push({ name: 'welcome-verify-mnemonic' })"><i class="iconfont icon-right-arrow"></i></div>
          </div>
        </div>
     </div>
      <Footer/>
  </div>
</template>

<script>
import { getLanguage } from '@/assets/language'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    name: "",
    computed: {
        mnemonic: function () {
            return this.currentAccount.mnemonic.split(' ')
        },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount'
      ])
    },
};
</script>
