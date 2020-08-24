<style scoped>
  .logo{
    width: 24px;
    height: 24px;
    margin-right: 5px;
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

  .a-tag{
    font-size: 12px;
    line-height: 160%;
    text-align: right;
    letter-spacing: 0.2px;
    color: #5A5A5A;
  }

  .a-tag.active{
    color: #004EE4;
  }
  .font-12{
    font-size: 12px;
  }
</style>
<template>
  <section class="footer">
    <div class="inside-warp d-flex">

      <div class="d-flex">
        <img class="logo" src="@/assets/logo_small.png" alt="">
        <div class="text">Byone Wallet for Chrome</div>
      </div>
      <div>
        <a class="a-tag" v-bind:class="{ active: (language =='zh'||language =='cn') }"  @click="changeLanguage('cn')">
          中
        </a>
        <span class="font-12">/</span>
        <a class="a-tag" v-bind:class="{ active: language =='en'  }" @click="changeLanguage('en')">
          En
        </a>
      </div>
    </div>
  </section>
</template>

<script>
  import * as Actions from '@/store/constants';
  import {  mapActions, mapGetters, mapState } from 'vuex'
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
    ...mapActions([
      Actions.UPDATE_STORED_BYTOM,
    ])
  }
}
</script>
