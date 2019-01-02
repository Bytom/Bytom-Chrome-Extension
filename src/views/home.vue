<style lang="" scoped>
.warp {
    z-index: 1;
}

.topbar {
    font-size: 19px;
}
.topbar .topbar-left {
    width: 120px;
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
.topbar-left .alias {
    height: 25px;
    font-size: 19px;
    line-height: 28px;
}

.topbar .topbar-right {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    border: 2px solid #fff;
    border-radius: 18px;
    padding: 0 10px;
    font: 12px system-ui;
    text-align: center;
}

.topbar-right .lamp {
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
    margin-top: 20px;
    text-align: center;
    padding: 0 30px 20px;
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
    font-size: 45px;
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
.btn-transfer {
    width: 200px;
}

.transaction-title h3 {
    font-size: 18px;
    font-weight: inherit;
    color: #cacaca;
    text-align: center;
    padding: 5px 0;
}
.transactions {
    font-size: 15px;
    height: 275px;
}
.transactions .list {
    padding: 0 20px;
}
.list-item {
    display: block;
    padding: 5px 10px;
    border-bottom: 1px solid #5e5e5e;
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
    width: 200px;
    margin: 0 auto;
}
</style>

<template>
    <div class="warp">
        <section class="bg-green">
            <div class="topbar">
                <div class="topbar-right">
                    <i class="lamp"></i>
                    <select v-model="network" @change="networkToggle">
                        <option value="mainnet">{{ $t('main.mainNet') }}</option>
                        <option value="testnet">{{ $t('main.testNet') }}</option>
                    </select>
                </div>
                <div class="topbar-left">
                    <a class="btn-menu" @click="openMenu">
                        <i class="iconfont icon-menu"></i>
                    </a>
                    <span class="alias">{{currentAccount.alias}}</span>
                </div>
            </div>
            <div class="content">
                <img src="@/assets/logo.png" class="token-icon">
                <div v-if="currentAccount.address!=undefined" class="amount">
                    <div class="token-amount">
                        {{accountBalance}}
                        <span class="asset">BTM</span>
                    </div>
                    <p class="account-address">
                        <span class="address-text" :title="addressTitle" :data-clipboard-text="currentAccount.address">{{shortAddress}}</span>
                        <i class="iconfont qrcode" @click="showQrcode">&#xe7dd;</i>
                    </p>
                </div>
                <a v-if="currentAccount.address!=undefined" class="btn btn-primary btn-transfer" @click="transferOpen">{{ $t('main.transfer') }}</a>
            </div>
        </section>

        <div v-if="currentAccount.address!=undefined">
            <section class="transaction-title">
                <h3 class="bg-gray">{{ $t('main.record') }}</h3>
            </section>
            <section class="transactions">
                <vue-scroll @handle-scroll="handleScroll">
                    <ul class="list">
                        <li class="list-item" v-for="(transcation, index) in transactions" :key="index" @click="$router.push({name: 'transfer-info', params: {transcation: transcation, address: currentAccount.address}})">
                            <div class="value">{{transcation.direct}} {{transcation.val.toFixed(2)}} BTM</div>
                            <div>
                                <div v-if="transcation.is_confirmed" class="time">{{transcation.block_timestamp | moment}}</div>
                                <div v-else class="time">{{transcation.submission_timestamp | moment}}</div>
                                <div class="addr">{{transcation.address}}</div>
                            </div>
                        </li>
                    </ul>
                </vue-scroll>
            </section>
        </div>
        <div v-else>
            <p style="width: 250px; margin: 30px auto; text-align: center;">{{ $t('main.noAccount') }}</p>
            <a class="btn btn-primary btn-creation bg-green" @click="$refs.menu.open('creation')">{{ $t('main.create') }}</a>
        </div>

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
            if (to.name == 'home' && to.params.selectedAccount != undefined && from.name == 'menu') {
                this.currentAccount = to.params.selectedAccount
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
            if (newVal.guid == undefined) {
                return;
            }

            this.refreshTransactions(newVal.guid, newVal.address).then(transactions => {
                this.transactions = transactions
            });
        },
    },
    computed: {
        shortAddress: function () {
            return address.short(this.currentAccount.address)
        },
        accountBalance: function () {
            return this.currentAccount.balance
        }
    },
    methods: {
        setupShortAddr(rawAddress) {
            this.currentAccount.address_short = address.short(rawAddress);
        },
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

                if (localStorage.currentAccount != undefined) {
                    this.currentAccount = JSON.parse(localStorage.currentAccount);
                } else {
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

                    this.transactionsFormat(transactions);
                    console.log("formatTx", transactions);
                    resolve(transactions)
                }).catch(error => {
                    console.log(error);
                    reject(error)
                });
            })
        },
        transactionsFormat: function (transactions) {
            transactions.forEach(transaction => {
                let inputSum = 0;
                let outputSum = 0;
                let selfInputSum = 0;
                let selfoutputSum = 0;
                let inputAddresses = [];
                let outputAddresses = [];
                transaction.inputs.forEach(input => {
                    inputSum += input.amount;
                    if (input.address == this.currentAccount.address) {
                        selfInputSum += input.amount;
                        return;
                    }

                    inputAddresses.push(input.address);
                });
                transaction.outputs.forEach(output => {
                    outputSum += output.amount;
                    if (output.address == this.currentAccount.address) {
                        selfoutputSum += output.amount;
                        return;
                    }

                    outputAddresses.push(output.address);
                });

                let val = selfoutputSum - selfInputSum;
                if (val > 0) {
                    transaction.direct = "+";
                    transaction.address = address.short(inputAddresses.pop());
                } else {
                    val = selfInputSum - selfoutputSum;
                    transaction.direct = "-";
                    transaction.address = address.short(outputAddresses.pop());
                }
                transaction.val = Number(val / 100000000);
                transaction.fee = Number(inputSum - outputSum) / 100000000;
            });
        },
    },
    mounted() {
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