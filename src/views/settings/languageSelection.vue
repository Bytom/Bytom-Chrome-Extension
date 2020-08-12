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
            <div class="welcome-title">{{ $t("setting.lang")}}</div>
          </h1>
        </section>
        <section class="selction-section">
          <SelectionPage :value="lang" :options="options" :onChange="changeLanguage"></SelectionPage>
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
          lang :'',
          options: [
              { label: "中文", value: "cn" },
              { label: "English", value: "en" }
          ],
        };
    },
    computed: {
      ...mapState([
        'bytom',
      ]),
      ...mapGetters([
        'language',
      ])
    },
    methods: {
      changeLanguage(event){
        const lang = event.target.value

        if (this.language != lang) {
          const bytom = this.bytom.clone();

          bytom.settings.language = lang;
          this.$i18n.locale = lang;
          this.lang = lang;
          this[Actions.UPDATE_STORED_BYTOM](bytom)
        }
      },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
      ])
    },
    mounted() {
      if(this.language){
        this.lang = this.language ==='zh'? 'cn': this.language
      }
    },
  };
</script>
