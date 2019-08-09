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
    margin-left: 2px;
}

.menu-panel {
    height: 560px;
    width: 260px;
    padding: 20px;
}
.menu-list{
  margin: 0px -20px;
}
.menu-list .list-item {
    color: white;
  padding: 10px 20px;
}
.menu-list .list-item:hover,
.menu-list .list-item:active,
.menu-list .list-item:focus
{
    background: #3C3C3C;
}
.account {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .wallet{
    width: 25px;
    height: 25px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    color: white;
    padding: 8px;
    margin-right: 15px;
  }
  .list-item{
    display: flex;
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
                <div v-for="(account, index) in accountList" :key="index" @click="accountSelected(account)">
                    <div :class="(currentAccount != undefined && account.address == currentAccount.address) ? 'list-item active': 'list-item'">
                      <div class="wallet">
                        <i class="iconfont icon-wallet"></i>
                      </div>
                        <div class="account">
                            <div class="account-alias">{{account.alias}}</div>
                            <!--<div class="account-asset">{{calculateBalance(account.balances)}} BTM</div>-->
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
                        <i class="iconfont icon-create"></i>{{ $t('menu.createAccount') }}
                    </div>
                </router-link>
                <router-link :to="{name: 'menu-backup'}">
                    <div class="list-item">
                        <i class="iconfont icon-backup"></i>{{ $t('menu.backup') }}
                    </div>
                </router-link>
                <router-link :to="{name: 'menu-help'}">
                    <div class="list-item">
                        <i class="iconfont icon-support"></i>{{ $t('menu.help') }}
                    </div>
                </router-link>
                <router-link :to="{name: 'menu-settings'}">
                    <div class="list-item">
                        <i class="iconfont icon-setting"></i>{{ $t('menu.setting') }}
                    </div>
                </router-link>
            </div>
        </div>

        <!-- child menu -->
        <router-view></router-view>
    </div>
</template>

<script>
  import { BTM } from "@/utils/constants";
  import { mapActions, mapGetters, mapState } from 'vuex'
  import * as Actions from '@/store/constants';

  export default {
    name: "",
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList'
      ])
    },
    watch: {

    },
    methods: {
        accountSelected: function (accountInfo) {
          const bytom = this.bytom.clone();

          if (bytom.currentAccount != accountInfo) {
            bytom.currentAccount = accountInfo;
            this[Actions.UPDATE_STORED_BYTOM](bytom).then(()=>{
              this.$router.push('/')
            })
          }
        },
        calculateBalance: function (balances) {
          if(balances && balances.length>0 ){
            const balanceObject = balances.filter(b => b.asset === BTM)[0]
            const balance = balanceObject.balance/Math.pow(10,balanceObject.decimals)
            return balance
          }
          return 0.00;
        },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
      ])
    },
    mounted() {
    }
};
</script>
