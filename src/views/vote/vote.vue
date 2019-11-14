<style lang="" scoped>
.header {
  display: flex;
}
.header p{
  text-align: center;
  width: 270px;
  padding-top: 17px;
}

.transferType input[type=radio] {
  position: absolute;
  visibility: hidden;
}

.transferType input[type="radio"]:checked+label{
  color:white;
  background-color: #333333;
}

.form-container{
  margin: 20px;
}
.form {
    margin-bottom: 20px;
    padding: 10px 15px;
    border-radius:4px;
}
.form-container .btn{
    height: 48px;
    bottom: 20px;
    position: absolute;
    width: 320px;
}
.vote-title{
  font-size: 14px;
  color: #000;
  vertical-align: middle;
  align-items: center;
  display: flex;
}
.vote-title img{
  height: 36px;
  width: 36px;
  border:1px solid #E0E0E0;
  opacity:1;
  border-radius:4px;
  margin-right: 15px;
}
</style>

<template>
    <div class="warp-chlid bg-gray">
        <section class="header bg-header">
            <i class="iconfont icon-back" @click="close"></i>
            <p>{{ $t('listVote.vote') }}</p>
        </section>

        <section class="form-container">
          <div class="form bg-white">
            <div v-if="selectVote !== null" class="form-item">
              <label class="form-item-label">{{ $t('vote.selectNode') }}</label>
              <div class="form-item-content" >
                <div class="vote-title" >
                  <img  :src="selectVote.logo" alt="">
                  <div>
                    {{selectVote.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form bg-white">

              <div class="form-item">
                  <label class="form-item-label">
                    {{ $t('transfer.quantity') }}

                  </label>
                  <div class="form-item-content" style=" display: flex;">
                      <input type="number" v-model="transaction.amount" :placeholder="bytomBalance">
                      <span class="color-grey" style="width: 40px; font-size: 15px;position: absolute;right: 0;">{{unit}}</span>
                  </div>
              </div>
          </div>
          <a class="btn btn-primary" @click="send">{{ $t('transfer.confirm') }}</a>
        </section>
    </div>
</template>

<script>
import transaction from "@/models/transaction";
import getLang from "@/assets/language/sdk";
import Confirm from "../sendTransaction/transferConfirm";
import { BTM } from "@/utils/constants";
import { mapGetters, mapState } from 'vuex'
import { Number as Num } from "@/utils/Number"
import _ from 'lodash';

const currencyInPrice = {
  in_cny: 'cny_price',
  in_usd: 'usd_price',
  in_btc:'btc_price'
}

export default {
    components: {
        Confirm
    },
    data() {
        return {
          selectAsset: {
            asset: BTM,
            symbol: "BTM",
            decimals:8
          },
            show: false,
            accountBalance: 0.00,
            unit: 'BTM',
            fee: this.$t("transfer.feeType"),
            feeTypeOptions: [this.$t("transfer.feeType")],
            transaction: {
                asset: BTM,
                amount: "",
                to:'',
                confirmations: 1
            }
        };
    },
    computed: {
      bytomBalance: function () {
        let balance,
          balances = this.currentAccount.vpBalances
        if(balances && balances.length >0 ){
          const balanceObject = balances.filter(b => b.asset === BTM)[0]
          balance = balanceObject.balance

          let vote = 0, lock = 0
          const votes = this.currentAccount.votes
          if(votes && votes.length >0 ){
            vote = _.sumBy(votes,'total')
            lock = _.sumBy(votes,'locked')
          }

          balance = (balance-vote-lock)/Math.pow(10,balanceObject.decimals)
        }

          return `${this.$t("vote.amountPlaceHolder")}${(balance != null && balance != 0) ? balance : '0.00'}`
      },
      ...mapState([
        'bytom',
        'selectVote'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList',
        'net',
        'currency',
        'netType'
      ])
    },
    watch: {
        account: function (newAccount) {
            this.guid = newAccount.guid;
        }
    },
    methods: {
        close: function () {
            this.$router.go(-1)
            this.transaction.vote = "";
            this.transaction.amount = "";
        },
        formatCurrency: function (num) {
          return Num.formatCurrency(num, this.currency)
        },
        send: function () {
            if (this.transaction.amount <= 0) {
                this.$dialog.show({
                    body: this.$t("transfer.noneBTM")
                });
                return;
            }

            let loader = this.$loading.show({
                // Optional parameters
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });

            const vote = this.selectVote.pub_key
            this.transaction.to = vote
            transaction.buildVote(this.currentAccount.guid, vote,  Num.convertToNue(this.transaction.amount,8), this.transaction.confirmations).then(result => {
                loader.hide();
              if(!this.transaction.fee){
                this.transaction.fee = Number( _.sumBy(result, 'fee') / 100000000);
              }
                this.$router.push({ name: 'vote-confirm', params: { account: this.currentAccount,  transaction: this.transaction,assetAlias: 'BTM', rawData: result} })
            }).catch(error => {
                loader.hide();
                this.$dialog.show({
                    body: getLang(error.message)
                });
            });

        }
    }, mounted() {
        transaction.asset(BTM).then(ret => {
          this.selectAsset = ret
        });
    }
};
</script>
