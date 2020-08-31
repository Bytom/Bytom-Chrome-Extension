<style lang="scss" scoped>
  .header{
    display: flex;
    margin-bottom: 20px;
    h1{
      margin-left: 12px;
      font-size: 20px;
    }
  }

  .selction-section{
    height: calc( 100% - 149px );
  }

  .hint{
    font-size: 14px;
    letter-spacing: 0.2px;

    /* Secondary / Red */
    color: #FE1919;
    margin: 40px 0 20px;
  }

  .btn-gp{
    display: flex;
    justify-content: space-between;
    .btn{
      width:47%;
    }
  }

</style>

<template>
    <div class="warp-menu bg-grey">
        <section class="header">
          <BackButton :small="true" />
          <h1 class="color-black">
            <div class="welcome-title">{{ $t("setting.deleteWallet") }}</div>
          </h1>
        </section>
        <section class="selction-section">
          <div>
            <p class="hint">{{ $t("setting.deleteHint") }}</p>
            <div class="btn-gp">
              <button class="btn btn-primary"  @click="$router.push({ name: 'backup'})">{{ $t("setting.deleteBack") }}</button>
              <button class="btn btn-outlined color-black" @click="$refs.confirmModal.open()">{{ $t("setting.deleteConfirm") }}</button>
            </div>
          </div>
        </section>

        <modal-passwd ref="confirmModal" @confirm="deleteW" :label="walletName" ></modal-passwd>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import account from "@/models/account";

export default {
    name: "",
    data() {
        return {
        };
    },
    computed: {
      walletName(){
        if(this.currentAccount){
          return this.currentAccount.alias
        }
      },
      ...mapState([
        'bytom',
      ]),
      ...mapGetters([
        'currentAccount',
      ])
    },
    methods: {
      deleteW(password){
        if(account.isValidPassword(this.currentAccount.keystore, password)){
          const bytom = this.bytom.clone();
          bytom.keychain.removeByAlias(this.currentAccount.alias);
          const values = Object.values(bytom.keychain.pairs)

          if(values.length === 0){
            bytom.currentAccount= null
            bytom.settings.netType= 'bytom'
          }else{
            bytom.currentAccount = values[0]
          }

          this[Actions.UPDATE_STORED_BYTOM](bytom).then(() => {
            this.$router.push('/');
          })
        }else{
          this.$toast.error(
             this.$t('error.BTM0007')
          );
        }
      },
      ...mapActions([
        Actions.UPDATE_STORED_BYTOM,
      ])
    },
    mounted() {
    },
  };
</script>
