<style scoped>
.accounts {
    width: 100%;
    height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-bottom: 25px;
}
.accounts .list-item{
    background: #3C3C3C;
    padding: 10px;
    border-radius:4px;
    margin-bottom: 16px;
}
.accounts .list-item:hover,
.accounts .list-item:active,
.accounts .list-item:focus
{
  background: #035BD4;
}
.accounts::-webkit-scrollbar {
    display: none;
}
.accounts i {
    font-size: 24px;
}

.menu-panel {
    height: 560px;
    width: 260px;
    padding: 20px;
}
.menu-list .list-item {
    color: white;
}
.menu-list .list-item:hover,
.menu-list .list-item:active,
.menu-list .list-item:focus
{
    background: #3C3C3C;
}
.account {
    width: 200px;
    display: inline-block;
    vertical-align: middle;
}
.account-alias {
    width: 200px;
    font-size: 18px;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.account-asset {
    font-size: 12px;
    color: #9E9E9E;
}
</style>

<template>
    <div class="bg-sideBar menu-panel warp-chlid">
        <div>
            <i class="iconfont btn-close" @click="$router.go(-1)">&#xe614;</i>
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
            <div>
              <div class="menu-title">{{ $t('menu.setting') }}</div>
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
