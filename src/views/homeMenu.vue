<style scoped>
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

.menu-panel {
    height: 520px;
    width: 230px;
    padding: 40px 30px;
}
.menu-list {
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
    <div class="bg-gray menu-panel warp-chlid">
        <div>
            <i class="iconfont btn-close" @click="$router.go(-1)">&#xe605;</i>
            <div class="menu-title">{{$t('menu.title')}}</div>
        </div>
        <div class="menu-content">
            <div class="list accounts">
                <div v-for="(account, index) in accounts" :key="index" @click="accountSelected(account)">
                    <div :class="(selectedAccount != undefined && account.address == selectedAccount.address) ? 'list-item active': 'list-item'">
                        <i class="iconfont icon-user"></i>
                        <div class="account">
                            <div class="account-alias">{{account.alias}}</div>
                            <div class="account-asset">{{account.balance}} BTM</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list menu-list">
                <router-link :to="{name: 'menu-account-creation'}">
                    <div class="list-item">
                        <i class="iconfont icon-plusbox"></i>{{ $t('menu.createAccount') }}
                    </div>
                </router-link>
                <router-link :to="{name: 'menu-backup'}">
                    <div class="list-item">
                        <i class="iconfont icon-backup"></i>{{ $t('menu.backup') }}
                    </div>
                </router-link>
                <router-link :to="{name: 'menu-help'}">
                    <div class="list-item">
                        <i class="iconfont icon-help"></i>{{ $t('menu.help') }}
                    </div>
                </router-link>
                <router-link :to="{name: 'menu-settings'}">
                    <div class="list-item">
                        <i class="iconfont icon-settings"></i>{{ $t('menu.setting') }}
                    </div>
                </router-link>
            </div>
        </div>

        <!-- child menu -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            accounts: [],
            selectedAccount: {},
        };
    },
    methods: {
        accountSelected: function (accountInfo) {
            this.selectedAccount = Object.assign({}, accountInfo);
            this.$router.push({ name: 'home', params: { selectedAccount: this.selectedAccount } })
        },
    }, mounted() {
        let params = this.$route.params;

        this.accounts = params.accounts
        this.selectedAccount = params.selected
    }
};
</script>