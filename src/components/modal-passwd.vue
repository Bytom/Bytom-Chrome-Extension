<style scoped>
.mask {
    z-index: 3 !important;
}

.confirm {
    padding: 20px 16px;
    position: absolute;
    width: 260px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 4;
    margin: auto;
    top: 0;
    height: 131px;
    border-radius: 8px;
}

.btn-inline {
    display: flex;
    padding: 0;
    justify-content: space-between;
}
.btn-inline .btn {
    width:47%;
}
</style>

<template>
    <div>
        <section v-show="show" class="mask"></section>
        <transition name="page-transfer" <!-- enter-active-class="animated slideInUp faster" leave-active-class="animated slideOutDown faster"> -->
            <div v-show="show" class="confirm form bg-white">
                <div class="form-item">
                    <div class="form-item-content">
                        <input v-if="text_placeholder" type="text" v-model="passwd" :placeholder="text_placeholder" autofocus>
                        <input v-else type="password" v-model="passwd" :placeholder="$t('transfer.password')" autofocus>
                    </div>
                </div>
                <div class="btn-group btn-inline">
                    <div class="btn btn-outlined" @click="close">{{ $t('welcome.cancel') }}</div>
                    <div :class="['btn', netType ==='vapor'?'btn-vapor':'btn-bytom']"  @click="confirm">{{ $t('welcome.confirm') }}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { getLanguage } from "@/assets/language"
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            show: false,
            passwd: ""
        };
    },
    props: {
        text_placeholder:{
            type: String,
        },
        text_error_hint:{
            type: String,
        },
        i18n: {
            type: String,
            default: 'cn',
        }
    },
    computed: {
        ...mapGetters([
          'language',
          'netType'
        ])
    },
    methods: {
        open() {
            this.i18n = getLanguage(this.language);
            this.show = true;
            this.passwd = "";
        },
        close() {
            this.show = false;
        },
        confirm() {
            if (this.passwd == "") {
                this.$toast.error(
                    this.text_error_hint || this.$t("transfer.emptyPassword")
                );
                return;
            }

            this.close();
            this.$emit("confirm", this.passwd);
        }
    }
};
</script>
