<style lang="scss" scoped>
  .header{
    display: flex;
    margin-bottom: 20px;
    h1{
      margin-left: 12px;
      font-size: 20px;
    }
  }
  .panel{
    text-align: center;
    padding: 17px 0;
    margin: 0;
  }
  #qrcode {
    width: 150px;
    height: 150px;
    margin: 10px auto;
  }

  .vp-warning {
    text-align: center;
    width: 100%;
    font-size: 12px;
    margin-top: 12px;
  }

  .address-text{
    cursor: pointer;
    font-size: 12px;
    max-width: 150px;
    word-break: break-all;
    margin-left: auto;
    margin-right: auto;
    line-height: 18px;
  }
  .footer{
    text-align: center;
    position: absolute;
    bottom: 20px;
    width: 100%;
    font-size: 12px
  }

  .iconCopy{
    font-size: 14px;
  }

  .select{
    height: 32px;
    width: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .c-icon{
    position: absolute;
    top: 40%;
    left: 42%;
    height: 20px;
    background: white;
    border: 0.5px solid rgba(0, 0, 0, 0.24);
    padding: 2px;
    border-radius: 15px;
  }

  .qr-box{
    position: relative;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<template>
  <div class="warp-child bg-grey">
    <section class="header">
      <BackButton :small="true" :des="'home'"/>
      <h1 class="color-black">
        <div class="welcome-title">{{ $t('main.receive')}}</div>
      </h1>
    </section>

    <div class="bg-shadow-white panel">
      <div>
        <v-select class="select" v-bind:colorBlack="true"  :value="currentCoin" :clearable="false" :options="coins" :onChange="coinToggle"></v-select>
      </div>
      <div class="qr-box">
        <img :src="img(currentCoin)" alt="" class="c-icon">
        <div id="qrcode"></div>
      </div>
      <div class="color-grey-36 address-text"  :title="addressTitle" :data-clipboard-text="addr">{{addr}}<i class="iconfont iconCopy"></i></div>
    </div>
    <div v-if="netType === 'vapor'" class="vp-warning color-red"> {{$t('receive.vpWarning')}}</div>
  </div>
</template>

<script>
  import QRCode from "qrcodejs2";
  import ClipboardJS from "clipboard";
  import {  mapGetters } from 'vuex'

  export default {
  data() {
    return {
      addr: "111",
      qrcode: Object,
      clipboard: new ClipboardJS(".address-text"),
      addressTitle: this.$t("main.copy"),
      currentCoin:'BTM'
    };
  },
    computed: {
      coins: function(){
        let symbols
        if(this.netType === 'vapor'){
          symbols = this.currentAccount.vpBalances.map(a => a.asset.symbol)
        }else{
          symbols = this.currentAccount.balances.map(a => a.asset.symbol)
        }
        if(symbols.length >1){
          const index = symbols.indexOf("BTM")
          symbols.splice(index,1)
          symbols.unshift("BTM")
        }

        return symbols || []
      },
      ...mapGetters([
        'currentAccount',
        'netType'
      ])
    },
  methods: {
    img:function (symbol) {
        const _symbol = symbol.toLowerCase();
        if(this.netType === 'vapor'){
          return `https://cdn.blockmeta.com/resources/logo/vapor/${_symbol}.png`
        }else{
          return `https://cdn.blockmeta.com/resources/logo/bytom/${_symbol}.png`
        }
      },
    close: function () {
      this.$router.go(-1)
    },
    coinToggle: function(symbols){
      this.currentCoin = symbols
    },
    setupClipboard() {
      this.clipboard.on("success", e => {
        this.$toast.success(
          this.$t("dialog.copy.success")
        );
      });
      this.clipboard.on("error", e => {
        this.$toast.error(
          this.$t("dialog.copy.fail")
        );
      });
    },
  },
  mounted() {
    if (this.currentAccount.address != undefined) {
      if(this.netType === 'vapor'){
        this.addr = this.currentAccount.vpAddress;
      }else{
        this.addr = this.currentAccount.address;
      }
      this.qrcode = new QRCode( "qrcode", {
        text: this.addr,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
    this.setupClipboard();
  },
  beforeDestroy() {
    this.clipboard.destroy();
  }
};
</script>
