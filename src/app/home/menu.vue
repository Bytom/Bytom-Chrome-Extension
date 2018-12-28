<style scoped>
.mc-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 994;
    width: 55%;
    height: 100%;
    padding: 40px;
    background-color: #3c454b;
}
.accounts {
    width: 100%;
    height: 200px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-bottom: 25px;
}
.accounts::-webkit-scrollbar {
    display: none;
}
.accounts i {
    font-size: 24px;
}

.menu {
    border-top: 1px solid #c9c9c9;
    padding-top: 15px;
}
.account {
    width: 150px;
    display: inline-block;
    vertical-align: middle;
}
.account-alias {
    width: 150px;
    font-size: 19px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.account-asset {
    font-size: 15px;
}
</style>

<template>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
        <div v-show="maskShow" class="mask"></div>
        <transition name="left-menu" v-on:after-leave="close" enter-active-class="animated slideInLeft faster" leave-active-class="animated slideOutLeft faster">
            <div v-show="show" class="mc-wrap">
                <MenuPage :title="$t('menu.title')" @back="close">
                    <div class="list accounts">
                        <div v-for="(account, index) in accounts" :key="index" @click="accountSelected(account)">
                            <div :class="(currAccount != undefined && account.address == currAccount.address) ? 'list-item active': 'list-item'">
                                <i class="iconfont icon-user"></i>
                                <div class="account">
                                    <div class="account-alias">{{account.alias}}</div>
                                    <div class="account-asset">{{account.balance}} BTM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list menu">
                        <div class="list-item" @click="currView='creation'">
                            <i class="iconfont icon-plusbox"></i>{{ $t('menu.createAccount') }}
                        </div>
                        <div class="list-item" @click="currView='backup'">
                            <i class="iconfont icon-backup"></i>{{ $t('menu.backup') }}
                        </div>
                        <div class="list-item" @click="currView='help'">
                            <i class="iconfont icon-help"></i>{{ $t('menu.help') }}
                        </div>
                        <div class="list-item" @click="currView='settings'">
                            <i class="iconfont icon-settings"></i>{{ $t('menu.setting') }}
                        </div>
                    </div>
                </MenuPage>

                <!-- child-page -->
                <div>
                    <Creation key="creation" v-show="view.creation" @on-back="accountSelected" @on-exit="close"></Creation>
                    <Recovery key="recovery" v-show="view.recovery" @on-back="goBack" @on-exit="close"></Recovery>
                    <Bakcup key="backup" v-show="view.backup" @on-back="goBack" @on-exit="close"></Bakcup>
                    <Help key="help" v-show="view.help" @on-back="goBack" @on-exit="close"></Help>
                    <Settings key="settings" v-show="view.settings" @on-back="goBack" @on-exit="close"></Settings>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Creation from "./menu-creation";
import Recovery from "./menu-recovery";
import Bakcup from "./menu-backup";
import Help from "./menu-help";
import Settings from "./menu-settings";
export default {
    props: {
        accounts: "",
        selectedAccount: ""
    },
    name: "",
    components: {
        Creation,
        Recovery,
        Bakcup,
        Help,
        Settings
    },
    data() {
        return {
            show: false,
            maskShow: false,
            currView: "",
            currAccount: ""
        };
    },
    computed: {
        view() {
            const { currView } = this;
            return {
                creation: currView === "creation",
                recovery: currView === "recovery",
                backup: currView === "backup",
                help: currView === "help",
                settings: currView === "settings"
            };
        }
    },
    watch: {
        selectedAccount(newVal) {
            this.currAccount = newVal
        }
    },
    methods: {
        open: function (child) {
            this.show = true;
            this.maskShow = true;
            this.currView = child;
        },
        close: function () {
            this.show = false;
            this.maskShow = false;
            this.currView = "";
        },
        goBack: function (from) {
            this.currView = "";
        },
        accountSelected: function (accountInfo) {
            // this.accounts.push(accountInfo);
            // this.currAccount = accountInfo;
            this.$emit("on-account-change", accountInfo);
            this.close();
        },
    }
};
</script>