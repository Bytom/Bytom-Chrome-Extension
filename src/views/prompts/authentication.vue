<style lang="scss" scoped>
  .header{
    text-align: center;
    margin: 60px 0 20px;
  }
  .header h1{
    font-weight: 600;
    font-size: 28px;
    /* Text / Dark-Major */

    color: rgba(0, 0, 0, 0.88);
  }

  .btn-inline .btn {
    margin: 10px 15px;
  }
  .row{
    word-break: break-all;
  }
  .col{
    font-size: 14px;
    width: 35%;
  }
  .label{
    color: #7B7B7B;
  }
  .message{
    font-size: 13px;
    text-align: center;
    letter-spacing: 0.2px;
    color: rgba(0, 0, 0, 0.36);
    width: 260px;
    margin-left: auto;
    margin-right: auto;
  }
  .value{
    color: #282828;
    width: 60%;
  }
  table{
    width: 100%;
  }
  .form-item{
    padding:0;
    margin:0;
    margin-bottom: 10px;
  }
  .btn-container .btn{
    margin-top: 12px;
    height: 48px;
    width: 126px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 15px;
    font-weight: 600;
  }

  .network{
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 114px;
    border-radius: 12px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 7px;
    i{
      width: 3px;
      height: 3px;
      border: 2px solid #333333;
      border-radius: 4px;
      margin-right: 6px;
    }
  }

  .light-tag{
    font-size: 12px;
    text-align: center;
    color: rgba(0, 0, 0, 0.64);
    background: #FAFAFA;
    border-radius: 12px;
    padding: 2px 13px;
  }

  .logo{
    width: 52px;
    border-radius: 36px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    text-transform: uppercase;
    padding: 10px;
  }

  .logo-container{
    display: flex;
    color: #333333;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    i{
          margin: 0 15px;
    }
  }

  .btn-container{
    margin-top: 8px;
  }
</style>

<template>
  <div>
    <div class="warp bg-white">
      <section class="header">
        <h1>{{ isDisAuth? $t('disable.title'): $t('enable.title')}}</h1>
        <div class="network light-tag">
          <i></i>
          <div>{{netType}} {{$t(`main.${net}`)}}</div>
        </div>
      </section>

      <section>
        <div class="logo-container">
          <img v-if="prompt.data && prompt.data.icon" :src="prompt.data.icon" class="logo" alt="">
          <div v-else class="logo" >{{initial}}</div>
          <i class="iconfont icon_connect"></i>
          <img class="logo" src="@/assets/logo.png" alt="">
        </div>

      </section>

      <section >
        <div class="message"><span class="color-black">{{prompt.data ? prompt.data.title : prompt.domain}}</span>{{ isDisAuth? $t('disable.message'): $t('enable.message') }}</div>
        <div class="center-text">
          <span class="light-tag">
            {{ isDisAuth? $t('disable.domain'): $t('enable.domain') }} {{prompt.domain}}
          </span>

        </div>
        <div class="row btn-container">
          <div class="btn btn-primary" @click="accepted">{{ isDisAuth? $t('disable.confirm'): $t('enable.confirm') }}</div>
          <div class="btn btn-outlined color-black" @click="denied">{{ isDisAuth? $t('disable.cancel'): $t('enable.cancel') }}</div>
        </div>
      </section>
    </div>
    <Footer/>

  </div>

</template>

<script>
import { BTM } from "@/utils/constants";
import {apis} from '@/utils/BrowserApis';
import NotificationService from '../../services/NotificationService'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    data() {
        return {
            prompt:'',
            isDisAuth: false
        };
    },
    computed: {
      initial(){
        if(this.prompt && this.prompt.data && this.prompt.data.title){
          return this.prompt.data.title.substring(0,1)
        }else if(this.prompt && this.prompt.domain){
          return this.prompt.domain.substring(0,1)
        }
      },
      ...mapGetters([
        'net',
        'netType',
      ])
    },
    watch: {
    },
    methods: {
      accepted(){
        this.prompt.responder(true);
        NotificationService.close();
      },
      denied(){
        this.prompt.responder(false);
        NotificationService.close();
      }
    }, mounted() {
        this.prompt = window.data || apis.extension.getBackgroundPage().notification || null;
        this.isDisAuth = (this.prompt.data.type == 'dis')
      }
};
</script>
