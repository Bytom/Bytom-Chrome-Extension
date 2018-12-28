<template>
    <div class="mp bg-gray">
        <div>
            <i class="iconfont btn-close" @click="back">&#xe605;</i>
            <div class="title">{{title}}</div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: ""
  },
  methods: {
    back() {
      this.$emit("back");
    }
  }
};
</script>

<style scoped>
.mp {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px 30px;
}
.title {
  font-size: 24px;
  margin-bottom: 35px;
}
.content {
  word-wrap: break-word;
  font-size: 18px;
}
</style>