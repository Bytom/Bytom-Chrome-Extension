<template>
  <transition
    :enter-active-class="transition.enter"
    :leave-active-class="transition.leave">
    <div
      role="alert"
      v-show="isActive"
      class="toast is-top"
      :class="[`toast-${type}`]"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      @click="whenClicked">
      <div class="toast-icon"></div>
      <p class="toast-text" v-html="message"></p>
    </div>
  </transition>
</template>

<script>
  import {removeElement} from './helpers.js';
  import Timer from "./timer.js";
  import eventBus from './bus.js'
  import "../theme/index.scss"

  export default {
    name: 'toast',
    props: {
      message: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'success'
      },
      duration: {
        type: Number,
        default: 3000
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      onClose: {
        type: Function,
        default: () => {
        }
      },
      onClick: {
        type: Function,
        default: () => {
        }
      },
      queue: Boolean,
      pauseOnHover: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        isActive: false,
        parentTop: null,
        parentBottom: null,
        isHovered: false,
      }
    },
    beforeMount() {
      this.setupContainer()
    },
    mounted() {
      this.showNotice();
      eventBus.$on('toast.clear', this.close)
    },
    methods: {
      setupContainer() {
        this.parentTop = document.querySelector('.notices.is-top');
        if (this.parentTop ) return;
        if (!this.parentTop) {
          this.parentTop = document.createElement('div');
          this.parentTop.className = 'notices is-top';
        }
        const container = document.body;
        container.appendChild(this.parentTop);
      },
      shouldQueue() {
        if (!this.queue) return false;
        return (
          this.parentTop.childElementCount > 0
        )
      },
      close() {
        this.timer.stop();
        clearTimeout(this.queueTimer);
        this.isActive = false;
        // Timeout for the animation complete before destroying
        setTimeout(() => {
          this.onClose.apply(null, arguments);
          this.$destroy();
          removeElement(this.$el)
        }, 150)
      },
      showNotice() {
        if (this.shouldQueue()) {
          // Call recursively if should queue
          this.queueTimer = setTimeout(this.showNotice, 250);
          return
        }
        this.correctParent.insertAdjacentElement('afterbegin', this.$el);
        this.isActive = true;
        this.timer = new Timer(this.close, this.duration);
      },
      whenClicked() {
        if (!this.dismissible) return;
        this.onClick.apply(null, arguments);
        this.close()
      },
      toggleTimer(newVal) {
        if (!this.pauseOnHover) return;
        newVal ? this.timer.pause() : this.timer.resume();
      }
    },
    computed: {
      correctParent() {
          return this.parentTop;
      },
      transition() {
        return {
          enter: 'fadeInDown',
          leave: 'fadeOut'
        };
      },
    },
    beforeDestroy() {
      eventBus.$off('toast.clear', this.close)
    }
  }
</script>
