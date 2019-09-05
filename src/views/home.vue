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

.content .amount {
    padding-bottom: 10px;
}
.content .token-amount {
    font-size: 32px;
    line-height: 45px;
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
    height: 52px;
    text-transform: uppercase;
}

.network-select{
  text-transform: capitalize;
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

.addr{
  font-size: 12px;
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
                    <select class="network-select" :value="netType" @change="netTypeToggle">
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
      <h3 class="bg-gray color-grey">{{ $t('main.asset') }}</h3>
      </section>
      <section class="transactions">
        <div v-if="address!=undefined">
        <div v-if="balances && balances.length > 0">
          <ul class="list">
            <li class="list-item" v-for="(asset, index) in balances" :key="index" @click="assetOpen(asset)">
              <div class="float-right text-align-right">
                <div class="value">{{ itemBalance(asset) }}</div>
                <div class="addr color-grey">{{ formatCurrency(asset[ currency ]) }}</div>
              </div>
              <div v-if="asset.symbol">
                <div>
                  {{asset.symbol}}
                </div>

                <div class="addr color-grey">{{asset.name}}</div>
              </div>
              <div v-else>
                <div>
                  Asset
                </div>

                <div class="addr color-grey">{{shortAddress(asset.asset)}}</div>
              </div>

            </li>
          </ul>
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
        },
    },
    computed: {
        accountBalance: function () {
            let balance
            const balances = this.balances

            if(balances && balances.length >0 ){
                const currency = this.currency
                balance = _.sumBy(balances, function(o) { return Number(o[currency]); })
            }
            return  Num.formatCurrency( (balance != null && balance != 0)? balance : '0.00', this.currency)
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
          'netType',
          'currency'
        ])
    },
    methods: {
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
        assetOpen: function (asset) {
            this[Actions.SET_CURRENT_ASSET](asset)
            this.$router.push('asset')
        },
        refreshBalance: function (guid) {
          if(guid){
            account.balance(guid)
              .then((obj)=>{
                const balances = obj.balances.reverse()
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
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
        Actions.SET_CURRENT_ASSET,
      ])
    },
    mounted() {
        this.setupNetwork();
        this.setupRefreshTimer();
        this.refreshBalance(this.currentAccount.guid)
    },
  };
</script>
