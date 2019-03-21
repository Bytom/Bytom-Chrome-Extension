<style scoped>
.protocol {
    height: 490px;
    padding:0;
}
.content {
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 380px;
  overflow-y: scroll;
  margin: 20px;
}
.content::-webkit-scrollbar {
    width: 0 !important;
}
  .title{
    background-image: url("../../assets/img/backgroundHead/protocol.svg");
    background-size: 320px 80px;
    height: 40px;
    width: 280px;
    padding: 20px;
    color: white;
  }
</style>
<template>
    <div class="warp bg-gray">

        <section class="protocol panel">
            <div class="title" style="font-size: 17px;">
              {{ $t('protocol.title') }}
            </div>
            <div style="font-size: 11px; width: 100%;">
                <pre class="content">{{ $t('protocol.content') }}</pre>
            </div>
        </section>
        <section class="btn-group">
            <div class="btn btn-primary btn-startup" @click="$router.go(-1)">{{ $t('welcome.confirm') }}</div>
        </section>
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
