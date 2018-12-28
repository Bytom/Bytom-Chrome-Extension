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
  width: 200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #1bc1b0;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-footer {
  height: 35px;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<template>
  <transition name="modal">
    <div class="modal-mask" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              {{ header }}
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{ body }}
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <a class="btn btn-primary" @click="closeDialog()">
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
    }
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
