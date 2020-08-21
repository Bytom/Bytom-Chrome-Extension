<template>
    <div >
        <i :class="['iconfont icon_arrow_left',{small: small}]" @click="goBack()"></i>
    </div>
</template>

<script>
export default {
    props: {
      des:null,
      small:false,
      back:{
        type: Function
      }
    },
    methods: {
      goBack:function () {
        if(this.back){
          this.back()
        }else{
          this.des?
            this.$router.push({name: this.des}): this.$router.go(-1)
        }
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

.small{
  width: 56px;
  height: 12px;
  background: #EEEEEE;
  border-radius: 20px;
  padding: 2px 16px;
}
</style>
