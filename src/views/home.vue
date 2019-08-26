<style lang="" scoped>
.warp {
    z-index: 1;
}

.topbar {
    font-size: 19px;
    display:flex;
}
.topbar .topbar-left {
    width: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 20px;
    padding-left: 20px;
}
.topbar-left .btn-menu {
    float: left;
    margin-right: 8px;
}
.topbar-left .btn-menu i {
    font-size: 100%;
}
.alias {
    height: 25px;
    font-size: 16px;
    line-height: 28px;
}

.topbar .topbar-middle {
    margin-top: 20px;
    margin-right: 20px;
    border: 2px solid #fff;
    border-radius: 18px;
    padding: 0 20px;
    font: 12px system-ui;
    text-align: center;
    display: flex;
    align-items: center;
}

.content {
    margin-top: 25px;
    text-align: center;
    padding: 0 30px 10px;
}
.content .token-icon {
    display: inline-flex;
    height: 40px;
    width: 40px;
    padding: 8px;
    margin: 8px;
}
.content .amount {
    padding-bottom: 10px;
}
.content .token-amount {
    font-size: 32px;
    line-height: 45px;
}
.token-amount .asset {
    font-size: 18px;
    margin-left: 2px;
}
.qrcode {
    margin-left: 5px;
    vertical-align: middle;
    cursor: pointer;
}

.btn-send-transfer {
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-send-transfer .btn {
    width: 160px;
    height: 48px;
    line-height: 23px;
    font-size: 16px;
    padding: 12px 10px;
}

.btn-received {
    background: #0DBF37;
    border-radius:4px 0px 0px 0px;
}
.btn-received:active,
.btn-received:hover,.btn-received:focus {
    background: #05A02A;
}

.btn-transfer {
    background: #035BD4;
    border-radius:0px 4px 0px 0px;
}
.btn-transfer:active,
.btn-transfer:hover,.btn-transfer:focus {
  background: #044BAF;
}

.transaction-title h3 {
    font-size: 16px;
    font-weight: inherit;
    padding: 10px 0 10px 20px;
}
.transactions {
  font-size: 15px;
  height: 340px;
  overflow: auto;
}
.list-item {
    position: relative;
    display: block;
    padding: 10px 20px;
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

.account-address {
    cursor: pointer;
}
.btn-creation {
    display: block;
    width: 310px;
    height: 48px;
    margin: auto;
    padding: 15px 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
}

.time, .value{
  font-weight: 500;
  font-size: 16px;
}
.addr{
  font-size: 12px;
}
.no-tx-img{
  width: 100px;
  height: 100px;
}
.no-record{
  display: block;
}

  .btn-send-transfer .iconfont{
    margin-right: 4px;
  }

</style>

<template>
    <div class="warp">
        <section class="bg-image">
            <div class="topbar">
                <div class="topbar-left">
                    <a class="btn-menu" @click="openMenu">
                        <i class="iconfont icon-menu"></i>
                    </a>
                </div>
                <div class="topbar-middle bg-secondary">
                    <select :value="netType" @change="netTypeToggle">
                        <option value="bytom">{{ $t('main.bytom') }} {{net}}</option>
                        <option value="vapor">{{ $t('main.vapor') }} {{net}}</option>
                    </select>
                </div>
            </div>
            <div class="content">
                <div v-if="address!=undefined" class="amount color-white">
                    <span class="alias color-grey">{{currentAccount.alias}}</span>
                    <div class="token-amount">
                        {{accountBalance}}
                        <span class="asset">BTM</span>
                    </div>
                </div>
                <div v-else>
                  <p style="width: 250px; margin: 45px auto; text-align: center;">{{ $t('main.noAccount') }}</p>

                </div>
            </div>
            <div v-if="netType =='vapor'" class="btn-send-transfer">


                <a v-if="address!=undefined" class="btn btn-primary btn-received" @click="listVoteOpen">
                  vote
                </a>
                <a v-if="address!=undefined " class="btn btn-primary btn-transfer" @click="crossChainOpen">
                  cross
                </a><a v-if="address!=undefined" class="btn btn-primary btn-received" @click="showQrcode">
                  {{ $t('main.receive') }}
                </a>
                <a v-if="address!=undefined" class="btn btn-primary btn-transfer" @click="transferOpen">
                  {{ $t('main.send') }}
                </a>
            </div>
            <div v-else class="btn-send-transfer">
                <a v-if="address!=undefined" class="btn btn-primary btn-received" @click="showQrcode">
                  <i class="iconfont icon-receive"></i>
                  {{ $t('main.receive') }}
                </a>
                <a v-if="address!=undefined" class="btn btn-primary btn-transfer" @click="transferOpen">
                  <i class="iconfont icon-send"></i>
                  {{ $t('main.send') }}
                </a>
            </div>
        </section>

            <section class="transaction-title">
                <h3 class="bg-gray color-grey">{{ $t('main.record') }}</h3>
            </section>
            <section class="transactions">
                 <div v-if="address!=undefined">
                  <div v-if="transactions.length != 0">
                      <vue-scroll @handle-scroll="handleScroll">
                      <ul class="list">
                          <li class="list-item" v-for="(transaction, index) in transactions" :key="index" @click="$router.push({name: 'transfer-info', params: {transaction: transaction, address: currentAccount.address}})">
                              <div class="float-right text-aglin-right">
                                <div class="value">{{transaction.direct}} {{transaction.val.toFixed(2)}} BTM</div>
                                <div v-if="transaction.type == 'vote'" class="addr color-grey">{{ $t('listVote.vote')}} {{transaction.vAmount}}</div>
                                <div v-else-if="transaction.type == 'veto'" class="addr color-grey">{{ $t('listVote.cancelVote')}}  {{transaction.vAmount}}</div>
                                <div v-else-if="transaction.type == 'crossChain'" class="addr color-grey">{{ $t('crossChain.title')}}</div>
                              </div>
                              <div>
                                  <div v-if="transaction.hasOwnProperty('block_timestamp')">
                                    {{transaction.submission_timestamp | moment}}
                                  </div>
                                  <div v-else>
                                    {{ $t('main.unconfirmed') }}
                                  </div>
                                  <div class="addr color-grey">{{transaction.address}}</div>
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
                  </div>
                  <div v-else>
                      <router-link :to="{name: 'menu-account-creation'}">
                          <div class="bg-emptytx"></div>
                          <div>
                            <span class="color-lightgrey center-text no-record">{{$t('main.noRecord')}}</span>
                          </div>
                          <a class="btn btn-primary btn-creation">{{ $t('main.create') }}</a>
                      </router-link>
                  </div>
            </section>

        <!-- child page -->
        <div class="mask" v-show="maskShow"></div>
        <transition :enter-active-class="enterActive" :leave-active-class="leaveActive">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
import address from "@/utils/address";
import account from "@/models/account";
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
            if (to.name == 'transfer-confirm' || from.name == 'transfer-confirm') {
                this.enterActive = ''
                this.leaveActive = ''
            }
            if (from.name == 'transfer-confirm') {
              this.setupNetwork()
              this.refreshTransactions(this.currentAccount.guid, this.address).then(transactions => {
                this.transactions = transactions
              });
            }
        },
        currentAccount(newVal, oldVal) {
            if (newVal.guid == undefined){
              return;
            }

            let addr
            if(this.netType === 'vapor'){
              addr = newVal.vpAddress
            }else{
              addr = newVal.address
            }

            this.refreshTransactions(newVal.guid, addr).then(transactions => {
                this.transactions = transactions
            });
        },
    },
    computed: {
        shortAddress: function () {
            return address.short(this.address)
        },
        accountBalance: function () {
            let balance
            const balances = this.balances
            if(balances && balances.length >0 ){
                const balanceObject = balances.filter(b => b.asset === BTM)[0]
                balance = balanceObject.balance/Math.pow(10,balanceObject.decimals)
            }
            return (balance != null && balance != 0) ? balance : '0.00'
        },
        address: function(){
          if(this.netType === 'vapor'){
            return this.currentAccount.vpAddress
          }else{
            return this.currentAccount.address
          }
        },
        balances: function(){
          if(this.netType === 'vapor'){
            return this.currentAccount.vpBalances
          }else{
            return this.currentAccount.balances
          }
        },
        ...mapState([
          'bytom'
        ]),
        ...mapGetters([
          'currentAccount',
          'accountList',
          'net',
          'netType'
        ])
    },
    methods: {
        setupRefreshTimer() {
            setInterval(() => {
                this.refreshBalance(this.currentAccount.guid)
            }, 10000)
        },
        setupNetwork() {
            account.setupNet(`${this.net}${this.netType}`);
        },
        netTypeToggle: function (event) {
            const newNetType = event.target.value
            if( newNetType !== this.netType){
              const bytom = this.bytom.clone();

              bytom.settings.netType = newNetType;

              account.setupNet(`${this.net}${newNetType}`)
              if(newNetType === 'vapor'&& !this.currentAccount.vpAddress){
                account.copy(this.currentAccount.guid).then(accounts => {
                  //update currentAccount
                  bytom.currentAccount = accounts

                  //update AccountList
                  const objectIndex = bytom.accountList.findIndex(a => a.guid == this.currentAccount.guid)
                  bytom.accountList[objectIndex].vpAddress = accounts.vpAddress

                  this[Actions.UPDATE_STORED_BYTOM](bytom)
                })
              }else{
                this[Actions.UPDATE_STORED_BYTOM](bytom)
              }
              this.refreshBalance(this.currentAccount.guid)
            }
        },
        showQrcode: function () {
          this.$router.push('received')
        },
        openMenu: function () {
            this.$router.push('menu')
        },
        transferOpen: function () {
            this.$router.push('transfer')
        },
        crossChainOpen: function () {
            this.$router.push('crossChain')
        },
        listVoteOpen: function () {
            this.$router.push('listVote')
        },
        handleScroll(vertical, horizontal, nativeEvent) {
            if (vertical.process == 0) {
                this.start = 0;
                this.refreshTransactions(this.currentAccount.guid, this.address).then(transactions => {
                    this.transactions = transactions
                });
                return;
            }

            if (vertical.process == 1) {
                this.start += this.limit;
                this.refreshTransactions(this.currentAccount.guid, this.address, this.start, this.limit).then(transactions => {
                    transactions.forEach(transaction => {
                        this.transactions.push(transaction);
                    });
                });
            }
        },
        refreshBalance: function (guid) {
          if(guid){
            account.balance(guid)
              .then((obj)=>{
                const balances = obj.balances
                const votes = obj.votes

                const balanceNotEqual = !_.isEqual(this.balances, balances)
                const voteNotEqual = (this.netType === 'vapor' && !_.isEqual(this.currentAccount.votes, votes))

                if(balanceNotEqual || voteNotEqual){
                    //update AccountList

                    const bytom = this.bytom.clone();

                    const objectIndex = bytom.accountList.findIndex(a => a.guid == this.currentAccount.guid)

                    if(balanceNotEqual){
                      if(this.netType === 'vapor'){
                        bytom.currentAccount.vpBalances = balances;
                        bytom.accountList[objectIndex].vpBalances = balances
                      }else{
                        bytom.currentAccount.balances = balances;
                        bytom.accountList[objectIndex].balances = balances
                      }
                    }

                    if(voteNotEqual){
                      bytom.currentAccount.votes = votes;
                      bytom.accountList[objectIndex].votes = votes
                    }

                    this[Actions.UPDATE_STORED_BYTOM](bytom)
                }
              })
              .catch(error => {
                console.log(error);
            });
          }
        },
        refreshTransactions: function (guid, address, start, limit) {
            return new Promise((resolve, reject) => {
                transaction.list(guid, address, start, limit).then(transactions => {
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

            if(filterInput){
              transaction.type = 'veto'
              const inAmount = _.sumBy((transaction.inputs.filter(i => i.type ==='veto')), 'amount')
              const outAmount = _.sumBy((transaction.outputs.filter(i => i.type ==='vote')), 'amount')
              transaction.vAmount =  Num.formatNue(inAmount-outAmount)
            }else if(_.find(transaction.outputs, function(o) { return o.type =='vote'; })){
              const outAmount = _.sumBy((transaction.outputs.filter(i => i.type ==='vote')), 'amount')
              transaction.vAmount =  Num.formatNue(outAmount)
              transaction.type = 'vote'
            }else if(_.find(transaction.outputs, function(o) { return o.type =='crosschain_output'; })){
              transaction.type = 'crossChain'
            }

            if(balanceObject.length ===1 ){
                const inputAddresses = transaction.inputs
                  .filter(input => input.asset === assetID && input.address !== this.address)
                  .map(input => input.address)

                const outputAddresses = transaction.outputs
                  .filter(output => output.asset === assetID && output.address !== this.address)
                  .map(output => output.address)


                const val  = assetID===BTM ? Number(balanceObject[0].amount)/ 100000000 : Number(balanceObject[0].amount);

                if (val > 0) {
                    transaction.direct = "+";
                    transaction.address = address.short(inputAddresses.pop());
                } else {
                    transaction.direct = "-";
                    transaction.address = address.short(outputAddresses.pop());
                }

                transaction.val = Math.abs(val);
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
        this.setupNetwork();
        this.setupRefreshTimer();
        this.refreshTransactions(this.currentAccount.guid, this.address).then(transactions => {
          this.transactions = transactions
        });
    },
  };
</script>
