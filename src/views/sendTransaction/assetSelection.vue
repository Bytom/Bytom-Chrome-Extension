<style lang="scss" scoped>
  .header{
    display: flex;
    margin-bottom: 20px;
    h1{
      margin-left: 12px;
      font-size: 20px;
    }
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
        <section>
          <SelectionPage :value="asset" :options="assets" :onChange="assetToggle"></SelectionPage>
        </section>
        <section>
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
        ...mapGetters([
          'currentAccount',
          'netType'
        ])
    },
    methods: {
      assetToggle: function(event){
        this.asset = event.target.value
      },
      ...mapActions([
        Actions.SET_CURRENT_ASSET,
      ]),
      setAsset(asset){
        this[Actions.SET_CURRENT_ASSET](asset)
        this.$router.go(-1)
      }
    },
    mounted() {
    },
  };
</script>
