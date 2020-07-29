<template>
    <div>
        <i class="iconfont icon-back" @click="goBack()"></i>
    </div>
</template>

<script>
export default {
    props: {
      des:null,
    },
    methods: {
      goBack:function () {
        this.des?
          this.$router.push({name: this.des}): this.$router.go(-1)
      }
    }
};
</script>

<style scoped>
.iconfont {
  cursor:pointer;
  background: #FAFAFA;
  border-radius: 20px;
  color: #333333;
  padding: 7px 19px;
}
.iconfont:hover {
  background: #F5F5F5;
}
</style>
