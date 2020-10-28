<style lang="scss" scoped>
.alias {
    font-size: 13px;
}

.transactions {
  font-size: 15px;
  height:calc(100% - 80px);
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
  .icon_circle_selected{
    color: #06BE85;
    font-size: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>

<template>
    <div class="warp-child bg-grey">
        <section class="header">
          <BackButton :small="true" :des="'home'"/>
          <h1 class="color-black">
            <div class="welcome-title">{{ $t('delayTx.title')}}</div>
          </h1>
        </section>

        <section class="transactions" v-if="transactions.length != 0">
            <ul class="list">
                <li class="list-item" v-for="(transaction, index) in transactions" :key="index" >
                    <a :href="blockmeta(transaction.lockedTxHash)" target="_blank">
                        <div>
                            <div class="font-bold">
                              {{transaction.type}}
                            </div>
                            <div class="addr color-grey" >{{transaction.address}}</div>

                        </div>
                        <div class="text-align-right">
                            <div class="value">{{transaction.direct}}{{transaction.amount}} {{transaction.asset.symbol}}</div>

                            <div v-if="transaction.status === 'delay_transfer_unlocked'" class="addr color-black">
                              <i class="iconfont icon_circle_selected"></i>{{ $t('delayTx.delay_transfer_unlocked') }}
                            </div>
                            <div v-else class="addr">
                              {{ $t(`delayTx.${transaction.status}`, { days: ( transaction.days ) }) }}
                            </div>
                        </div>
                    </a>
                </li>
              <infinite-loading @infinite="infiniteHandler"><div slot="no-more"></div><div slot="no-results"></div></infinite-loading>
            </ul>
        </section>
        <section v-else>
            <div class="bg-emptytx"></div>
            <div>
                <span class="color-lightgrey center-text no-record">{{$t('main.noRecord')}}</span>
            </div>
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
import moment from 'moment'

const EnterActive = 'animated faster fadeInLeft';
const LeaveActive = 'animated faster fadeOutLeft';
const limit = 10

const vaporBlockTime = 0.5
const bytomBlockTime = 150

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
            currentBlockHeight:0,
            currentTimeStamp:0
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
      // 'currentAccount.balances'() {
      //   if(this.$refs['vs']){
      //     this.$refs['vs'].scrollTo(
      //       {
      //         y: 0
      //       },
      //       500,
      //       'easeInQuad'
      //     );
      //   }
      //     this.start = 0
      //     this.refreshTransactions( this.start, limit, this.type).then(transactions => {
      //       this.transactions = transactions
      //     });
      // },
      type(newVale){
          if(this.$refs['vs']){
            this.$refs['vs'].scrollTo(
              {
                y: 0
              },
              500,
              'easeInQuad'
            );
          }
        this.start = 0
        this.refreshTransactions( this.start, limit, newVale).then(transactions => {
          this.transactions = transactions
        });
      }
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
          'netType',
          'net'
        ])
    },
    methods: {
      infiniteHandler($state) {
        if ((this.transactions.length == (this.start+limit)) ) {
          this.start = this.start + limit;
          this.refreshTransactions( this.start, limit).then(transactions => {
            transactions.forEach(transaction => {
              this.transactions.push(transaction);
              $state.loaded();
            });
          });
        }else {
          $state.complete();
        }
      },
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
      },
        handleScroll(vertical, horizontal, nativeEvent) {
            if (vertical.process == 0) {
                this.start = 0;
                this.refreshTransactions( this.start, limit, this.type).then(transactions => {
                    this.transactions = transactions
                });
                return;
            }

            if ( (vertical.process == 1) && (this.transactions.length == (this.start+limit)) ) {
                this.start = this.start + limit;
                this.refreshTransactions( this.start, limit, this.type).then(transactions => {
                    transactions.forEach(transaction => {
                        this.transactions.push(transaction);
                    });
                });
            }
        },
        refreshTransactions: function (start, limit) {
            return new Promise((resolve, reject) => {

                transaction.listDelayTransaction(this.address,  start, limit).then(transactions => {
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
        countDays: function (lockUntil) {
          const blockDiff = lockUntil - this.currentBlockHeight ;
          let timeDiff = 0
          if(this.netType === 'bytom'){
            timeDiff = bytomBlockTime * blockDiff;
          }else{
            timeDiff = vaporBlockTime * blockDiff
          }

          return moment().add(timeDiff, 'seconds').fromNow(true);
        },
        transactionsFormat: function (transactions) {
          const formattedTransactions = []

          transactions.forEach(transaction => {
            if(transaction.fromAddress == this.address){
              transaction.address = address.short(transaction.toAddress)
              transaction.direct = "-";
              transaction.type = this.$t('delayTx.scheduledTransfer')
            }
            else {
              transaction.address = address.short(transaction.fromAddress)
              transaction.direct = "+";
              transaction.type = this.$t('delayTx.scheduledReceive')
            }

            if(transaction.status == 'delay_transfer_locked'){
              transaction.days = this.countDays(transaction.lockUntil)
            }

            formattedTransactions.push(transaction);
          });
          return formattedTransactions;
        },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
        Actions.SET_LIST_VOTE
      ])
    },
    mounted() {
        if(this.language === 'zh' ||this.language === 'cn'){
          moment.locale('zh-cn');
        }
        else{
          moment.locale('en');
        }
        query.blockStatus().then(resp => {
          if(resp){
            this.currentBlockHeight = resp.blockHeight;
          }
          this.refreshTransactions( this.start, limit, this.type).then(transactions => {
            this.transactions = transactions
          });
        })
    },
  };
</script>
