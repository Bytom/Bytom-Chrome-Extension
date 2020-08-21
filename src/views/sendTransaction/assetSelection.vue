<style lang="scss" scoped>
  .header{
    display: flex;
    margin-bottom: 20px;
    h1{
      margin-left: 12px;
      font-size: 20px;
    }
  }
  .button-section{
    position: fixed;
    width: calc( 100% - 120px);
    bottom: 0;
    padding-bottom: 30px;
  }

  .selction-section{
    height: calc( 100% - 149px );
    overflow: scroll;
  }

</style>

<template>
    <div class="warp-child bg-grey">
        <section class="header">
          <BackButton :small="true" />
          <h1 class="color-black">
            <div class="welcome-title">{{ $t('transfer.asset')}}</div>
          </h1>
        </section>
        <section class="selction-section">
          <SelectionPage :value="asset" :options="assets" :onChange="assetToggle"></SelectionPage>
        </section>
        <section class="button-section">
          <button :class="['btn', netType ==='vapor'?'btn-vapor':'btn-bytom']" @click="setAsset(asset)">
            {{$t('common.confirm')}}
          </button>
        </section>

    </div>
</template>

<script>
import { camelize } from "@/utils/utils";
import { BTM } from "@/utils/constants";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';


export default {
    name: "",
    data() {
        return {
            asset:'BTM',
        };
    },
    computed: {
      assets: function () {
        if(this.netType === 'vapor'){
          return this.currentAccount.vpBalances.map(a => {return {label:a.asset.symbol, value:a.asset.symbol}})
        }else{
          return this.currentAccount.balances.map(a =>  {return {label:a.asset.symbol, value:a.asset.symbol}})
        }

      },
      ...mapState([
        'currentAsset'
      ]),
        ...mapGetters([
          'currentAccount',
          'netType'
        ])
    },
    methods: {
      assetToggle: function(event){
        this.asset = event.target.value
      },
      setAsset(asset){
        let balance
        if(this.netType === 'vapor'){
          balance = this.currentAccount.vpBalances.find(b => b.asset.symbol ==asset)
        }else{
          balance = this.currentAccount.balances.find(b => b.asset.symbol ==asset)
        }
        if(balance){
            this[Actions.SET_CURRENT_ASSET](balance.asset)
          }
        this.$router.go(-1)
      },
      ...mapActions([
        Actions.SET_CURRENT_ASSET,
      ])
    },
    mounted() {
      if(this.currentAsset){
        this.asset = this.currentAsset.symbol
      }
    },
  };
</script>
