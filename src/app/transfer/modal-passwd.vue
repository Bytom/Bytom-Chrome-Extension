<style scoped>
.mask {
  z-index: 3 !important;
  top: 60px !important;
}

.confirm {
  padding: 10px 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
}

.btn-inline {
  display: flex;
  padding: 0;
}
.btn-inline .btn {
  margin: 10px 15px;
}
.form-item-content-en {
  margin-left: 145px;
}
.form-item-content-cn {
  margin-left: 85px;
}
</style>

<template>
    <div>        
        <section v-show="show" class="mask"></section>
        <transition name="page-transfer"
        <!-- enter-active-class="animated slideInUp faster" 
        leave-active-class="animated slideOutDown faster"> -->
            <div v-show="show" class="confirm form bg-gray">
                <div class="form-item">
                    <label class="form-item-label">{{ $t('transfer.confirmPassword') }}</label>
                    <div :class="passwdStyle">
                    <input type="password" v-model="passwd" autofocus>
                    </div>
                </div>
                <div class="btn-group btn-inline">
                    <div class="btn bg-green" @click="confirm">{{ $t('welcome.confirm') }}</div>
                    <div class="btn bg-red" @click="close">{{ $t('welcome.cancel') }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {have} from "../../assets/language"
const CLASS_CN = "form-item-content form-item-content-cn";
const CLASS_EN = "form-item-content form-item-content-en"
export default {
  data() {
    return {
      show: false,
      passwd: ""
    };
  },
  props: {
    i18n: {
      type: String,
      default: 'cn',
    }
  },
  computed: {
    passwdStyle: function() {
      if (this.i18n == "cn") {
        return CLASS_CN;
      } else if (this.i18n == "en") {
        return CLASS_EN;
      }
      return CLASS_CN;
    },
  },
  methods: {
    open() {
      if(have(localStorage.lang)) {
        this.i18n = localStorage.lang;
      }
      this.show = true;

      this.passwd = "";
    },
    close() {
      this.show = false;
    },
    confirm() {
      if (this.passwd == "") {
        this.$dialog.show({
          body: this.$t("transfer.emptyPassword")
        });
        return;
      }

      this.close();
      this.$emit("confirm", this.passwd);
    }
  }
};
</script>

<style scoped>
</style>