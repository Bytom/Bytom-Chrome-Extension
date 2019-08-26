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
            <p>{{ $t('listVote.cancelVote') }}</p>
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

                    <small class="float-right" style="margin-right: 8px;">{{ transaction.cost||0 }} CNY</small>
                  </label>
                  <div class="form-item-content" style=" display: flex;">
                      <input type="number" v-model="transaction.amount" :placeholder="bytomBalance">
                      <span class="color-grey" style="width: 40px; font-size: 15px;position: absolute;right: 0;">{{unit}}</span>
                  </div>
              </div>
          </div>
          <a class="btn btn-primary" @click="send">{{ $t('transfer.send') }}</a>
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


export default {
    components: {
        Confirm
    },
    data() {
        return {
            show: false,
            accountBalance: 0.00,
            unit: 'BTM',
            fee: this.$t("transfer.feeType"),
            feeTypeOptions: [this.$t("transfer.feeType")],
            transaction: {
                amount: "",
                to:'',
                confirmations: 1
            }
        };
    },
    computed: {
      bytomBalance: function () {
        const vote = this.selectVote
        let vetoAmount
        if(vote && vote.total > vote.locked ){
          vetoAmount = Num.formatNue(vote.total-vote.locked)
        }

          return `Vapor${this.$t("crossChain.amountPlaceHolder")}${(vetoAmount != null && vetoAmount != 0) ? vetoAmount : '0.00'}`
      },
      ...mapState([
        'bytom',
        'selectVote'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList',
        'net',
        'netType'
      ])
    },
    watch: {
        "transaction.amount": function (newAmount) {
            transaction.asset(BTM).then(ret => {
                this.transaction.cost = Number(ret.cny_price * newAmount).toFixed(2);
            });
        },
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
            transaction.buildVeto(this.currentAccount.guid, vote,  this.transaction.amount*100000000, this.transaction.confirmations).then(result => {
                loader.hide();
                console.log(result)
                this.transaction.fee = Number(result.fee / 100000000);
                this.$router.push({ name: 'transfer-confirm', params: { account: this.currentAccount, transaction: this.transaction, rawData: result} })
            }).catch(error => {
                loader.hide();
                this.$dialog.show({
                    body: getLang(error.message)
                });
            });

        }
    }, mounted() {
    }
};
</script>
