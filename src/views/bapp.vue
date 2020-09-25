<style lang="scss" scoped>
.bapp_list{
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 16px;
  .title{
    color: white;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 7px;
  }

  .description{
    font-weight: 300;
    font-size: 13px;

    color: rgba(255, 255, 255, 0.72);
  }

  img{
    border-radius: 32px;
    height: 58px;
    width: 58px;
  }
}

</style>

<template>
  <div class="warp-menu bg-grey">
    <div class="bapp_lists">
      <a class="bapp_list" :href="bapp.link" target="_blanket" v-for="(bapp, index) in dataList"  :style="{ background: bapp.color }">
        <div>
          <div class="title">{{bapp.title}}</div>
          <div class="description">{{bapp.description}}</div>
        </div>
        <img :src="src(bapp.icon)" :alt="bapp.icon" v-on:error="onImgError($event, bapp.icon)"/>

      </a>

    </div>
  </div>
</template>

<script>
import bappData from '@/assets/bapp/bapp.json'
import _ from 'lodash';
import { bappImgUrl, bappRequestUrl } from '@/utils/constants.js'


export default {
    name: "",
    components: {},
    data() {
        return {
            jsonData: bappData
        };
    },
    computed: {
      dataList(){
        const lng = this.$i18n.locale
        let list = this.jsonData.list
        if(lng ==='zh' ||lng ==='cn' ){
          list = list.map((l , index)=> Object.assign(l, this.jsonData['cn'][index]))
        }else{
          list = list.map((l , index)=> Object.assign(l, this.jsonData['en'][index]))
        }
        return list;
      },
    },
    methods: {
      src: function(name){
        try {
          const src = require(`@/assets/img/bapp/${name}`)
          return src
        } catch (ex) {
          return `${bappImgUrl}${name}`
        }
      },
      onImgError: function(event, name) {
        event.target.src = `${bappImgUrl}${name}`
      }
    },
    mounted() {
      //  Todo: update to production before publish
      fetch(bappRequestUrl)
        .then(response => response.json())
        .then(json => {
          if(!_.isEqual(json, bappData)){
            this.jsonData = json
          }
        });
    }
};
</script>
