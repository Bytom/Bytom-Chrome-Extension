<style scoped>
  .logo{
    width: 24px;
    height: 24px;
  }

  .text{
    font-size: 12px;
    color:rgba(0, 0, 0, 0.24);
  }

  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #FAFAFA;
  }

  .inside-warp{
    justify-content: space-between;
    padding: 22.5px 0;
  }
</style>
<template>
  <section class="footer">
    <div class="inside-warp d-flex">

      <div class="d-flex">
        <img class="logo" src="@/assets/logo.png" alt="">
        <div class="text">Byone Wallet for Chrome</div>
      </div>
      <div>
        <button @click="changeLanguage('zh')">
          中
        </button>
        <button @click="changeLanguage('en')">
          En
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import * as Actions from '@/store/constants';
  import {  mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'bytom'
    ]),
    ...mapGetters([
      'language',
    ])
  },
  methods: {
    changeLanguage(lang) {
      const bytom = this.bytom.clone();

      if (bytom.settings.language != lang) {
        bytom.settings.language = lang;
        this.$i18n.locale = lang;
        this[Actions.UPDATE_STORED_BYTOM](bytom)
      }
    },
  }
}
</script>
