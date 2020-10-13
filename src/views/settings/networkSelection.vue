<style lang="scss" scoped>
  .header{
    display: flex;
    margin-bottom: 20px;
    h1{
      margin-left: 12px;
      font-size: 20px;
    }
  }

  .selction-section{
    height: calc( 100% - 149px );
    overflow: scroll;
  }

</style>

<template>
    <div class="warp-menu bg-grey">
        <section class="header">
          <BackButton :small="true" />
          <h1 class="color-black">
            <div class="welcome-title">{{ $t("setting.network") }}</div>
          </h1>
        </section>
        <section class="selction-section">
          <SelectionPage :value="data" :options="options" :onChange="changeNetwork"></SelectionPage>
        </section>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import _ from 'lodash';

export default {
    name: "",
    data() {
        return {
          data :'',
          options: [
            { label: this.$t('main.mainnet'), value: "mainnet" },
            { label: this.$t('main.testnet'), value: "testnet" }
          ],
        };
    },
    computed: {
      ...mapState([
        'bytom',
      ]),
      ...mapGetters([
        'net'
      ])
    },
    methods: {
      changeNetwork(event){
        const network = event.target.value

        if (this.net != network) {
          const bytom = this.bytom.clone();

          bytom.settings.network = network;
          if(!_.isEmpty(bytom.keychain.pairs[network])){
            bytom.currentAccount = Object.values(bytom.keychain.pairs[network])[0]
          }else{
            bytom.currentAccount = null
          }
          this.data = network;
          this[Actions.UPDATE_STORED_BYTOM](bytom)
        }
      },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
      ])
    },
    mounted() {
      if(this.net){
        this.data = this.net
      }
    },
  };
</script>
