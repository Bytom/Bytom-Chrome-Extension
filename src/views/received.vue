<style lang="" scoped>
  .header {
    display: flex;
  }
  .header p{
    text-align: center;
    width: 280px;
    padding-top: 17px;
  }
  .panel{
    text-align: center;
    padding: 38px;
  }
  #qrcode {
    width: 150px;
    height: 150px;
    margin: 30px auto;
  }

  .address-text{
    cursor: pointer;
  }
  .footer{
    text-align: center;
    position: absolute;
    bottom: 20px;
    width: 100%;
    font-size: 12px
  }

</style>

<template>
  <div class="warp-chlid bg-gray">
    <section class="header bg-header">
      <i class="iconfont icon-back" @click="close"></i>
      <p>{{ $t('main.receive') }}</p>
    </section>

    <div class="panel">
      <div id="qrcode"></div>
      <p>{{$t('receive.address')}}</p>
      <span class="color-black font-medium address-text"  :title="addressTitle" :data-clipboard-text="addr">{{addr}}</span>
    </div>
    <div class="footer color-grey"> {{$t('receive.tips')}}</div>
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
      addressTitle: this.$t("main.copy")
    };
  },
    computed: {
      ...mapGetters([
        'currentAccount',
      ])
    },
  methods: {
    close: function () {
      this.$router.go(-1)
    },
    setupClipboard() {
      this.clipboard.on("success", e => {
        this.$dialog.show({
          type: 'success',
          header: this.$t("dialog.header"),
          body: this.$t("dialog.copy.success")
        });
      });
      this.clipboard.on("error", e => {
        this.$dialog.show({
          header: this.$t("dialog.header"),
          body: this.$t("dialog.copy.fail")
        });
      });
    },
  },
  mounted() {
    if (this.currentAccount.address != undefined) {
      this.addr = this.currentAccount.address;
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
