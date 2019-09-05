<style lang="" scoped>
.header {
  display: flex;
}
.header p{
  text-align: center;
  width: 270px;
  padding-top: 17px;
}
.transferType {
  /*width: 280px;*/
  /*height: 40px;*/
    margin: 20px;
  display: flex;
}

.transferType input[type=radio] {
  position: absolute;
  visibility: hidden;
}

.transferType input[type="radio"]:checked+label{
  color:white;
  background-color: #333333;
}

.choice {
  border: 1px solid;
  border-radius: 6px;
  cursor: pointer;
  padding: 20px;
  font-size: 14px;
  white-space:pre-wrap;
  display: block;
  background-color: white;
  width:108px;
  margin-right:20px;
}

.choice:hover {
     background-color: #f7f7f7;
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
    <div class="warp-chlid bg-gray">
        <section class="header bg-header">
            <i class="iconfont icon-back" @click="close"></i>
            <p>{{ $t('crossChain.title') }}</p>
        </section>

        <section class="transferType">
          <div>
            <input type="radio" id="typeChoice1"
                   value="toVapor" v-model="transaction.type">
            <label class="choice" for="typeChoice1">{{$t('crossChain.toVapor')}}</label>

          </div>
          <div>
            <input type="radio" id="typeChoice2"
                   value="toBytom" v-model="transaction.type">
            <label class="choice" for="typeChoice2">{{$t('crossChain.toBytom')}}</label>

          </div>
        </section>

        <section class="form-container">
          <div class="form bg-white">
              <div class="form-item">
                <label class="form-item-label">{{ $t('crossChain.asset') }}</label>
                <div class="form-item-content" >
                  <v-select :options="assets" v-bind:colorBlack="true" :clearable="false" :value="selectAsset" :onChange="assetChange" label="asset">
                    <template slot="selected-option" slot-scope="asset">
                      <div class="asset-option">
                        <div>{{asset.symbol || 'Asset'}}</div>
                        <div  class="color-grey asset-id">{{shortAddress(asset.asset)}}</div>
                      </div>
                    </template>
                    <template slot="option" slot-scope="asset">
                      <div class="asset-option">
                        <div>{{asset.symbol || 'Asset'}}</div>
                        <div class="color-grey  asset-id">{{shortAddress(asset.asset)}}</div>
                      </div>
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="form-item">
                  <label class="form-item-label">
                    {{ $t('transfer.quantity') }}

                    <small class="float-right" style="margin-right: 8px;">{{formatCurrency(transaction.cost||0) }}</small>
                  </label>
                  <div class="form-item-content" style=" display: flex;">
                      <input type="number" v-model="transaction.amount" :placeholder="bytomBalance">
                      <span class="color-grey" style="width: 40px; font-size: 15px;position: absolute;right: 0;">{{unit}}</span>
                  </div>
                  <p class="small color-grey">{{$t('crossChain.amountHint')}}</p>
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
import { mapActions, mapGetters, mapState } from 'vuex'
import { Number as Num } from "@/utils/Number"

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
            guid: null,
            account: {},
            accountBalance: 0.00,
            fee: this.$t("transfer.feeType"),
            feeTypeOptions: [this.$t("transfer.feeType")],
            transaction: {
                type:'toVapor',
                asset: BTM,
                fee: 0,
                amount: "",
                to:'',
                confirmations: 1
            }
        };
    },
    computed: {
      assets(){
        if(this.transaction.type === 'toVapor'){
          return this.currentAccount.balances
        }else{
          return this.currentAccount.vpBalances
        }
      },
        unit() {
          return this.selectAsset.symbol;
        },
      bytomBalance: function () {
        let balance, balances
        if(this.transaction.type === 'toVapor'){
          balances = this.currentAccount.balances
        }else if(this.transaction.type === 'toBytom'){
          balances = this.currentAccount.vpBalances
        }
        if(balances && balances.length >0 ){
          const balanceObject = balances.filter(b => b.asset === this.selectAsset.asset)[0]

          balance = Num.formatNue(balanceObject.balance, balanceObject.decimals)
        }

        if(this.transaction.type === 'toVapor'){
          return `Bytom${this.$t("crossChain.amountPlaceHolder")}${(balance != null && balance != 0) ? balance : '0.00'}`
        }else{
          return `Vapor${this.$t("crossChain.amountPlaceHolder")}${(balance != null && balance != 0) ? balance : '0.00'}`
        }
      },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList',
        'net',
        'netType',
        'currency'
      ])
    },
    watch: {
        "transaction.amount": function (newAmount) {
          this.transaction.cost = Number(this.selectAsset[currencyInPrice[this.currency]] * newAmount).toFixed(2);
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

            account.balance(newGuid).then(balances => {
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
        shortAddress: function (add) {
          return address.short(add)
        },
        close: function () {
            this.$router.go(-1)
            this.transaction.to = "";
            this.transaction.amount = "";
            account.setupNet(`${this.net}${this.netType}`);
            if(this.$route.query.type == 'popup'){
               window.close();
            }
        },
        formatCurrency: function (num) {
          return Num.formatCurrency(num, this.currency)
        },
        assetChange: function (val) {
          if(val.asset !== this.selectAsset.asset){
            this.transaction.asset = val.asset;
            const balances = this.currentAccount.balances
            let balance = 0.00
            if(balances.length >0 ) {
              const balanceObject = balances.filter(b => b.asset === val.asset)[0]
              balance = Num.formatNue(balanceObject.balance, balanceObject.decimals)
            }
            this.accountBalance = balance;
            transaction.asset(val.asset).then(ret => {
              this.selectAsset = Object.assign(ret,val)
              this.transaction.cost = Number(ret[currencyInPrice[this.currency]] * this.transaction.amount).toFixed(2);
            });
          }
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

            // Bytom => Vapor
            if(this.transaction.type === 'toVapor'){
              transaction.chainStatus().then((resp)=>{
                const address = resp.federation_address
                account.setupNet(`${this.net}bytom`)
                this.transaction.to = address
                transaction.build(this.account.guid, address, this.transaction.asset, Num.convertToNue(this.transaction.amount,this.selectAsset.decimals), this.transaction.confirmations).then(result => {
                  loader.hide();
                  this.transaction.fee = Number(result.fee / 100000000);
                  this.$router.push({ name: 'transfer-confirm', params: { account: this.account, transaction: this.transaction, rawData: result,assetAlias: this.selectAsset.symbol, type: this.$route.query.type } })
                }).catch(error => {
                  loader.hide();
                  this.$dialog.show({
                    body: getLang(error.message)
                  });
                });
              })
            }

            // Vapor => Bytom
            else{
              const address = this.account.address
              account.setupNet(`${this.net}vapor`)
              this.transaction.to = address
              transaction.buildCrossChain(this.account.guid, address, this.transaction.asset,  Num.convertToNue(this.transaction.amount,this.selectAsset.decimals), this.transaction.confirmations).then(result => {
                  loader.hide();
                this.transaction.fee = Number(result.fee / 100000000);
                this.$router.push({ name: 'transfer-confirm', params: { account: this.account, transaction: this.transaction, rawData: result, assetAlias: this.selectAsset.symbol, type: this.$route.query.type } })
              }).catch(error => {
                  loader.hide();
                  this.$dialog.show({
                      body: getLang(error.message)
                  });
              });
            }

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

      const currentAsset = this.currentAccount.balances[0]

      if(currentAsset){
        transaction.asset(currentAsset.asset).then(ret => {
          this.selectAsset = Object.assign(ret,currentAsset)
        });
      }
    }
};
</script>
