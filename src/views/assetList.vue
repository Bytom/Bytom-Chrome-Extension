<style lang="scss" scoped>
.alias {
    font-size: 13px;
}

.transactions {
  font-size: 15px;
  height:calc(100% - 214px);
  overflow: auto;
  overscroll-behavior: contain;
}

.value{
font-size: 15px;
}
.addr{
  font-size: 12px;
  color: rgba(0, 0, 0, 0.36);
}

.no-record{
  display: block;
}

  .symbol{
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 15px;
  }

  .currency-banner{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    .addr{
      font-weight: normal;
    }
  }

  .back{
      width: 56px;
      height: 28px;

      background: #EEEEEE;
      border-radius: 20px;
  }

  .header{
    display: flex;
    margin-bottom: 20px;
    h1{
      margin-left: 12px;
      font-size: 20px;
    }
  }

  .list-item a{
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
  }

  .transaction-title{
    display: flex;
    font-weight: 600;
    font-size: 15px;
    margin: 16px 0;
    color: rgba(0, 0, 0, 0.24);
    div:not(:first-child) {
      margin-left: 25px;
    }

    div{
      cursor: pointer;
    }
  }
</style>

<template>
    <div class="warp-child bg-grey">
        <section class="header">
          <BackButton :small="true" :des="'home'"/>
          <h1 class="color-black">
            <div class="welcome-title">{{ $t('asset.title')}}</div>
          </h1>
        </section>
        <section class="bg-shadow-white currency-banner">
            <div class="color-black symbol" v-if="currentAsset && currentAsset.asset.symbol!=='Asset'">
                <img :src="img(currentAsset.asset.symbol)" alt="" class="c-icon" v-on:error="onImgError">

                <div class="uppercase">
                  {{currentAsset.asset.symbol}}
                </div>
            </div>

            <div class="color-black" v-else-if="currentAsset">
              <div class="symbol">
                Asset
              </div>

              <div class="alias color-grey">{{shortAddress(currentAsset.asset.asset)}}</div>
            </div>

            <div v-if="currentAsset!=undefined" class="amount text-align-right">
                <div class=" color-black">{{ itemBalance(currentAsset) }}</div>
                <div class="addr color-grey">≈{{ formatCurrency(currentAsset[ camelize(currency) ]) }}</div>
            </div>
        </section>
            <section class="transaction-title">
                <div :class="{'color-black': (type==='all') }" @click="changeType('all')" >{{ $t('listAsset.all') }}</div>
                <div :class="{'color-black': (type==='transfer_in') }" @click="changeType('transfer_in')" >{{ $t('common.transfer_in') }}</div>
                <div :class="{'color-black': (type==='transfer_out') }" @click="changeType('transfer_out')" >{{ $t('common.transfer_out') }}</div>
            </section>

            <section class="transactions">
                <ul class="list">
                    <li class="list-item" v-for="(transaction, index) in transactions" :key="index" >
                      <a :href="blockmeta(transaction.hash)" target="_blank">
                        <div>
                          <div class="font-bold">
                            {{transaction.type}}
                          </div>
                            <div class="addr color-grey" >{{transaction.address}}</div>

                        </div>
                        <div class="text-align-right">
                          <div class="value">{{transaction.direct}}{{transaction.val}} {{currentAsset.asset.symbol}}</div>

                          <div class="addr color-red" v-if="!transaction.status">
                            {{ $t('listAsset.fail') }}
                          </div>
                          <div class="addr color-grey" v-else-if="transaction.hasOwnProperty('blockTimestamp')">
                            {{transaction.submissionTimestamp | moment}}
                          </div>
                          <div class="addr color-grey" v-else>
                            {{ $t('main.unconfirmed') }}
                          </div>
                        </div>
                      </a>
                    </li>
                    <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
                      <div slot="no-more"></div>
                      <div slot="no-results">
                        <div class="bg-emptytx"></div>
                        <div>
                        <span class="color-lightgrey center-text no-record">{{$t('main.noRecord')}}</span>
                        </div>
                      </div>
                    </infinite-loading>
                </ul>
            </section>

    </div>
</template>

<script>
import address from "@/utils/address";
import query from "@/models/query";
import transaction from "@/models/transaction";
import { camelize } from "@/utils/utils";
import { BTM } from "@/utils/constants";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import _ from 'lodash';
import { Number as Num } from "@/utils/Number"


const EnterActive = 'animated faster fadeInLeft';
const LeaveActive = 'animated faster fadeOutLeft';
const limit = 10
export default {
    name: "",
    data() {
        return {
            asset:null,
            transactions: [],
            maskShow: false,
            start: 0,
            enterActive: EnterActive,
            leaveActive: LeaveActive,
            type:'all',
            infiniteId: +new Date(),
        };
    },
    watch: {
        '$route'(to, from) {
            if (to.name.startsWith('menu')) {
                this.maskShow = true
            } else if (from.name.startsWith('menu')) {
                this.maskShow = false
            }

            // remove transition for some page
            this.enterActive = EnterActive
            this.leaveActive = LeaveActive
        },
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
          'bytom',
          'currentAsset',
          'listVote'
        ]),
        ...mapGetters([
          'language',
          'currentAccount',
          'currency',
          'netType'
        ])
    },
    methods: {
      img:function (symbol) {
        const _symbol = symbol.toLowerCase();
        if(this.netType === 'vapor'){
          return `https://cdn.blockmeta.com/resources/logo/vapor/${_symbol}.png`
        }else{
          return `https://cdn.blockmeta.com/resources/logo/bytom/${_symbol}.png`
        }
      },
      onImgError: function(event) {
        event.target.src = require(`@/assets/img/asset/${this.netType}.png`)
      },
      blockmeta:function (txid) {
        if(this.netType === 'vapor'){
          return `https://vapor.blockmeta.com/tx/${txid}`
        }else{
          return `https://blockmeta.com/tx/${txid}`
        }
      },
      camelize: function (object) {
        return camelize(object)
      },
      close: function () {
        this.$router.go(-1)
      },
      shortAddress: function (add) {
        return address.short(add)
      },
      formatCurrency: function (num) {
        return Num.formatCurrency(num, this.currency)
      },
      itemBalance: function(asset){
        if(asset.asset.assetId === BTM){
          return Num.formatNue(asset.balance,8)
        }else{
          return asset.balance
        }

      },
      changeType: function (type) {
        this.type = type
        this.start = 0
        this.infiniteId += 1;
        this.transactions = []
      },
      infiniteHandler($state) {
        if (this.transactions.length===0 || (this.transactions.length == (this.start)) ) {
          this.refreshTransactions( this.start, limit, this.type).then(transactions => {
            if (transactions.length) {
              this.start = this.start + limit;
              this.transactions.push(...transactions);
              $state.loaded();
            }else{
              $state.complete();
            }
          });
        }else {
          $state.complete();
        }
      },
        refreshTransactions: function (start, limit, type) {
            return new Promise((resolve, reject) => {
                let type_txs
                switch (type){
                  case 'transfer_out':
                    type_txs = ["transfer_out"];
                    break;
                  case 'transfer_in':
                    type_txs = ["transfer_in"];
                    break;
                  default:
                    type_txs = []
                    break;
                }

                transaction.list(this.address, this.currentAsset.asset.assetId, start, limit, type_txs).then(transactions => {
                  if (transactions == null) {
                        return;
                    }

                    const formattedTx = this.transactionsFormat(transactions);
                    resolve(formattedTx)
                }).catch(error => {
                    console.log(error);
                    reject(error)
                });
            })
        },
        transactionsFormat: function (transactions) {
          const formattedTransactions = []
          const assetID = this.currentAsset.asset.assetId

          transactions.forEach(transaction => {
            const balanceObject = transaction.balances
              .filter(b => b.asset.assetId === assetID);

            const inputAddresses = transaction.inputs
              .filter(input => input.asset.assetId === assetID && input.address !== this.address)
              .map(input => input.address)

            const outputAddresses = transaction.outputs
              .filter(output => output.asset.assetId === assetID && output.address !== this.address)
              .map(output => output.address)

            if(balanceObject.length ===1 ){
                let val = Math.abs(balanceObject[0].amount)

                if (Number(balanceObject[0].amount) > 0) {
                    if(!transaction.type){
                      transaction.type = this.$t("common.transfer_in");
                    }

                    transaction.direct = "+";
                    const resultAddr = inputAddresses.pop()
                    transaction.address = (resultAddr && resultAddr.includes(' '))?resultAddr:address.short(resultAddr);
                } else {
                    if(!transaction.type) {
                      transaction.type = this.$t("common.transfer_out");
                    }

                    transaction.direct = "-";
                    const resultAddr = outputAddresses.pop()
                    transaction.address = (resultAddr && resultAddr.includes(' '))?resultAddr:address.short(resultAddr);
                }

                if(transaction.types.includes('in_crosschain')){
                  const chain = this.netType ==='vapor'? this.$t("listAsset.main"):this.$t("listAsset.side")
                  let symbol = this.currentAsset.asset.symbol
                  if(symbol =='SUP' ){
                    symbol = 'BTM'
                  }else if(symbol =='BTC'|| symbol=='BTM')
                  {}
                  else{
                    symbol='ETH'
                  }
                  transaction.address = `${symbol} ${chain}`
                }else if(transaction.types.includes('vote')){
                  const pubKey = transaction.outputs.find( i => i.type ==='vote').vote
                  const item = this.listVote[pubKey]
                  transaction.address = item? (((this.language ==='zh' || this.language ==='cn')? (item.name ==='-'? null: item.name):item.nameEn)||address.short(item.pubKey)):'-'
                  transaction.type = this.$t("common.vote")
                }else if(transaction.types.includes('veto')){
                  const pubKey = transaction.inputs.find( i => i.type ==='veto').vote
                  const item = this.listVote[pubKey]
                  transaction.address = item? (((this.language ==='zh' || this.language ==='cn')? (item.name ==='-'? null: item.name):item.nameEn)||address.short(item.pubKey)):'-'
                  transaction.type = this.$t("common.veto")
                }
                transaction.val =  val ;

                formattedTransactions.push(transaction);
              }else{
                if(!transaction.type) {
                  transaction.type = this.$t("common.transfer_out");
                }
                transaction.val =  0
                transaction.address = address.short(this.address)

                formattedTransactions.push(transaction);
              }
            });
          return formattedTransactions;
        },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
        Actions.SET_LIST_VOTE
      ])
    },
    mounted() {
        // this.refreshTransactions( this.start, limit, this.type).then(transactions => {
        //   this.transactions = transactions
        // });
        if(Object.keys(this.listVote).length == 0 && this.netType === 'vapor'){
          query.chainStatus().then(resp => {
            if(resp){
              const votes = {}
              resp.consensusNodes.map( (item) => {
                votes[item.pubKey] = item
              });
              this[Actions.SET_LIST_VOTE](votes)
            }
          })
        }
    },
  };
</script>
