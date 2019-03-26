<style scoped>
.modal-mask {
  position: fixed;
  z-index: 997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 260px;
  margin: 0px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-size: 16px;
  margin-top: 0;
  text-align: center;
}

.modal-body {
  font-size: 14px;
  margin: 5px 0 20px;
  text-align: center;
}

.modal-footer .btn{
  padding-top: 15px;
  height: 48px;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.icon{
  width: 48px;
  height: 48px;
  margin: 10px auto 20px;
}
.icon-success{
  background-image: url('../../assets/img/icon/success.svg');
}
  .icon-error{
    background-image: url('../../assets/img/icon/error.svg');
  }
</style>

<template>
  <transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div :class="icon">
          </div>

          <div class="modal-header color-black">
            <slot name="header">
              {{ header }}
            </slot>
          </div>

          <div class="modal-body color-grey">
            <slot name="body">
              {{ body }}
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <a :class="btn" @click="closeDialog()">
                {{ confirm }}
              </a>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {
      show: false,
    };
  },
  props: {
    header: {
      type: String
    },
    body: {
      type: String
    },
    confirm: {
      type: String,
      default: "OK"
    },
    type:{
      type: String,
      default: 'error'
    }
  },
  computed: {
    icon: function () {
      switch(this.type){
        case "error":
          return "icon icon-error"
        default:
          return "icon icon-success"
      }
    },
    btn: function () {
      switch(this.type){
        case "error":
          return "btn btn-warning"
        default:
          return "btn btn-primary"
      }
    },

  },
  methods: {
    showDialog: function() {
      this.show = true;
    },
    closeDialog: function() {
      this.show = false;
      this.$emit('on-close');
    }
  }
}
</script>
