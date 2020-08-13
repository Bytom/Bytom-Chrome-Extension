<style scoped>
.mnemonic{
    font-size: 16px;
    width: 33%;
    display: inline-block;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    text-align: center;
    color: rgba(0, 0, 0, 0.88);
    margin: 10px 0;
  }

  .mnemnonic-box{
    background: #FAFAFA;
    border: 2px solid #EBEBEB;
    box-sizing: border-box;
    border-radius: 8px;
    word-break: break-all;
    padding: 10px;
    margin:12px 0;
  }
  .header{
    display: flex;
  }
  .welcome-title{
    margin-left: 10px;
  }
  .hint{
    font-size: 14px;
    letter-spacing: 0.2px;
    color: rgba(0, 0, 0, 0.64);
    margin-bottom: 20px;
  }
</style>

<template>
     <div class="warp-child bg-grey">
        <section class="header">
          <BackButton :small="true" />
          <h1 class="color-black">
            <div class="welcome-title">{{ $t("backup.mnemonic") }}</div>
          </h1>
        </section>
        <section >
          <div class="mnemnonic-box">
                <span class="mnemonic" v-for="n in inputMnemonic">{{ n }} </span>
            </div>
            <p class="hint">{{ $t('backup.mnemonicHint') }}</p>
            <button class="btn btn-primary">{{ $t("backup.ok") }}</button>
        </section>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import {RouteNames} from '@/router'

export default {
    name: "",
    data() {
        return {};
    },
    computed: {
        inputMnemonic: function () {
            return this.mnemonic? this.mnemonic.split(' ') :null
        },
        ...mapState([
            'mnemonic'
        ])
    },
    methods: {
        ...mapActions([
        Actions.SET_MNEMONIC
      ])
    },
    mounted() {
      if (!this.mnemonic){
        this.$router.push({ name: RouteNames.BACKUP })
      }
    },
    beforeDestroy() {
      if(this.mnemonic){
        this[Actions.SET_MNEMONIC](null)   
      }
    }
};
</script>
