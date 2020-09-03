<style lang="scss" scoped>
  .warp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 600px;
  }

  .header {
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 28px;
    color: rgba(0, 0, 0, 0.88);
    margin-top: 60px;
    margin-bottom: 25px;
  }

  .content {
    padding: 20px;
    overflow: scroll;
    height: 160px;
    background: #FAFAFA;
    border: 1px solid #EBEBEB;
    border-radius: 8px;
    margin-bottom: 12px;
    font-size: 14px;
    word-break: break-all;
  }

  .content-black{
    color: rgba(0, 0, 0, 0.64);
  }

  .tab-group {
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    display: flex;
    margin-bottom: 12px;
    a {
      margin-right: 24px;
    }
  }

  .divider {
    margin: 12px 0;
  }

  .uint {
    margin-left: 3px;
  }

  .btn-inline .btn {
    margin: 10px 15px;
  }

  .row {
    display: flex;
    align-items: center;
    .col {
      display: flex;
    }
    .col:first-child {
      width: 15%;
    }

    .col:last-child {
      width: 85%;
    }
    .value {
      display: flex;
      font-size: 13px;
      justify-content: space-between;
    }

    .wallet {
      font-size: 14px;
    }

    .logo {
      width: 20px;
      height: 20px;
      -webkit-border-radius: 16px;
      -moz-border-radius: 16px;
      border-radius: 16px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      text-transform: uppercase;
      color: black;
      padding: 6px;
    }
  }

  .form-item {
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
  }

  .hide {
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .view-link {
    font-size: 14px;
    color: #035BD4;
    width: 275px;
    display: block;
  }

  .iconfont.icon_arrow_2 {
    transform: rotate(90deg);
    color: #D6D6D6;
    font-size: 24px;
    margin-left: 4px;
  }

  .amount-list {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .info {
    margin-bottom: 20px;
  }

  pre{
    margin: 0;
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }


  .btn-round{
    padding: 15px 2px;
  }
</style>

<template>
  <div>
    <div class="warp">
      <section class="header">
        <h1 v-if="prompt.data && prompt.data.type ==='signTransaction'" >{{ $t('transfer.signComfirm') }}</h1>
        <h1 v-else-if="prompt.data && prompt.data.type ==='message'" >{{ $t('transfer.signMessage') }}</h1>
        <h1 v-else>{{ $t('transfer.confirmTransaction') }}</h1>
      </section>

      <section v-if="dataReady">
        <div class="tab-group">
          <a :class="{'color-black font-bold': tab === 'details'}" v-on:click="tab = 'details'">{{ $t('transfer.detail')
            }}</a>
          <a :class="{'color-black font-bold': tab === 'inout'}" v-on:click="tab = 'inout'">{{ $t('transfer.requestDetail')
            }}</a>
        </div>

        <div v-if="tab ==='details'" class="content">
          <!--Info-->
          <div class="info">
            <div class="row">
              <div class="col">
                <img class="logo" src="@/assets/logo.png" alt="">
              </div>
              <div class="col value">
                <div v-if="currentWallet && currentWallet.alias" class="wallet color-black">{{currentWallet.alias}}</div>
                <div>{{shortAddress}}</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <i class="iconfont icon_arrow_2"></i>
              </div>
              <div class="col divider"></div>
            </div>

            <div class="row">
              <div class="col">
                <img v-if="prompt.domain && domainsMeta[prompt.domain] && domainsMeta[prompt.domain].icon" class="logo"
                     :src="domainsMeta[prompt.domain].icon" alt="">
                <div v-else-if="initial" class="logo">
                  {{initial}}
                </div>
              </div>

              <div class="col value">
                <span class="color-black"
                      v-if="prompt.domain && domainsMeta[prompt.domain] && domainsMeta[prompt.domain].title ">{{domainsMeta[prompt.domain].title }}</span>
                <span class="color-black" v-else-if="prompt.domain ">{{prompt.domain }}</span>

                <div v-if="transaction.to">{{short(transaction.to)}}</div>
              </div>
            </div>
          </div>

          <!--transaction types-->
          <div v-if="prompt.data && prompt.data.type ==='signTransaction'" class="amount-list">
            <div >{{ $t('transfer.types') }}</div>
            <div class="color-black font-bold">{{transaction.types}}</div>
          </div>

          <!--sign message-->
          <div v-if="prompt.data && prompt.data.type ==='message'" class="amount-list">
            <div style="min-width: 78px;" >{{ $t('signMessage.message') }}</div>
            <div class="color-black font-bold">{{transaction.message}}</div>
          </div>

          <!--amounts-->
          <div v-if="prompt.data && prompt.data.type ==='transfer'" class="amount-list">
            <div>{{ $t('transfer.amount') }}</div>
            <div class="color-black font-bold">{{transaction.amount}}<span class="uint uppercase">{{unit || short(transaction.asset) }}</span>
            </div>
          </div>
          <div v-else v-for="(amountInput, index) in transaction.amounts" :key="index" class="amount-list">
            <div>{{index ==0 && $t('transfer.amount') }}</div>
            <div class="color-black font-bold">{{amountInput.amount}}<span class="uint uppercase">{{amountInput.alias || short(amountInput.asset) }}</span>
            </div>
          </div>

          <!--fee-->
          <div v-if="transaction.fee" class="amount-list">
            <div>{{ $t('transfer.fee') }}</div>
            <div class="color-black font-bold">{{transaction.fee}}<span class="uint">BTM</span></div>
          </div>

        </div>
        <div v-if="tab ==='inout'" class="content content-black">
          <pre>{{detail}}</pre>
        </div>

        <div class="form">
          <div class="form-item">
            <div class="form-item-content">
              <input type="password" :placeholder="$t('transfer.password')" v-model="password" ref="password" autofocus>
            </div>
          </div>
        </div>
        <div>
          <div class="btn btn-primary btn-round float-right" @click="transfer"><i class="iconfont icon-right-arrow"></i></div>
        </div>

      </section>
      <section v-else>
        loading...

      </section>

    </div>
    <Footer/>
  </div>
</template>

<script>
  import transaction from "@/models/transaction";
  import getLang from "@/assets/language/sdk";
  import {apis} from '@/utils/BrowserApis';
  import NotificationService from '../../services/NotificationService'
  import {mapActions, mapGetters, mapState} from 'vuex'
  import _ from 'lodash';
  import account from "@/models/account";
  import add from "@/utils/address";
  import { camelize, removeFromArray } from "@/utils/utils";
  import bytomjslib from 'bytomjs-lib'
  import BigNumber from "bignumber.js"


  export default {
    add,
    data() {
      return {
        dataReady: false,
        transaction: {
          confirmations: 1,
        },
        unit:null,
        password: '',
        prompt: '',
        tab: 'details'
      };
    },
    computed: {
      initial() {
        if (this.prompt && this.prompt.data && this.prompt.data.title) {
          return this.prompt.data.title.substring(0, 1)
        } else if (this.prompt && this.prompt.domain) {
          return this.prompt.domain.substring(0, 1)
        }
      },
      address: function () {
        if (this.netType === 'vapor') {
          return this.currentAccount.vpAddress
        } else {
          return this.currentAccount.address
        }
      },
      shortAddress: function () {
        if(this.prompt.data && this.prompt.data.type ==='transfer') {
          return add.short(this.transaction.from);
        }else if(this.prompt.data && this.prompt.data.type ==='message'){
          return add.short(this.transaction.address);
        }else{
          if (this.netType === 'vapor') {
            return add.short(this.currentAccount.vpAddress);
          } else {
            return add.short(this.currentAccount.address);
          }
        }
      },
      detail(){
        if(this.prompt.data && this.prompt.data.type ==='signTransaction'){
          const param = this.prompt.data[0] || this.prompt.data
          const _tx = camelize(param)
          const { rawTransaction, signingInstructions } = _tx
          const obj = {
            tx: this.transaction,
            rawTransaction,
            signingInstructions
          }
          return JSON.stringify(obj, null, 2);
        }else if(this.prompt.data && this.prompt.data.type ==='message'){
          const {confirmations, ...Attr} = this.transaction
          return JSON.stringify(Attr, null, 2);
        }else{
          return JSON.stringify(this.transaction, null, 2);
        }
      },
      currentWallet(){
        if(this.prompt.data && this.prompt.data.type ==='transfer'){
          return this.bytom.keychain.findByAddress(this.transaction.from);
        }else if(this.prompt.data && this.prompt.data.type ==='message'){
          return this.bytom.keychain.findByAddress(this.transaction.address);
        }else{
          return this.currentAccount
        }
      },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
        'net',
        'netType',
        'domainsMeta'
      ])
    },
    watch: {},
    methods: {
      short(address){
        return add.short(address)
      },
      transfer: function () {
        if(!this.password){
          this.$toast.error(
            this.$t('error.BTM0008')
          );
          this.$refs.password.focus();
          return;
        }
        let loader = this.$loading.show({
          // Optional parameters
          container: null,
          canCancel: true,
          onCancel: this.onCancel
        });

        if(this.prompt.data.type ==='advTransfer'){
          transaction.buildTransaction(this.address, this.transaction.input, this.transaction.output, this.transaction.fee, this.transaction.confirmations).then(async (result) => {

            let arrayData
            if (this.transaction.args) {
              arrayData = await transaction.convertArgument(this.transaction.args)
            }

            return transaction.advancedTransfer(this.address, result[0], this.password, arrayData, this)
              .then((resp) => {
                loader.hide();
                this.prompt.responder(resp);
                this.$toast.success(
                  this.$t("transfer.success")
                );
                NotificationService.close();
              })
              .catch(error => {
                throw error
              });
          }).catch(error => {
            loader.hide();

            this.$toast.error(
              getLang(error.message) || error.message || error
            );
          });
        } else if(this.prompt.data.type ==='transfer'){
          transaction.transfer(this.transaction, this.password, this.address, this).then(result => {
            loader.hide();
            this.prompt.responder(result);
            this.$toast.success(
              this.$t("transfer.success")
            );
            NotificationService.close();

          }).catch(error => {
            loader.hide();
            this.$toast.error(
              getLang(error.message) || error.message || error
            );
          });
        } else if(this.prompt.data.type ==='signTransaction'){
          const data = this.prompt.data.value

          if(Array.isArray(data)){
            Promise.all(data.map( (rawdata) => transaction.signTransaction(this.address, rawdata, this.password, this)))
              .then( (result) => {
                loader.hide();
                this.prompt.responder(result);
                this.$toast.success(this.$t("transfer.success"));
                NotificationService.close();
              }).catch(error => {
              loader.hide();

              this.$toast.error(
                getLang(error.message) || error.message || error
              );
            });
          }else{
            transaction.signTransaction(this.address,  data,  this.password, this).then( (result) => {
              loader.hide();
              this.prompt.responder(result);
              this.$toast.success(this.$t("transfer.success"));

              NotificationService.close();
            }).catch(error => {
              loader.hide();

              this.$toast.error(
                getLang(error.message) || error.message || error
              );
            });
          }

        } else if(this.prompt.data.type ==='message'){
          transaction.signMessage(this.transaction.message, this.password, this.address, this).then((resp) => {
            loader.hide();
            this.prompt.responder(resp);
            this.$toast.success(
              this.$t("transfer.success")
            );
            NotificationService.close();
          }).catch(error => {
            loader.hide();

            this.$toast.error( getLang(error.message));
          });
        }
        else{
          loader.hide();
          this.$toast.error(
            'Unknown popup type'
          );
        }

      },
      queryAsset: function (assetID) {
        return transaction.asset(assetID)
      }
    }, mounted() {
      this.prompt = window.data || apis.extension.getBackgroundPage().notification || null;
      console.log(this.prompt)

      const params = this.prompt.data
      if (params !== undefined) {
        const data = params.value
        switch(params.type){
          case "advTransfer":{
            const inout = data
            if (inout.input !== undefined) {
              this.transaction.input = inout.input
            }
            if (inout.output !== undefined) {
              this.transaction.output = inout.output
            }
            if (inout.args !== undefined) {
              this.transaction.args = inout.args
            }
            if (inout.gas !== undefined) {
              this.transaction.fee = inout.gas
            }
            if (inout.confirmations !== undefined) {
              this.transaction.confirmations = inout.confirmations
            }

            const array = inout.input.filter(action => action.type === 'spend_wallet')

            if (array.length > 0) {
              account.setupNet(`${this.net}${this.netType}`)
              const promise =
                _(array)
                  .groupBy('asset')
                  .map((objs, key) => {
                    return this.queryAsset(key).then(resp => {
                      return {
                        'asset': key,
                        'alias': resp.symbol,
                        'amount': _.sumBy(objs, 'amount')
                      }
                    })
                  })

              let that = this;
              Promise.all(promise).then(function (output) {
                that.transaction.amounts = output
                this.dataReady = true
              }).catch(()=>{
                this.dataReady = true
              })

            }
            break;
          }
          case "transfer":{
            if (data.from != undefined) {
              this.transaction.from = data.from
            }
            if (data.asset != undefined) {
              this.transaction.asset=  data.asset
            }
            if (data.to != undefined) {
              this.transaction.to = data.to
            }
            if (data.amount != undefined) {
              this.transaction.amount = data.amount
            }

            if(data.confirmations != undefined) {
              this.transaction.confirmations = data.confirmations
            }

            const asset_amounts ={}
            asset_amounts[data.asset] = data.amount

            transaction.estimateFee( data.from, asset_amounts).then( (resp) =>{
              this.transaction.fee = resp.fee
              this.queryAsset(data.asset).then(resp => {
                this.unit =  resp.symbol
                this.dataReady = true
              }).catch((e)=>{
                throw e
              })

            }).catch(()=>{
              this.dataReady = true
            })
            break;
          }
          case "signTransaction":{
            const param = data[0] || data
            const _tx = camelize(param)
            const rawTransaction = _tx.rawTransaction

            const tx = this.netType === 'vapor'?
              bytomjslib.vapor.Transaction.decodeRawTransaction(rawTransaction):
              bytomjslib.bytom.Transaction.decodeRawTransaction(rawTransaction)

            this.transaction.fee = tx.fee/100000000
            this.transaction.input = tx.inputs
            this.transaction.output = tx.outputs

            const inputs = tx.inputs.filter(i => i.address === this.address)
            const outputs = tx.outputs.filter(i => i.address === this.address)
            const inputAsset = inputs.map(i => i.assetID);
            const outputAsset = outputs.map(i => i.assetID);

            const asset = _.union(inputAsset, outputAsset)
            let that = this;

            let types = ["transfer"]
            const promise =
              asset
                .map((assetId) => {
                  return this.queryAsset(assetId).then(resp =>{
                    const assetInput = inputs.filter(i => i.assetID ===assetId)
                    const assetOutput = outputs.filter(o => o.assetID ===assetId)
                    const inputAmount = new BigNumber(_.sumBy(assetInput, 'amount'))
                    const outputAmount = new BigNumber(_.sumBy(assetOutput, 'amount'))

                    const decimals = resp.decimals
                    const amount = inputAmount.minus(outputAmount)

                    const balanced_outputs = tx.outputs.find( o => o.amount === amount.toNumber())
                    if(balanced_outputs.type == 'cross_chain_out'){
                      that.transaction.types = (that.$t('common.cross_chain'));
                    }

                    return {
                      'asset': assetId,
                      'alias': resp.symbol,
                      'amount': amount.shiftedBy(-decimals).toString()
                    }
                  })
                })

            const inputType = inputs.map(i => i.type);
            const outputType = outputs.map(o => o.type);
            types = _.union(inputType, outputType, types);

            const remove = ['spend','control'];
            types = removeFromArray(types, remove);
            types = types.map(ty => this.$t(`common.${ty}`)).join(', ');

            this.transaction.types = types

            Promise.all(promise).then(function(output) {
              that.transaction.amounts = output
              that.dataReady = true
            }).catch(()=>{
              that.dataReady = true
            })

            break
          }
          case "message":{
            if(data.address !== undefined){
              this.transaction.address = data.address;
            }
            if(data.message !== undefined){
              this.transaction.message = data.message
            }

            this.dataReady = true

            break
          }
        }
      }
    }
  };
</script>
