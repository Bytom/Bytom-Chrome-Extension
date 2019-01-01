<style scoped>
.warp {
  position: absolute;
  left: 35px;
  top: 135px;
  width: 220px;
  height: 200px;
  border-radius: 5px;
  text-align: center;
  padding: 30px;
}
#qrcode {
  display: inline-block;
}
p {
  word-wrap: break-word;
}
</style>

<template>
    <transition name="page-transfer"
        enter-active-class="animated zoomIn faster" 
        leave-active-class="animated zoomOut faster">
        <div v-show="show" class="warp bg-gray">
            <i class="iconfont btn-close" @click="close">&#xe605;</i>
            <div id="qrcode"></div>
            <p>{{addr}}</p>
        </div>
    </transition>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "",
  props: {},
  data() {
    return {
      show: false,
      addr: "111",
      qrcode: Object
    };
  },
  methods: {
    open: function(address) {
      this.show = true;
      this.addr = address;

      // 使用 API
      this.qrcode.clear();
      this.qrcode.makeCode(address);
    },
    close: function() {
      this.show = false;
    }
  },
  mounted() {
    this.qrcode = new QRCode("qrcode", {
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
};
</script>