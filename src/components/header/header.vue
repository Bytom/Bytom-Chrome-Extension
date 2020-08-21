<style lang="" scoped>
  .header {
    display: flex;
  }
  .header i{
    position: absolute;
  }
  .header p{
    text-align: center;
    width: 100%;
    padding: 17px 0;
  }
</style>

<template>
  <section class="header bg-header">
    <i class="iconfont icon_arrow_left" @click="$router.go(-1)"></i>
    <p>{{ title }}</p>
  </section>
</template>

<script>
export default {
    props: {
        title: ""
    },
    methods: {
    }
};
</script>
