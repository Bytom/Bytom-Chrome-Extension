import Component from './Component'
import eventBus from './bus.js';

const Api = (Vue, globalOptions = {}) => {
  return {
    open(options) {
      let message;
      if (typeof options === 'string') message = options;

      const defaultOptions = {
        message
      };

      const propsData = Object.assign({}, defaultOptions, globalOptions, options);

      return new (Vue.extend(Component))({
        el: document.createElement('div'),
        propsData
      })
    },
    clear() {
      eventBus.$emit('toast.clear')
    },
    success(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'success'
      }, options))
    },
    error(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'error'
      }, options))
    },
    info(message, options = {}) {
      return this.open(Object.assign({}, {
        message,
        type: 'info'
      }, options))
    },
  }
};

export default Api;
