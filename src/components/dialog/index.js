import Vue from 'vue';
import dialog from "./component"

let instance;
const dialogInstance = {
  i18n: null,
  install: function (Vue, options) {
    Vue.component('v-dialog', dialog);
    Vue.prototype.$dialog = dialogInstance;
    this.i18n = options;
  },
  close: function() {
    if(instance) {
      instance.$children[0].closeDialog();
      instance.onClose();
    }
  },
  show: function(op) {
    let data = {
      header: this.i18n.t("dialog.header"),
      body: "",
    };
    if (op.header) {
      data.header = op.header;
    }
    if (op.body) {
      data.body = op.body;
    }
    if (op.confirm) {
      data.confirm = op.confirm;
    }
    instance = new Vue({
      data: data,
      methods: {
        onClose: function() {
          this.$destroy();
          document.getElementById("app").removeChild(this.$el);
        },
      },
      render (h) {
        return h(dialog, {
          props: {
            header: this.header,
            body: this.body,
            confirm: this.confirm,
          },
          on: {
            onClose: this.onClose,
          }
        });
      }
    });
    const component = instance.$mount();
    document.getElementById("app").appendChild(component.$el);
    instance.$children[0].showDialog();
  }
};

export default dialogInstance;