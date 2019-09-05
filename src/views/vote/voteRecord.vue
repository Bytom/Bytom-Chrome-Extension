<style lang="" scoped>
  .header {
    display: flex;
  }
  .header p{
    text-align: center;
    width: 280px;
    padding-top: 17px;
  }

.topbar-left .btn-menu i {
    font-size: 100%;
}

.transaction-title h3 {
    font-size: 16px;
    font-weight: inherit;
    padding: 10px 0 10px 20px;
}
.transactions {
  font-size: 15px;
  height: 500px;
}
.list-item-non {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
    cursor: auto;
}

.list-item-non:after {
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


</style>

<template>
    <div class="warp-chlid bg-white">
        <section class="header bg-header">
          <i class="iconfont icon-back" @click="close"></i>
          <p>{{ $t('main.receive') }}</p>
        </section>
            <section class="transactions">
                  <div class="transactions" v-if="transactions.length != 0">
                      <vue-scroll ref="vs" @handle-scroll="handleScroll">
                      <ul class="list">
                          <li class="list-item-non bg-white" v-for="(transaction, index) in transactions" :key="index">
                              <div>
                                  <div>
                                    {{transaction.vName}}
                                  </div>
                                  <div class="addr color-grey">
                                    <div v-if="transaction.hasOwnProperty('block_timestamp')">
                                      {{transaction.submission_timestamp | moment}}
                                    </div>
                                    <div v-else>
                                      {{ $t('main.unconfirmed') }}
                                    </div>
                                  </div>
                              </div>
                              <div class="text-align-right">
                                <div class="value">{{transaction.vAmount}} BTM</div>
                                <div v-if="transaction.type == 'vote'" class="addr color-grey">{{ $t('listVote.vote')}}</div>
                                <div v-else-if="transaction.type == 'veto'" class="addr color-grey">{{ $t('listVote.cancelVote')}}</div>
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

const tx_types = ["veto", "vote"]
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
          'currentAsset',
          'listVote'
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
                transaction.list(this.currentAccount.guid, BTM, start, limit, tx_types).then(transactions => {
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
          const assetID = BTM

          transactions.forEach(transaction => {
            const balanceObject = transaction.balances
              .filter(b => b.asset === assetID);

            const filterInput = _.find(transaction.inputs, function(o) { return o.type =='veto'; })

            const allVotes = this.listVote;

            if(filterInput){
              transaction.type = 'veto'
              const pubkey = (transaction.inputs.filter(i => i.type ==='veto'))[0].vote

              const inAmount = _.sumBy((transaction.inputs.filter(i => i.type ==='veto')), 'amount')
              const outAmount = _.sumBy((transaction.outputs.filter(i => i.type ==='vote')), 'amount')
              transaction.vAmount =  Num.formatNue(inAmount-outAmount,8)
              transaction.vName =  (_.find(allVotes, {pub_key: pubkey})).name
            }else if(_.find(transaction.outputs, function(o) { return o.type =='vote'; })){

              const pubkey = (transaction.outputs.filter(i => i.type ==='vote'))[0].vote

              const outAmount = _.sumBy((transaction.outputs.filter(i => i.type ==='vote')), 'amount')
              transaction.vAmount =  Num.formatNue(outAmount,8)
              transaction.vName =  (_.find(allVotes, {pub_key: pubkey})).name

              transaction.type = 'vote'
            }

            if(balanceObject.length ===1 ){

                let val = Math.abs(balanceObject[0].amount)

                transaction.val =  Num.formatNue(val, 8) ;
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
