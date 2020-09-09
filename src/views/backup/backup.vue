<style lang="scss" scoped >
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


</style>

<template>
  <div class="warp-menu bg-grey">
    <div class="list menu-list">
      <div :class="['list-item', {disable: !vault}]" @click="$refs.modalPasswd.open()" >
        <div class="item-block">
          <i class="iconfont icon_backup_line"></i>{{ $t('backup.mnemonic') }}
        </div>
      </div>
      <div class="list-item" @click="backupKeystore">
        <div class="item-block">
          <i class="iconfont icon_backup_line"></i>{{ $t('backup.keystore') }}
        </div>
      </div>
    </div>

    <modal-passwd ref="modalPasswd" @confirm="openMnemonicView"></modal-passwd>
    <!-- child menu -->
    <router-view></router-view>
  </div>
</template>


<script>
import account from "@/models/account";
import FileSaver from "file-saver";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import {RouteNames} from '@/router'

export default {
    name: "",
    data() {
        return {};
    },
    computed: {
      vault(){
        if(this.currentAccount){
          return this.currentAccount.vault;
        }
        return undefined;
      },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount'
      ])
    },
    methods: {
        openMnemonicView(password){
          try{
            const mnemonic = account.decryptMnemonic(this.vault, password, this)
            this[Actions.SET_MNEMONIC](mnemonic).then(()=>{
              this.$router.push({ name: RouteNames.BACKUP_MNEMONIC })
            })
          }
          catch (error){
            let e = error
            if (error.code){
              e = this.$t(`error.${error.code}`)
            }else if(error.message){
              e = error.message
            }
            this.$toast.error(e);
          }

        },
        backupKeystore() {
          const keystore = JSON.stringify(this.currentAccount.keystore)
          var blob = new Blob([keystore], {
              type: "text/plain;charset=utf-8"
          });
          FileSaver.saveAs(blob, `byone_${this.currentAccount.alias}_backup_${+new Date()}.dat`);
        },
      ...mapActions([
        Actions.SET_MNEMONIC
      ])
    }
};
</script>
