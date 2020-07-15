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
          <tr class="row">
            <td class="col label">{{ $t('transfer.types') }}</td>
            <td class="col value">{{transaction.types}}</td>
          </tr>

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
import {apis} from '@/utils/BrowserApis';
import NotificationService from '../../services/NotificationService'
import { mapActions, mapGetters, mapState } from 'vuex'
import _ from 'lodash';
import account from "@/models/account";
import { camelize, removeFromArray } from "@/utils/utils";
import { decimalsMap } from "@/utils/constants"
import BigNumber from "bignumber.js"
import bytomjslib from 'bytomjs-lib'


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
                amounts: [],
                types:[]
            },
            password:'',
            prompt:''
        };
    },
    computed: {
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

            if(Array.isArray(this.prompt.data)){
                Promise.all(this.prompt.data.map( (rawdata) => transaction.signTransaction(this.currentAccount.guid, rawdata, this.password)))
                    .then( (result) => {
                        loader.hide();
                        this.prompt.responder(result);
                        this.$dialog.show({
                            type: 'success',
                            body: this.$t("transfer.success")
                        });
                      NotificationService.close();
                    }).catch(error => {
                        loader.hide();

                        this.$dialog.show({
                            body: getLang(error.message)
                        });
                    });
            }else{
                transaction.signTransaction(this.currentAccount.guid,  this.prompt.data,  this.password).then( (result) => {
                    loader.hide();
                    this.prompt.responder(result);
                    this.$dialog.show({
                        type: 'success',
                        body: this.$t("transfer.success")
                    });
                    NotificationService.close();
                }).catch(error => {
                    loader.hide();

                    this.$dialog.show({
                        body: getLang(error.message)
                    });
                });
            }

        },
      queryAsset: function(assetID){
        return transaction.asset(assetID)
      }
    }, mounted() {
          this.prompt = window.data || apis.extension.getBackgroundPage().notification || null;
          if(this.prompt.data !== undefined){
              const param = Array.isArray(this.prompt.data)? this.prompt.data[0] : this.prompt.data
              const _tx = camelize(param)
              const rawTransaction = _tx.rawTransaction
              const currentAddress = this.netType === 'vapor'?
                  this.currentAccount.vpAddress:
                  this.currentAccount.address

              account.setupNet(`${this.net}${this.netType}`)

              const tx = this.netType === 'vapor'?
              bytomjslib.vapor.Transaction.decodeRawTransaction(rawTransaction):
              bytomjslib.bytom.Transaction.decodeRawTransaction(rawTransaction)
              this.transaction.fee = tx.fee/100000000
              this.transaction.input = tx.inputs
              this.transaction.output = tx.outputs

              const inputs = tx.inputs.filter(i => i.address === currentAddress)
              const outputs = tx.outputs.filter(i => i.address === currentAddress)
              const inputAsset = inputs.map(i => i.assetID);
              const outputAsset = outputs.map(i => i.assetID);

              const asset = _.union(inputAsset, outputAsset)

              let types = ["transfer"]
              const promise =
                asset
                  .map((assetId) => {
                    return this.queryAsset(assetId).then(resp =>{
                      const assetInput = inputs.filter(i => i.assetID ===assetId)
                      const assetOutput = outputs.filter(o => o.assetID ===assetId)
                      const inputAmount = new BigNumber(_.sumBy(assetInput, 'amount'))
                      const outputAmount = new BigNumber(_.sumBy(assetOutput, 'amount'))

                      const decimals = decimalsMap[this.net][assetId]
                      const amount = inputAmount.minus(outputAmount).shiftedBy(-decimals)

                      return {
                        'asset': assetId,
                        'alias': resp.symbol,
                        'amount': amount.toString()
                      }
                    })
                  })

              let that = this;
              Promise.all(promise).then(function(output) {
                that.transaction.amounts = output
              })

              const inputType = inputs.map(i => i.type);
              const outputType = outputs.map(o => o.type);
              types = _.union(inputType, outputType, types);

              const remove = ['spend','control'];
              types = removeFromArray(types, remove);
              types = types.map(ty => this.$t(`common.${ty}`)).join(', ');

              this.transaction.types = types

          }
      }
};
</script>
