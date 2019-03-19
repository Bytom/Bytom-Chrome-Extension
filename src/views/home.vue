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
    padding: 0 10px;
    font: 12px system-ui;
    text-align: center;
}

.topbar-middle .lamp {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #02f823;
    margin-right: 2px;
    position: relative;
    top: -2px;
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
    line-height: 27px;
    font-size: 16px;
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
    height: 273px;
    overflow: hidden;
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

.list-item .value {
    float: right;
    margin-top: 13px;
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
                    <i class="lamp"></i>
                    <select v-model="network" @change="networkToggle">
                        <option value="mainnet">{{ $t('main.mainNet') }}</option>
                        <option value="testnet">{{ $t('main.testNet') }}</option>
                        <option value="solonet">{{ $t('main.soloNet') }}</option>
                    </select>
                </div>
            </div>
            <div class="content">
                <div v-if="currentAccount.address!=undefined" class="amount color-white">
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
            <div class="btn-send-transfer">
                <a v-if="currentAccount.address!=undefined" class="btn btn-primary btn-received" @click="showQrcode">{{ $t('main.receive') }}</a>
                <a v-if="currentAccount.address!=undefined" class="btn btn-primary btn-transfer" @click="transferOpen">{{ $t('main.send') }}</a>
            </div>
        </section>

            <section class="transaction-title">
                <h3 class="bg-gray color-grey">{{ $t('main.record') }}</h3>
            </section>
            <section class="transactions">
                 <div v-if="currentAccount.address!=undefined">
                  <div v-if="transactions.length != 0">
                      <vue-scroll @handle-scroll="handleScroll">
                      <ul class="list">
                          <li class="list-item" v-for="(transcation, index) in transactions" :key="index" @click="$router.push({name: 'transfer-info', params: {transcation: transcation, address: currentAccount.address}})">
                              <div class="value">{{transcation.direct}} {{transcation.val.toFixed(2)}} BTM</div>
                              <div>
                                  <div v-if="transcation.is_confirmed" class="time">
                                      <div v-if="transcation.block_timestamp === 0">
                                          {{ $t('main.unconfirmed') }}
                                      </div>
                                      <div v-else>
                                          {{transcation.block_timestamp | moment}}
                                      </div>
                                  </div>
                                  <div v-else class="time">
                                      <div v-if="transcation.submission_timestamp === 0">
                                        {{ $t('main.unconfirmed') }}
                                      </div>
                                      <div v-else>
                                        {{transcation.submission_timestamp | moment}}
                                      </div>
                                  </div>
                                  <div class="addr color-grey">{{transcation.address}}</div>
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

        <!-- modal -->
        <Qrcode ref="qrcode"></Qrcode>
    </div>
</template>

<script>
import ClipboardJS from "clipboard";
import Menu from "@/views/homeMenu";
import Qrcode from "@/views/qrcode";
import Transfer from "@/views/transfer";
import TxInfo from "@/views/transferDetail";
import address from "@/utils/address";
import account from "@/models/account";
import transaction from "@/models/transaction";
import { BTM } from "@/utils/constants";

const EnterActive = 'animated faster fadeInLeft';
const LeaveActive = 'animated faster fadeOutLeft';
export default {
    name: "",
    components: {
        Qrcode,
    },
    data() {
        return {
            network: "mainnet",
            clipboard: new ClipboardJS(".address-text"),
            addressTitle: this.$t("main.copy"),
            accounts: [],
            currentAccount: {},
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

            //account toggle by the list from menu
            if (to.name == 'home' && to.params.selectedAccount != undefined) {
                this.currentAccount = to.params.selectedAccount
                this.refreshAccounts();
            }

            // remove transition for some page
            this.enterActive = EnterActive
            this.leaveActive = LeaveActive
            if (to.name == 'transfer-confirm' || from.name == 'transfer-confirm') {
                this.enterActive = ''
                this.leaveActive = ''
            }
        },
        currentAccount(newVal, oldVal) {
            if (newVal.guid == undefined){
              localStorage.currentAccount = {}
              return;
            }
            localStorage.currentAccount = JSON.stringify(newVal);

            this.refreshTransactions(newVal.guid, newVal.address).then(transactions => {
                this.transactions = transactions
            });
        },
        'currentAccount.guid'(guid) {
            if (guid == undefined) return;

            this.refreshBalance(guid);
        }
    },
    computed: {
        shortAddress: function () {
            return address.short(this.currentAccount.address)
        },
        accountBalance: function () {
            return this.currentAccount.balance != 0 ? this.currentAccount.balance : '0.00'
        }
    },
    methods: {
        setupClipboard() {
            this.clipboard.on("success", e => {
                this.$dialog.show({
                    header: this.$t("dialog.header"),
                    body: this.$t("dialog.copy.success")
                });
            });
            this.clipboard.on("error", e => {
                this.$dialog.show({
                    header: this.$t("dialog.header"),
                    body: this.$t("dialog.copy.fail")
                });
            });
        },
        setupRefreshTimer() {
            // todo refresh all accounts

            setInterval(() => {
                this.refreshBalance(this.currentAccount.guid)
            }, 10000)
        },
        setupNetwork() {
            this.network = localStorage.bytomNet;
            account.setupNet(this.network);
        },
        networkToggle: function (val) {
            localStorage.bytomNet = this.network;
            account.setupNet(this.network);
            this.currentAccount = {}
            this.refreshAccounts();
        },
        showQrcode: function () {
            this.$refs.qrcode.open(this.currentAccount.address);
        },
        openMenu: function () {
            this.$router.push({ name: 'menu', params: { accounts: this.accounts, selected: this.currentAccount } })
        },
        transferOpen: function () {
            this.$router.push({ name: 'transfer', params: { account: this.currentAccount } })
        },
        handleScroll(vertical, horizontal, nativeEvent) {
            if (vertical.process == 0) {
                this.start = 0;
                this.refreshTransactions(this.currentAccount.guid, this.currentAccount.address).then(transactions => {
                    this.transactions = transactions
                });
                return;
            }

            if (vertical.process == 1) {
                this.start += this.limit;
                this.refreshTransactions(this.currentAccount.guid, this.currentAccount.address, this.start, this.limit).then(transactions => {
                    transactions.forEach(transaction => {
                        this.transactions.push(transaction);
                    });
                });
            }
        },
        refreshAccounts: function () {
            account.list().then(accounts => {
                this.accounts = accounts;
                if (accounts.length == 0) {
                    return;
                }

                if (this.currentAccount.guid == undefined) {
                    this.currentAccount = accounts[0];
                }
            })
        },
        refreshBalance: function (guid) {
            account.balance(guid).then(balance => {
                this.currentAccount.balance = balance;
                this.currentAccount = Object.assign({}, this.currentAccount);
            }).catch(error => {
                console.log(error);
            });
        },
        refreshTransactions: function (guid, address, start, limit) {
            return new Promise((resolve, reject) => {
                transaction.list(guid, address, start, limit).then(ret => {
                    let transactions = ret.result.data;
                    if (transactions == null) {
                        return;
                    }

                    const formattedTx = this.transactionsFormat(transactions);
                    console.log("formatTx", formattedTx);
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

            if(balanceObject.length ===1 ){

                const inputAddresses = transaction.inputs
                  .filter(input => input.asset === assetID && input.address !== this.currentAccount.address)
                  .map(input => input.address)

                const outputAddresses = transaction.outputs
                  .filter(output => output.asset === assetID && output.address !== this.currentAccount.address)
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
    },
    mounted() {
        this.currentAccount = JSON.parse(localStorage.currentAccount);
        this.setupNetwork();
        this.setupClipboard();
        this.setupRefreshTimer();
        this.refreshAccounts();
    },
    beforeDestroy() {
        this.clipboard.destroy();
    }
};
</script>
