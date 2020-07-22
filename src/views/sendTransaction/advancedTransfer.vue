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
  .divider {
    margin: 12px 0;
  }

  .value .uint {
    font-size: 12px;
    margin-left: 3px;
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
  .hide{
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .view-link{
    font-size: 14px;
    color: #035BD4;
    width: 275px;
    display: block;
  }
</style>

<template>
  <div class="warp bg-gray">
    <section class="header bg-header">
      <i class="iconfont icon-back" @click="close"></i>
      <p>{{ $t('transfer.confirmTransaction') }}</p>
    </section>

    <section class="content bg-white">
      <table>
        <tbody>
          <tr class="row">
            <td class="col label">{{ $t('transfer.from') }}</td>
            <td class="col value">{{currentAccount.alias}}</td>
          </tr>
          <div class="divider"></div>
          <tr class="row">
            <td class="col label">Input</td>
            <td class="col value" v-bind:class="{ hide: !full }" >{{transaction.input}}</td>
          </tr>
          <tr class="row">
            <td class="col label">Output</td>
            <td class="col value" v-bind:class="{ hide: !full }" >{{transaction.output}}</td>
          </tr>
          <tr v-if="transaction.args" class="row">
            <td class="col label">Args</td>
            <td class="col value" v-bind:class="{ hide: !full }" >{{transaction.args}}</td>
          </tr>
          <tr class="row">
            <td colspan="2" class="center-text">
              <a v-on:click="full = !full"  class="view-link">
                {{ full? $t('transfer.hideAll'): $t('transfer.viewAll') }} >>
              </a>
            </td>
          </tr>

          <div class="divider"></div>

          <tr v-for="(amountInput, index) in transaction.amounts" :key="index" class="row">
            <td class="col label">{{index ==0 && $t('transfer.transferAmount') }}</td>
            <td class="col value">{{amountInput.amount}}<span class="uint uppercase">{{amountInput.alias || amountInput.asset}}</span></td>
          </tr>

          <tr class="row">
            <td class="col label">{{ $t('transfer.fee') }}</td>
            <td class="col value">{{transaction.fee}}<span class="uint">BTM</span></td>
          </tr>

        </tbody>
      </table>
    </section>
    <section class="content bg-white">
      <div class="form">
        <div class="form-item">
          <label class="form-item-label">{{ $t('transfer.confirmPassword') }}</label>
          <div class="form-item-content">
            <input type="password"  v-model="password" autofocus>
          </div>
        </div>
      </div>
    </section>

    <div class="row" style="margin: 20px;">
      <div class="btn bg-green" @click="transfer">{{ $t('transfer.confirm') }}</div>
    </div>

  </div>
</template>

<script>
import transaction from "@/models/transaction";
import getLang from "@/assets/language/sdk";
import { LocalStream } from 'extension-streams';
import {apis} from '@/utils/BrowserApis';
import NotificationService from '../../services/NotificationService'
import { mapActions, mapGetters, mapState } from 'vuex'
import _ from 'lodash';
import account from "@/models/account";
import { Number as Num } from "@/utils/Number"



export default {
    data() {
        return {
            full: false,
            transaction: {
                input: "",
                output: "",
                args: "",
                fee: "",
                confirmations:1,
                amounts: []
            },
            password:'',
            prompt:''
        };
    },
    computed: {
      address: function(){
        if(this.netType === 'vapor'){
          return this.currentAccount.vpAddress
        }else{
          return this.currentAccount.address
        }
      },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
        'net',
        'netType',
      ])
    },
    watch: {
    },
    methods: {
        close: function () {
            NotificationService.close();
        },
        transfer: function () {
            let loader = this.$loading.show({
                // Optional parameters
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });

            transaction.buildTransaction(this.address,  this.transaction.input, this.transaction.output, this.transaction.fee , this.transaction.confirmations).then(async (result) => {

              let arrayData
              if(this.transaction.args){
                arrayData =  await transaction.convertArgument(this.transaction.args)
              }

              return transaction.advancedTransfer(this.currentAccount.guid, result[0], this.password, arrayData, this.address, this)
                  .then((resp) => {
                      loader.hide();
                      this.prompt.responder(resp);
                      this.$dialog.show({
                          type: 'success',
                          body: this.$t("transfer.success")
                      });
                    NotificationService.close();
                  })
                  .catch(error => {
                       throw error
                  });
            }).catch(error => {
                loader.hide();

                this.$dialog.show({
                    body: getLang(error.message)
                });
            });
        },
      queryAsset: function(assetID){
        return transaction.asset(assetID)
      }
    }, mounted() {
          this.prompt = window.data || apis.extension.getBackgroundPage().notification || null;

          if(this.prompt.data !== undefined){
              const inout = this.prompt.data
              if(inout.input !== undefined){
                 this.transaction.input = inout.input
              }
              if(inout.output !== undefined){
                  this.transaction.output = inout.output
              }
              if(inout.args !== undefined){
                 this.transaction.args = inout.args
              }
              if(inout.gas !== undefined){
                 this.transaction.fee = inout.gas
              }
              if(inout.confirmations !== undefined){
                 this.transaction.confirmations = inout.confirmations
              }

              const array = inout.input.filter(action => action.type ==='spend_wallet')

              if(array.length>0){
                account.setupNet(`${this.net}${this.netType}`)
              const promise =
                _(array)
                  .groupBy('asset')
                  .map((objs, key) => {
                    return this.queryAsset(key).then(resp =>{
                      return {
                        'asset': key,
                        'alias':resp.symbol,
                        'amount': _.sumBy(objs, 'amount')
                      }
                    })
                  })

                let that = this;
                Promise.all(promise).then(function(output) {
                  that.transaction.amounts = output
                })

              }


          }
      }
};
</script>
