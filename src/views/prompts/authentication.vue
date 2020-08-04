<style lang="" scoped>
  .warp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 600px;
    z-index: 2;
    overflow: scroll;
  }
  .header {
    display: flex;
  }
  .header p{
    text-align: center;
    width: 280px;
    padding-top: 17px;
  }

  .content {
    margin: 20px;
    padding: 20px;
    overflow: hidden;
    border-radius:4px;
    width: 280px;
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
    font-size: 14px;
    color: #7B7B7B;
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
    margin-top: 20px;
    height: 48px;
    width: 320px;
  }
</style>

<template>
  <div class="warp bg-gray">
    <section class="header bg-header">
      <i class="iconfont icon-back" @click="denied"></i>
      <p>{{ isDisAuth? $t('disable.title'): $t('enable.title')}}</p>
    </section>

    <section class="content bg-white">
      <table>
        <tbody>
          <tr class="row">
            <td class="col label">{{ isDisAuth? $t('disable.domain'): $t('enable.domain') }}</td>
            <td  class="col value">{{prompt.domain}}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="content bg-white">
      <div class="message">{{ isDisAuth? $t('disable.message'): $t('enable.message') }}</div>
    </section>

    <div class="row btn-container" style="bottom: 20px; left: 20px; position: absolute;">
      <div class="btn" @click="denied">{{ isDisAuth? $t('disable.cancel'): $t('enable.cancel') }}</div>
      <div class="btn bg-green" @click="accepted">{{ isDisAuth? $t('disable.confirm'): $t('enable.confirm') }}</div>
    </div>

  </div>
</template>

<script>
import { BTM } from "@/utils/constants";
import {apis} from '@/utils/BrowserApis';
import NotificationService from '../../services/NotificationService'


export default {
    data() {
        return {
            prompt:'',
            isDisAuth: false
        };
    },
    computed: {
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
