<template>
    <div>
        <i class="iconfont icon-back" @click="$router.go(-1)"></i>
    </div>
</template>

<script>
export default {
    props: {
      msg:null,
    },
    methods: {
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
