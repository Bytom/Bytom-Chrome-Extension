<style scoped>
  .header {
    position: relative;
    margin:40px 0px 20px;
    line-height: 37px;
  }
  .header h1{
    margin-top: 20px;
  }
  .container{
    position: relative;
    margin-top: 24px;
    height: calc(100% - 210px);
  }

.content {
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 380px;
  overflow-y: scroll;
  font-size: 13px;
  height: 100%;
}
.content::-webkit-scrollbar {
    width: 0 !important;
}

</style>
<template>
    <div class="warp">
      <div class="header color-black">
        <BackButton/>
        <h1>
          <div class="welcome-title">{{ $t('privacy.title') }}</div>
        </h1>
      </div>
      <div class="divider"></div>


      <div class="container">
          <pre class="content">{{ $t('privacy.content') }}</pre>
      </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {
    }
};
</script>
