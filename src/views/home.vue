<style lang="scss" scoped>
.warp {
    z-index: 1;
}

.topbar {
    font-size: 19px;
    display:flex;
    justify-content: space-between;
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
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.topbar .topbar-right {
  font-size: 13px;
}

.content {
    margin-top: 10px;
    text-align: center;
    padding: 20px;
}

.content .token-amount {
    font-size: 24px;
    line-height: 35px;
    padding-right: 17px;
}
.token-amount:first-letter {
  color: rgba(255, 255, 255, 0.56);
  font-size: 20px;
}
.btn-send-transfer {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  max-width: 300px;
  height: 102px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;

  a:hover .icon, a:focus .icon, a:active .icon{
    background: rgba(255, 255, 255, 0.2);
  }
}




.transaction-title h3 {
  font-size: 15px;
  padding: 12px 0 16px 0px;
  font-weight: 600;
}
.transactions {
  font-size: 15px;
  overflow: auto;
  flex-grow: 1;
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


.icon{
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

  .balance-bg{
    height: 128px;

    background: linear-gradient(228.34deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%), #1A1A1A;
    border-radius: 8px;
  }

  .vapor-bg{
    background: linear-gradient(228.34deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.16) 100%), #0A42D0;
  }

  .total-asset{
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
  }


/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 142px;
  height: 36px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F5F5F5;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 28px;
  width: 67px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  -webkit-transition: .4s;
  transition: .4s;
}

/*input:checked + .slider {*/
  /*background-color: #2196F3;*/
/*}*/

/*input:focus + .slider {*/
  /*box-shadow: 0 0 1px #2196F3;*/
/*}*/

input:checked + .slider:before {
  -webkit-transform: translateX(67px);
  -ms-transform: translateX(67px);
  transform: translateX(67px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 34px;
}

.slider-label{
  position: absolute;
  justify-content: space-around;
  width: 141px;
  height: 36px;
  align-items: center;
  top: 0;
  color: rgba(0, 0, 0, 0.24);
}

.slider-label>div.active{
  color: rgba(0, 0, 0, 0.64);
}



  .symbol{
    display: flex;
    align-items: center;
  }

  .warp-menu{
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
      .balance-bg{
        display: flex;
        align-items: center;
        padding: 20px 40px;

        .amount{
          text-align:left;
        }

        .total-asset{
          font-size:14px;
        }
        .token-amount{
          font-size: 36px;
          margin-top: 5px;
        }

        .token-amount:first-letter {
          font-size: 28px;
        }

        .btn-send-transfer{
          align-items: center;
          margin-right: inherit;
          width: 372px;
        }
      }


    }
</style>

<template>
    <div class="warp-menu">
        <section>
            <div class="topbar">
                <div v-if="address!=undefined" >
                  <span class="alias color-black">{{currentAccount.alias}}</span>
                </div>
                <div class="topbar-right">
                  <label class="switch">
                    <input type="checkbox" v-model="isVapor" @change="netTypeToggle">
                    <span class="slider round"></span>
                    <div class="d-flex slider-label">
                      <div :class="{ active: !isVapor }" >{{ $t('main.bytom') }}</div>
                      <div :class="{ active: isVapor }">{{ $t('main.vapor') }}</div>
                    </div>
                  </label>
                </div>
            </div>
            <div :class="['content balance-bg',{ 'vapor-bg': isVapor }]">
                <div class="amount color-white">
                    <div class="total-asset">{{ $t('main.totalAsset') }}</div>
                    <div class="token-amount">
                        {{accountBalance}}
                    </div>
                </div>
              <div class="btn-send-transfer">

                <a  @click="transferOpen">
                  <i class="icon iconfont icon_send"></i>
                  <div>{{ $t('main.send') }}</div>
                </a>
                <a  @click="showQrcode">
                  <i class="icon iconfont icon_recvice"></i>
                  <div>{{ $t('main.receive') }}</div>
                </a>
                <a class="color-white" href="http://crosschain.bymov.io/" target="_blank">
                  <i class="icon iconfont icon_cross"></i>
                  <div>{{ $t('main.crossChain') }}</div>
                </a>
              </div>
            </div>

        </section>
      <section v-if="address!=undefined" class="transaction-title">
      <h3 class="color-black">{{ $t('main.asset') }}</h3>
      </section>
      <section class="transactions">
        <div v-if=" balances && balances.length > 0">
          <ul class="list">
            <li class="list-item" v-for="(balance, index) in balances" :key="index" @click="assetOpen(balance)">
              <div class="symbol" v-if="balance.asset.symbol!== 'Asset'">
                <img :src="img(balance.asset.symbol)" alt="" class="c-icon"  v-on:error="onImgError">
                <div class="uppercase">
                  {{balance.asset.symbol}}
                </div>
              </div>
              <div v-else>
                <div>
                  Asset
                </div>

                <div class="addr color-grey uppercase">{{ shortAddress(balance.asset.assetId) }}</div>
              </div>

              <div class="text-align-right">
                <div class="value">{{ itemBalance(balance) }}</div>
                <div class="addr color-grey">{{ formatCurrency(currentBalanceAmount(balance)) }}</div>
              </div>

            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="list">
            <li class="list-item" v-for="(asset, index) in defaultBalances" :key="index" @click="assetOpen(asset)">

              <div class="symbol">
                <img :src="img(asset.asset.symbol)" alt="" class="c-icon"  v-on:error="onImgError">

                <div class="uppercase">
                  {{asset.asset.symbol}}
                </div>

              </div>

              <div class=" text-align-right">
                <div class="value">{{ itemBalance(asset) }}</div>
                <div class="addr color-grey">{{ formatCurrency(asset[ currency ]) }}</div>
              </div>

            </li>
          </ul>
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
import { camelize } from "@/utils/utils";
import { BTM } from "@/utils/constants";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import _ from 'lodash';
import { Number as Num } from "@/utils/Number"
import BigNumber from "bignumber.js"
import getLang from "@/assets/language/sdk";


const EnterActive = 'animated faster fadeInLeft';
const LeaveActive = 'animated faster fadeOutLeft';
export default {
    name: "",
    data() {
        return {
            isVapor: false,
            maskShow: false,
            enterActive: EnterActive,
            leaveActive: LeaveActive,
            defaultBalances: [
              {
                asset:{
                  assetId: BTM,
                  name: "Bytom",
                  symbol: "BTM",
                  decimals: 8
                } ,
                availableBalance: 0,
                inBtc: "0",
                inCny: "0",
                inUsd: "0"
              }
            ],
            t: null
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
            this.refreshBalance(addr)
        },
    },
    computed: {
        accountBalance: function () {
            let balance
            const balances = this.balances

            if(balances && balances.length >0 ){
                const currency = camelize(this.currency)
                const arr = balances.map(o => o[currency])
                balance = BigNumber.sum.apply(null, arr)
            }
            return  Num.formatCurrency( (balance != null && balance != 0)? balance : '0.00', this.currency)
        },
        address: function(){
          if(this.netType === 'vapor'){
            const vpAddress = this.currentAccount.vpAddress
            if(!vpAddress){
              const bytom = this.bytom.clone();
              return account.copy(this.currentAccount.guid).then(accounts => {
                //update currentAccount
                bytom.currentAccount.vpAddress = accounts.address
                //update AccountList
                bytom.keychain.pairs[bytom.currentAccount.alias].vpAddress = accounts.address

                this[Actions.UPDATE_STORED_BYTOM](bytom).then(() => {
                  this.setupRefreshTimer()
                })

                return accounts.address
              })
            }else return vpAddress

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
      currentBalanceAmount: function (balance) {
        return balance[ camelize(this.currency) ]
      },
      shortAddress: function (add) {
        return address.short(add)
      },
      formatCurrency: function (num) {
        return Num.formatCurrency(num, this.currency)
      },
      itemBalance: function(assetObj){
        const asset = assetObj.asset
        if(asset.assetId === BTM){
          return Num.formatNue(assetObj.balance,8)
        }else{
          return assetObj.balance
        }
      },
        setupRefreshTimer() {
          if(this.t){
             clearInterval(this.t)
          }
          this.t = setInterval(() => {
                this.refreshBalance(this.address)
            }, 10000)
        },
        netTypeToggle: function () {
          const bytom = this.bytom.clone();
          const newNetType = this.isVapor? 'vapor':'bytom'

          bytom.settings.netType = newNetType;

          account.setupNet(`${this.net}${newNetType}`)
          if(this.isVapor && !this.currentAccount.vpAddress){
            account.copy(this.currentAccount.guid).then(accounts => {
              //update currentAccount
              bytom.currentAccount.vpAddress = accounts.address
              //update AccountList
              bytom.keychain.pairs[bytom.currentAccount.alias].vpAddress = accounts.address

              this[Actions.UPDATE_STORED_BYTOM](bytom).then(()=>{
                this.setupRefreshTimer()
              })
            }).catch(error =>{
              let e = error
              if (error.code){
                e = this.$t(`error.${error.code}`)
              }else if(error.message){
                e = getLang(error.message, this.language)
              }
              this.$toast.error(e);
            })
          }else{
            this[Actions.UPDATE_STORED_BYTOM](bytom).then(()=>{
              this.setupRefreshTimer()
            })
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
        refreshBalance: function (address) {
          if(address){
            account.balance(address, this)
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
      this.setupRefreshTimer();
      this.refreshBalance(this.address)
      if (this.netType){
        this.isVapor = this.netType =='vapor'
      }
    },
    beforeDestroy() {
      if(this.t){
        clearInterval(this.t)
      }
    }
  };
</script>
