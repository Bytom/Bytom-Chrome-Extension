<style scoped>
  .row {
    margin: 25px 0;
    display: flex;
    align-items: center;
    word-wrap: break-word;
  }
  .row .label{
    flex-grow: 1;
    width: 150px;
  }
  .link{
    word-break: break-word;
    color: #035BD4;
  }
</style>

<template>
    <MenuPage :title="$t('help.title')">
      <div class="row">
        <div class="label">
          <p>{{ $t("setting.version") }}</p>
        </div>
        <p class="value">[AIV]{version}[/AIV]-{{hashVersion}}</p>
      </div>
      <div class="row">
        <div class="label">
          <p>{{ $t("help.page") }}</p>
        </div>
        <a class="link" href="http://github.com/bycoinio/Bystore" target="_blank">http://github.com/bycoinio/Bystore</a>
      </div>
    </MenuPage>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      hashVersion: ""
    };
  },
  mounted: function () {
    this.hashVersion = version.hash;
  }
};
</script>
