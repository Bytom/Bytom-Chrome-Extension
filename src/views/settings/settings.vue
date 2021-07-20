<style scoped>
.row {
    margin: 25px 0;
    display: flex;
    align-items: center;
    width: calc( 100% - 32px);
    height: 21px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
}
.row .label{
    flex-grow: 1;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.2px;
}
.row .value {
    font-weight: 300;
    font-size: 13px;

    text-align: right;
    letter-spacing: 0.2px;

    color: rgba(0, 0, 0, 0.36);
    display: flex;
}
.setting {
    margin: 5px 0 0 0;
    width: 110px;
    height: 32px;
    position: relative;
}
.form-item-content .select {
    height: 32px;
}
.version{
  position: absolute;
  bottom: 30px;
  right: 20px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.36);
}
</style>

<template>
    <div class="warp-menu bg-grey">
        <div class="row" @click="$router.push({ name: 'settings-language' })">
            <div class="label  color-black">
                <p>{{ $t("setting.lang") }}</p>
            </div>
            <div class="value">
                {{ currentLanguage }} <i class="iconfont icon_arrow_1"></i>
            </div>
        </div>
        <div class="row" @click="$router.push({ name: 'settings-currency'})">
            <div class="label color-black">
                <p>{{ $t("setting.currency") }}</p>
            </div>
            <div class="value">
                {{ currentCurrency }} <i class="iconfont icon_arrow_1"></i>
            </div>
        </div>
      <div class="row" @click="$router.push({ name: 'settings-network'})">
            <div class="label color-black">
                <p>{{ $t("setting.network") }}</p>
            </div>
            <div class="value">
                {{ $t(`main.${net}`)  }} <i class="iconfont icon_arrow_1"></i>
            </div>
        </div>
        <div class="row" @click="$router.push({ name: 'settings-delete'})">
            <div class="label color-grey-36">
                <p>{{ $t("setting.deleteWallet") }}</p>
            </div>
            <div class="value">
                <i class="iconfont icon_arrow_1"></i>
            </div>
        </div>
        <div class="version" @click="onVersionClick">
          {{ $t("setting.version") }}[AIV]{version}[/AIV]
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {apis} from '@/utils/BrowserApis';
import { log } from 'util';

export default {
    name: "",
    data() {
        return {
          versionClickCount: 0
        };
    },
    computed: {
      currentLanguage(){
        if(this.language === 'cn' || this.language === 'zh'){
          return '中文'
        }else{
          return 'English'
        }
      },
      link(){
        return `${apis.runtime.getURL('pages/prompt.html')}`;
      },
      currentCurrency(){
        const currencyList = {
          'inCny':"CNY",
          'inUsd':"USD",
          'inBtc':"BTC",
        }

        return currencyList[this.currency]
      },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'language',
        'currency',
        'net'
      ])
    },
    methods: {
      onVersionClick () {
        this.versionClickCount++
        if (this.versionClickCount > 9) {
          this.versionClickCount = 0
          const url = window.prompt('testnet')
          if (url) {
            this.$toast.success('重新打开插件后生效')
            localStorage.setItem('testnet', url)
          }
        }
      }
    },
    mounted: function () {

    }
};
</script>
