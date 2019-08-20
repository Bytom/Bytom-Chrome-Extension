<style lang="" scoped>
.header {
  display: flex;
}
.header p{
  text-align: center;
  width: 270px;
  padding-top: 17px;
}
.balance {
  width: 280px;
  height: 40px;
    margin: 20px;
    padding: 20px;
  display: flex;
}
.balance .token-icon {
    height: 38px;
    width: 38px;
    margin-right: 5px;
}
.balance .token-amount {
    display: inline-block;
}
.balance .token-amount .asset {
    font-size: 18px;
    margin-left: 2px;
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
  .small{
    font-size: 12px;
  }
.transfer-header{
  background-image: url("../../assets/img/backgroundHead/transfer.svg");
  background-size: 320px 80px;
}
.wallet{
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  color: white;
  margin-right: 20px;
  line-height: 40px;
  text-align: center;
}
</style>

<template>
    <div class="warp-chlid bg-gray">
        <section class="header bg-header">
            <i class="iconfont icon-back" @click="close"></i>
            <p>{{ $t('main.send') }}</p>
        </section>

        <section class="balance transfer-header">
          <div class="wallet">
            <i class="iconfont icon-wallet"></i>
          </div>
          <div>
            <div class="token-amount">
                {{accountBalance}}
                <span class="asset">BTM</span>
            </div>
            <div class="small color-grey">
              {{account.alias}}
            </div>
          </div>
        </section>

        <section class="form-container">
          <div class="form bg-white">
              <div class="form-item">
                  <label class="form-item-label">{{ $t('transfer.address') }}</label>
                  <div class="form-item-content" >
                      <input type="text" v-model="transaction.to">
                  </div>
              </div>
              <div class="form-item">
                  <label class="form-item-label">
                    {{ $t('transfer.quantity') }}

                    <small class="float-right" style="margin-right: 8px;">{{ transaction.cost||0 }} CNY</small>
                  </label>
                  <div class="form-item-content" style=" display: flex;">
                      <input type="number" v-model="transaction.amount" placeholder="0">
                      <span class="color-grey" style="width: 40px; font-size: 15px;position: absolute;right: 0;">{{unit}}</span>
                  </div>
              </div>
              <div class="form-item">
                  <label class="form-item-label">{{ $t('transfer.fee') }}</label>
                  <div class="form-item-content" >
                      <!--<v-select :clearable="false" v-model="fee" style="height: 32px;" :options="feeTypeOptions"></v-select>-->
                    <input type="text"  v-model="fee" disabled >
                  </div>
              </div>
          </div>
          <a class="btn btn-primary" @click="send">{{ $t('transfer.send') }}</a>
        </section>
    </div>
</template>

<script>
import account from "@/models/account";
import transaction from "@/models/transaction";
import getLang from "@/assets/language/sdk";
import Confirm from "./transferConfirm";
import { BTM } from "@/utils/constants";
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';

export default {
    components: {
        Confirm
    },
    data() {
        const ASSET_BTM =
            "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
        return {
            selectAsset: {
                assets: ASSET_BTM,
                name: "BTM"
            },
            assetOptions: [
                {
                    assets: ASSET_BTM,
                    name: "BTM"
                }
            ],
            show: false,
            assets: {
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff: "BTM"
            },
            guid: null,
            account: {},
            accountBalance: 0.00,
            fee: this.$t("transfer.feeType"),
            feeTypeOptions: [this.$t("transfer.feeType")],
            transaction: {
                to: "",
                asset: ASSET_BTM,
                amount: "",
                fee: null,
                cost: "",
                confirmations: 1
            }
        };
    },
    computed: {
        unit() {
            return this.assets[this.transaction.asset];
        },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList'
      ])
    },
    watch: {
        selectAsset: function (val) {
            this.transaction.asset = val.assets;
        },
        "transaction.amount": function (newAmount) {
            transaction.asset(this.transaction.asset).then(ret => {
                this.transaction.cost = Number(ret.cny_price * newAmount).toFixed(2);
            });
        },
        account: function (newAccount) {
            this.guid = newAccount.guid;
        },
        guid: function (newGuid) {
            this.accountList.forEach(account => {
                if (account.guid == newGuid.guid) {
                    this.account = account;
                    return;
                }
            });

            account.balance(newGuid).then(obj => {
              const balances = obj.balances
              let balance = 0.00
              if(balances.length >0 ) {
                const balanceObject = balances.filter(b => b.asset === BTM)[0]
                balance = balanceObject.balance / Math.pow(10, balanceObject.decimals)
              }
                this.accountBalance = balance;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    methods: {
        close: function () {
            this.$router.go(-1)
            this.transaction.to = "";
            this.transaction.amount = "";
            if(this.$route.query.type == 'popup'){
               window.close();
            }
        },
        send: function () {
            if (this.transaction.to == "") {
                this.$dialog.show({
                    body: this.$t("transfer.emptyTo")
                });
                return;
            }

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
            transaction.build(this.account.guid, this.transaction.to, this.transaction.asset, this.transaction.amount*100000000, this.transaction.fee, this.transaction.confirmations).then(result => {
                loader.hide();
                if(!this.transaction.fee){
                    this.transaction.fee = Number(result.fee / 100000000);
                }
                this.$router.push({ name: 'transfer-confirm', params: { account: this.account, transaction: this.transaction, rawData: result, type: this.$route.query.type } })
            }).catch(error => {
                loader.hide();
                this.$dialog.show({
                    body: getLang(error.message)
                });
            });
        }
    }, mounted() {
        //detect injection
        if(this.$route.query.type === 'popup'){
          if (this.$route.query.from != undefined) {
              this.guid = this.$route.query.from
              this.account = this.accountList.filter(e => e.guid === this.guid)[0]
          }

          if (this.$route.query.asset != undefined) {
              this.transaction.asset= this.$route.query.asset
          }
          if (this.$route.query.to != undefined) {
              this.transaction.to = this.$route.query.to
          }
          if (this.$route.query.amount != undefined) {
              this.transaction.amount = this.$route.query.amount /100000000
          }
          if (this.$route.query.gas != undefined) {
              this.transaction.fee = this.$route.query.gas /100000000
          }
          if(this.$route.query.confirmations != undefined) {
              this.transaction.confirmations = this.$route.query.confirmations
          }
        }else{
          this.account = this.currentAccount
        }
    }
};
</script>
