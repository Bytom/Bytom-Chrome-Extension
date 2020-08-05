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
    text-transform: uppercase;
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

.asset-option{
  font-size: 15px;
  text-transform: uppercase;
}

.asset-option  .asset-id{
  font-size: 13px;
}

.v-select{
  height: 50px;
  width: 100%;
  background: rgba(247,247,247,1);
  font-size: 14px;
  margin: auto;
  border-bottom: 1px solid #E0E0E0;
}

</style>

<template>
    <div class="warp-child bg-gray">
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
                <span v-if="selectAsset.symbol" class="asset">{{selectAsset.symbol}}</span>
            </div>
            <div class="small color-grey">
              {{currentAccount.alias}}
            </div>
          </div>
        </section>

        <section class="form-container">
          <div class="form bg-white">
              <div class="form-item">
                  <label class="form-item-label">{{ $t('transfer.asset') }}</label>
                  <div class="form-item-content" >
                    <v-select :options="assets" v-bind:colorBlack="true" :clearable="false" :value="selectAsset" :onChange="assetChange" label="assetId">
                      <template slot="selected-option" slot-scope="asset">
                        <div class="asset-option">
                          <div>{{asset.symbol || 'Asset'}}</div>
                          <div  class="color-grey asset-id">{{shortAddress(asset.assetId)}}</div>
                        </div>
                      </template>
                      <template slot="option" slot-scope="asset">
                        <div class="asset-option">
                          <div>{{asset.symbol || 'Asset'}}</div>
                          <div class="color-grey  asset-id">{{shortAddress(asset.assetId)}}</div>
                        </div>
                      </template>
                    </v-select>
                  </div>
              </div>
              <div class="form-item">
                <label class="form-item-label">{{ $t('transfer.address') }}</label>
                <input class="form-item-content"  type="text" v-model="transaction.to">
              </div>
              <div class="form-item">
                  <label class="form-item-label" for="tx-amount">
                    {{ $t('transfer.quantity') }}

                    <small class="float-right" style="margin-right: 8px;">{{formatCurrency(transaction.cost||0)}}</small>
                  </label>
                  <div class="form-item-content" style=" display: flex;">
                    <input type="number" id="tx-amount" v-model="transaction.amount" placeholder="0" @keypress="limitAmount">
                      <span class="color-grey" style="font-size: 15px;position: absolute;right: 0;text-transform: uppercase;">{{unit}}</span>
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
  import address from "@/utils/address";
  import account from "@/models/account";
import transaction from "@/models/transaction";
import getLang from "@/assets/language/sdk";
import Confirm from "./transferConfirm";
import { BTM } from "@/utils/constants";
  import { Number as Num } from "@/utils/Number"
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
  import _ from 'lodash'

  const currencyInPrice = {
    in_cny: 'cnyPrice',
    in_usd: 'usdPrice',
    in_btc:'btcPrice',
    inCny: 'cnyPrice',
    inUsd: 'usdPrice',
    inBtc:'btcPrice'
  }

export default {
    components: {
        Confirm
    },
    data() {
        return {
            selectAsset: {
                assetId: BTM,
                symbol: "BTM",
                decimals:8
            },
            show: false,
            address: null,
            guid: null,
            account: {},
            accountBalance: 0.00,
            fee: this.$t("transfer.feeType"),
            feeTypeOptions: [this.$t("transfer.feeType")],
            transaction: {
                to: "",
                asset: BTM,
                amount: "",
                fee: null,
                cost: "",
                confirmations: 1
            }
        };
    },
    computed: {
        assets(){
          if(this.netType === 'vapor'){
            if(!this.currentAccount.vpBalances ||this.currentAccount.vpBalances.length == 0){
              return [this.selectAsset]
            }else{
              return this.currentAccount.vpBalances.map(b=>b.asset)
            }
          }else{
            if(!this.currentAccount.balances ||this.currentAccount.balances.length == 0){
              return [this.selectAsset]
            }else{
              return this.currentAccount.balances.map(b=>b.asset)
            }
          }
        },
        unit() {
            return this.selectAsset.symbol;
        },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList',
        'currency',
        'netType'
      ])
    },
    watch: {
        "transaction.amount": function (newAmount) {
            const singlePrice = this.selectAsset[currencyInPrice[this.currency]]||this.selectAsset[this.currency]||0
            this.transaction.cost = Number( singlePrice * newAmount).toFixed(2);
        },
        account: function (newAccount) {
            this.guid = newAccount.guid;
            this.address = this.netType === 'vapor'?  newAccount.vpAddress: newAccount.address;
        },
        address: function (newAddress) {
            account.balance(newAddress).then(obj => {
              const balances = obj.balances
              let balance = 0.00
              if(balances.length >0 ) {
                const balanceObject = balances.filter(b => b.asset.assetId === this.selectAsset.assetId)[0]
                balance = Num.formatNue(balanceObject.balance, balanceObject.decimals)
              }
                this.accountBalance = balance;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    methods: {
        shortAddress: function (add) {
          return address.short(add)
        },
        formatCurrency: function (num) {
          return Num.formatCurrency(num, this.currency)
        },
        limitAmount ($event) {
          // restrict to 2 decimal places
          if(this.transaction.amount!=null && this.transaction.amount.indexOf(".")>-1 && (this.transaction.amount.split('.')[1].length > (this.selectAsset.decimals-1))){
            $event.preventDefault();
          }
        },
        assetChange: function (val) {
          console.log(val)
          if(val.assetId !== this.selectAsset.assetId){
            this.transaction.asset = val.assetId;
            const balances = this.netType === 'vapor'?this.currentAccount.vpBalances:this.currentAccount.balances
            let balance = 0.00
            if(balances.length >0 ) {
              console.log(balances)
              const balanceObject = balances.filter(b => b.asset.assetId === val.assetId)[0]
              balance = balanceObject.balance
            }
            this.accountBalance = balance;

            transaction.asset(val.assetId).then(ret => {
              console.log(ret)
              this.selectAsset = Object.assign(ret,val)
              this.transaction.cost = Number(ret[currencyInPrice[this.currency]] * this.transaction.amount).toFixed(2);
            });
          }
        },
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
            transaction.build(this.address, this.transaction.to, this.transaction.asset, this.transaction.amount, this.transaction.fee, this.transaction.confirmations).then(result => {
                console.log(result)
                loader.hide();
                if(!this.transaction.fee){
                    this.transaction.fee = Number( _.sumBy(result, 'tx.fee'));
                }
                this.$router.push({ name: 'transfer-confirm', params: { account: this.account, transaction: this.transaction, rawData: result, assetAlias: this.selectAsset.symbol, type: this.$route.query.type } })
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
              this.address = this.$route.query.from
              this.guid = this.currentAccount.guid
              this.account = this.currentAccount
          }

          if (this.$route.query.asset != undefined) {
            const currentAssetId = this.$route.query.asset

            this.transaction.asset= currentAssetId

            const assets = this.assets
            this.selectAsset = assets.filter(b => b.assetId === currentAssetId.toLowerCase())[0]
          }
          if (this.$route.query.to != undefined) {
              this.transaction.to = this.$route.query.to
          }
          if (this.$route.query.amount != undefined) {
              this.transaction.amount = this.$route.query.amount
          }
          if (this.$route.query.gas != undefined) {
              this.transaction.fee = this.$route.query.gas
          }
          if(this.$route.query.confirmations != undefined) {
              this.transaction.confirmations = this.$route.query.confirmations
          }
        }else{
          this.account = this.currentAccount

          const currentAsset = this.netType === 'vapor'? this.currentAccount.vpBalances[0]: this.currentAccount.balances[0]

          if(currentAsset){
            transaction.asset(currentAsset.asset.assetId).then(ret => {
                this.selectAsset = Object.assign(ret,currentAsset)
            });
          }
        }

    }
};
</script>
