<style lang="scss" scoped>
  .item-block{
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.2px;
  i{
    width: 24px;
    height: 24px;
    background: #F5F5F5;
    font-weight: normal;
    border-radius: 24px;
    text-align: center;
    padding: 10px;
  }
  }

  .disable{
    cursor: not-allowed;
    color: grey;
    pointer-events: none;

  &:hover{
     border:none;
     padding:14px;
   }
  }

  .create{
    background: #FAFAFA;
    /* Neutral-2 / Grey-3 */

    border: 1px dashed #EBEBEB;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;

    letter-spacing: 0.2px;


    color: rgba(0, 0, 0, 0.88);
    padding: 25px;
    text-align: center;
    display: flex;
    justify-content: center;

    i{
      font-size:22px;
      margin-right: 6px;
    }
    
    &:hover, &:focus, &:active {
      border: 1px solid #004EE4;
      cursor:pointer;
    }
  }

  .account_list{
    overflow: scroll;
    height: calc( 100% - 20px);
    padding-bottom: 20px;
  }
</style>

<template>
  <div class="warp-menu bg-grey">
    <div class="account_list">
      <div class="list menu-list">
        <div v-for="(alias, index) in walletList" class="list-item" @click="setCurrentAccount(alias)">
          <div class="item-block">
            <i class="iconfont icon_backup_line"></i>{{ alias }}
          </div>
        </div>
      </div>
      <div class="create" @click="$router.push('welcome')">
        <i class="iconfont icon_wallet_add"></i>{{ $t('wallet.create') }}
      </div>  
    </div>
    

    <!-- child menu -->
    <router-view></router-view>
  </div>
</template>

<script>
import account from "@/models/account";
import * as Actions from '@/store/constants';
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    name: "",
    components: {},
    data() {
        return {
            formItem: {
                accAlias: "",
                keyAlias: "",
                passwd1: "",
                passwd2: ""
            },
            tips: ""
        };
    },
    computed: {
      walletList(){
        const walletsObject = this.bytom.keychain.pairs
        if(walletsObject){
           return Object.values(walletsObject).map(w => w.alias);
        }

        return [];
      },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
      ])
    },
    methods: {
        setCurrentAccount: function (alias) {
          if(this.currentAccount.alias !== alias){
            const bytom = this.bytom.clone();

            bytom.currentAccount = bytom.keychain.pairs[alias];
            this[Actions.UPDATE_STORED_BYTOM](bytom).then(()=>{
              this.$router.push('/')
              this.$toast.success(
                this.$t('wallet.success')+alias
              );
            })
          }else{
            this.$toast.error(
              this.$t('error.BTM0009')+alias
            );
          }
        },
        ...mapActions([
          Actions.UPDATE_STORED_BYTOM
        ])
    },
    mounted() { }
};
</script>
