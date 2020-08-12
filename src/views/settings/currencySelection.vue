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
            <div class="welcome-title">{{ $t("setting.currency") }}</div>
          </h1>
        </section>
        <section class="selction-section">
          <SelectionPage :value="data" :options="options" :onChange="changeCurrency"></SelectionPage>
        </section>

    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';

export default {
    name: "",
    data() {
        return {
          data :'',
          options: [
            { label: "CNY", value: "inCny" },
            { label: "USD", value: "inUsd" },
            { label: "BTC", value: "inBtc" }
          ],
        };
    },
    computed: {
      ...mapState([
        'bytom',
      ]),
      ...mapGetters([
        'currency'
      ])
    },
    methods: {
      changeCurrency(event){
        const curr = event.target.value

        if (this.currency != curr) {
          const bytom = this.bytom.clone();

          bytom.settings.currency = curr;
          this.data = curr;
          this[Actions.UPDATE_STORED_BYTOM](bytom)
        }
      },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
      ])
    },
    mounted() {
      if(this.currency){
        this.data = this.currency
      }
    },
  };
</script>
