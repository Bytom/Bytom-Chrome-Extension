<style lang="" scoped>
  .topbar {
    font-size: 19px;
    display:flex;
  }
  .topbar .topbar-left {
    width:140px;
    overflow:hidden;
    white-space:nowrap;
  }

  .topbar .topbar-middle {
    margin-top: 10px;
    padding: 0 20px;
    text-align: center;
  }

.topbar-left .btn-menu i {
    font-size: 100%;
}
.alias {
    font-size: 13px;
}

.content {
    text-align: center;
    padding: 20px 30px;
}

.content .amount {
    padding-bottom: 10px;
}
.content .token-amount {
    font-size: 32px;
    line-height: 45px;
}

.transaction-title h3 {
    font-size: 16px;
    font-weight: inherit;
    padding: 10px 0 10px 20px;
}
.transactions {
  font-size: 15px;
  height: 340px;
}
.list-item {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.list-item:after {
    content:"";
    background: #e0e0e0;
    position: absolute;
    bottom: 0;
    left: 20px;
    height: 1px;
    width: 90%;
}
.addr{
  font-size: 12px;
}


.no-record{
  display: block;
}

  .symbol{
    margin-bottom: -8px;
    font-size:15px;
  }

</style>

<template>
    <div class="warp-chlid bg-white">
        <section class="bg-image">
          <div class="topbar">
            <div class="topbar-left">
              <i class="iconfont icon-back" @click="close"></i>
            </div>
            <div class="topbar-middle">
              <div v-if="currentAsset!=undefined" class="amount color-white">
                <div v-if="currentAsset.symbol">
                  <div class="symbol">
                    {{currentAsset.symbol}}
                  </div>

                  <div class="alias color-grey">{{currentAsset.name}}</div>
                </div>
                <div v-else>
                  <div class="symbol">
                    Asset
                  </div>

                  <div class="alias color-grey">{{shortAddress(currentAsset.asset)}}</div>
                </div>
              </div>
            </div>
          </div>
            <div class="content">
                <div v-if="currentAsset!=undefined" class="amount color-white">
                    <div class="token-amount">
                        {{itemBalance(currentAsset)}}
                    </div>
                    <div>{{formatCurrency(currentAsset[ currency ])}}</div>
                </div>
            </div>
        </section>
            <section class="transaction-title">
                <h3 class="bg-gray color-grey">{{ $t('main.record') }}</h3>
            </section>
            <section class="transactions">
                  <div class="transactions" v-if="transactions.length != 0">
                      <vue-scroll ref="vs" @handle-scroll="handleScroll">
                      <ul class="list">
                          <li class="list-item" v-for="(transaction, index) in transactions" :key="index" @click="$router.push({name: 'transfer-info', params: {transaction: transaction, address: currentAccount.address}})">
                              <div>
                                  <div>{{transaction.address}}</div>
                                  <div class="addr color-grey" v-if="transaction.hasOwnProperty('block_timestamp')">
                                    {{transaction.submission_timestamp | moment}}
                                  </div>
                                  <div class="addr color-grey" v-else>
                                    {{ $t('main.unconfirmed') }}
                                  </div>
                              </div>
                              <div class="text-align-right">
                                <div class="value">{{transaction.direct}} {{transaction.val}}</div>
                                <div v-if="transaction.type == 'vote'" class="addr color-grey">{{ $t('listVote.vote')}} {{transaction.vAmount}}</div>
                                <div v-else-if="transaction.type == 'veto'" class="addr color-grey">{{ $t('listVote.cancelVote')}}  {{transaction.vAmount}}</div>
                                <div v-else-if="transaction.type == 'crossChain'" class="addr color-grey">{{ $t('crossChain.title')}}</div>
                              </div>
                          </li>
                      </ul>
                  </vue-scroll>
                  </div>
                  <div v-else>
                      <div class="bg-emptytx"></div>
                      <div>
                          <span class="color-lightgrey center-text no-record">{{$t('main.noRecord')}}</span>
                      </div>
                  </div>
            </section>

    </div>
</template>

<script>
import address from "@/utils/address";
import transaction from "@/models/transaction";
import { BTM } from "@/utils/constants";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import _ from 'lodash';
import { Number as Num } from "@/utils/Number"


const EnterActive = 'animated faster fadeInLeft';
const LeaveActive = 'animated faster fadeOutLeft';
export default {
    name: "",
    data() {
        return {
            asset:null,
            transactions: [],
            maskShow: false,
            start: 0,
            limit: 10,
            enterActive: EnterActive,
            leaveActive: LeaveActive,
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
      'currentAccount.balances'() {
        this.$refs['vs'].scrollTo(
          {
            y: 0
          },
          500,
          'easeInQuad'
        );
          this.start = 0
          this.refreshTransactions( this.start, this.limit).then(transactions => {
            this.transactions = transactions
          });
      },
    },
    computed: {
        ...mapState([
          'bytom',
          'currentAsset'
        ]),
        ...mapGetters([
          'currentAccount',
          'currency'
        ])
    },
    methods: {
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
        if(asset.asset === BTM){
          return Num.formatNue(asset.balance,8)
        }else{
          return Num.formatNue(asset.balance,asset.decimals)
        }

      },
        handleScroll(vertical, horizontal, nativeEvent) {
            if (vertical.process == 0) {
                this.start = 0;
                this.refreshTransactions( this.start, this.limit).then(transactions => {
                    this.transactions = transactions
                });
                return;
            }

            if ( (vertical.process == 1) && (this.transactions.length == (this.start+1)*this.limit) ) {
                this.start += this.limit;
                this.refreshTransactions( this.start, this.limit).then(transactions => {
                    transactions.forEach(transaction => {
                        this.transactions.push(transaction);
                    });
                });
            }
        },
        refreshTransactions: function (start, limit) {
            return new Promise((resolve, reject) => {
                transaction.list(this.currentAccount.guid, this.currentAsset.asset, start, limit).then(transactions => {
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
          const assetID = this.currentAsset.asset

          transactions.forEach(transaction => {
            const balanceObject = transaction.balances
              .filter(b => b.asset === assetID);

            const filterInput = _.find(transaction.inputs, function(o) { return o.type =='veto'; })

            if(filterInput){
              transaction.type = 'veto'
              const inAmount = _.sumBy((transaction.inputs.filter(i => i.type ==='veto')), 'amount')
              const outAmount = _.sumBy((transaction.outputs.filter(i => i.type ==='vote')), 'amount')
              transaction.vAmount =  Num.formatNue(inAmount-outAmount,8)
            }else if(_.find(transaction.outputs, function(o) { return o.type =='vote'; })){
              const outAmount = _.sumBy((transaction.outputs.filter(i => i.type ==='vote')), 'amount')
              transaction.vAmount =  Num.formatNue(outAmount,8)
              transaction.type = 'vote'
            }else if(_.find(transaction.outputs, function(o) { return o.type =='crosschain_output'; })){
              transaction.type = 'crossChain'
            }

            if(balanceObject.length ===1 ){
                const inputAddresses = transaction.inputs
                  .filter(input => input.asset === assetID && input.address !== this.currentAccount.address)
                  .map(input => input.address)

                const outputAddresses = transaction.outputs
                  .filter(output => output.asset === assetID && output.address !== this.currentAccount.address)
                  .map(output => output.address)

                let val = Math.abs(balanceObject[0].amount)

                if (Number(balanceObject[0].amount) > 0) {
                    transaction.direct = "+";
                    transaction.address = address.short(inputAddresses.pop());
                } else {
                    transaction.direct = "-";
                    transaction.address = address.short(outputAddresses.pop());
                }

                transaction.val =  Num.formatNue(val, this.currentAsset.decimals) ;
                transaction.fee = transaction.fee / 100000000;

                formattedTransactions.push(transaction);
              }
            });
          return formattedTransactions;
        },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
      ])
    },
    mounted() {
        this.refreshTransactions( this.start, this.limit).then(transactions => {
          this.transactions = transactions
        });
    },
  };
</script>
