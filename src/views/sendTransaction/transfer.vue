<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 20px;
  h1 {
    margin-left: 12px;
    font-size: 20px;
  }
}
.form{
  padding: 16px;
}
.form-item-content input, input.form-item-content {
    background: none;
    border-radius: 0;
    border-bottom: 0.5px solid #EBEBEB;
    padding: 0;
    width:100%
  }

.form-item-content input:focus,
input.form-item-content:focus,
input.form-item-content:active
{
  border: 0;
  border-bottom: 0.5px solid #004EE4;

}

.currency{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-bottom: 17px;
    border-bottom: 0.5px solid #EBEBEB;
      cursor: pointer;


    .symbol{
      display:flex;
      font-weight: 600;
      font-size: 15px;
    align-items: center;
    }

    .assetId{
      font-size:13px;
      align-items: center;
      display: flex;
    }
}

.hint{
    font-size: 13px;
    position: absolute;
    right: 5px;
    display: flex;
    align-items:center;
}

.amount-input{
  display: flex;
  align-items: center;
  input{
    font-size: 28px;
    font-weight: 600;
  }
}

.form{
  margin-bottom: 20px;
  label{
    color: rgba(0, 0, 0, 0.36);
  }
}

.tx-fee{
  font-size: 12px;
  display: flex;

  div{
    margin-left: 7px;
    color: #5C5C5C;
  }
}

.max{
  padding: 2px 12px;
  background: #EEF4FF;
  margin-right: 8px;
  border-radius: 15px;
  color: #004EE4;
  font-size: 12px;
  cursor: pointer;
}
</style>

<template>
    <div class="warp-child bg-grey">
      <section class="header">
        <BackButton :small="true" :back="close"/>
        <h1 class="color-black">
          <div class="welcome-title">{{ $t('main.send') }}</div>
        </h1>
      </section>

      <section class="bg-shadow-white form">

        <div>
            <div class="form-item">
                <label class="form-item-label">{{ $t('transfer.asset') }}</label>
                <div class="form-item-content currency"  @click="$router.push({ name: 'asset-selection' })">
                  <div class="symbol color-black">
                    <img :src="img(unit)" alt="" class="c-icon">

                    <div class="uppercase">
                      {{ unit }}
                    </div>

                  </div>

                  <div class=" text-align-right">
                    <div class="color-grey-36 uppercase assetId">{{ shortAddress(selectAsset.assetId) }} <i class="iconfont iconarrow_1"></i></div>
                  </div>


                </div>
            </div>
            <div class="form-item">
              <label class="form-item-label">{{ $t('transfer.address') }}</label>
              <input class="form-item-content"
              :placeholder="netType=='vapor'? $t('transfer.vaporAddress'): $t('transfer.bytomAddress')"
              type="text"
              id="to"
              name="to"
              ref="to"
              v-model="$v.transaction.to.$model"
              >
            </div>
            <div class="form-item">
                <label class="form-item-label" for="tx-amount">
                  {{ unit+$t('transfer.quantity') }}

                  <small class="float-right color-grey-36" style="margin-right: 8px; margin-top: 8px;">
                    {{ `${$t('transfer.available')} ${currentBalance} ${unit}` }}

                  </small>
                </label>
                <div class="form-item-content amount-input">
                  <input
                    type="number"
                    id="tx-amount"
                    placeholder="0"
                    name="amount"
                    ref="amount"
                    v-model="$v.transaction.amount.$model"
                    @keypress="limitAmount"
                  >
                  <div class="hint">
                    <div class="max" @click="max()">Max</div>
                    <span class="color-grey-36">≈ {{formatCurrency(transaction.cost||0)}}</span>
                  </div>

                </div>
            </div>

            <div class="tx-fee">
                <label >{{ $t('transfer.fee') }}</label>
                <div>{{ transaction.fee }} BTM</div>
            </div>
        </div>
      </section>
      <section>
          <a :class="['btn', netType ==='vapor'?'btn-vapor':'btn-bytom']" @click="validate">{{ $t('transfer.send') }}</a>
      </section>

      <modal-passwd ref="modalPasswd" @confirm="send"></modal-passwd>
    </div>
</template>

<script>
  import address from "@/utils/address";
import transaction from "@/models/transaction";
import getLang from "@/assets/language/sdk";
import Confirm from "./transferConfirm";
import { BTM } from "@/utils/constants";
import { Number as Num } from "@/utils/Number"
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import _ from 'lodash'
import { required } from "vuelidate/lib/validators";
import BigNumber from "bignumber.js"


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
            show: false,
            address: '',
            guid: null,
            account: {},
            transaction: {
                to: "",
                asset: BTM,
                amount: "",
                fee: '0.00000000',
                cost: "",
                confirmations: 1
            },
            selectAsset:{
              assetId: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
              name: "Bytom",
              symbol: "BTM"
            }
        };
    },
    validations: {
      transaction: {
        to:{
          required
        },
        amount:{
          required
        }
      }
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
        currentBalance(){
          const assetId = this.selectAsset.assetId
          let balances

          if(this.netType === 'vapor'){
            balances = this.currentAccount.vpBalances
          }else{
            balances = this.currentAccount.balances
          }

          const balance = balances.find(b => b.asset.assetId === assetId)
          return balance? balance.availableBalance:0;
        },
        unit() {
          return this.selectAsset.symbol;
        },
      ...mapState([
        'bytom',
        'currentAsset'
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

            if(newAmount){
              this.estimateFee()
            }else{
              this.transaction.fee = '0.00000000'
            }
        },
        account: function (newAccount) {
            if (newAccount.guid == undefined){
                return;
              }

            this.guid = newAccount.guid;
            this.address = this.netType === 'vapor'?  newAccount.vpAddress: newAccount.address;
        }
    },
    methods: {
        estimateFee: function(){
          const asset_amount={}
          asset_amount[this.selectAsset.assetId] = this.transaction.amount || 0;

          transaction.estimateFee(this.address, asset_amount).then( (resp) =>{
            this.transaction.fee = resp.fee
          })
        },
        img:function (symbol) {
          const _symbol = symbol.toLowerCase();
          if(this.netType === 'vapor'){
            return `https://cdn.blockmeta.com/resources/logo/vapor/${_symbol}.png`
          }else{
            return `https://cdn.blockmeta.com/resources/logo/bytom/${_symbol}.png`
          }
        },
        shortAddress: function (add) {
          return address.short(add)
        },
        formatCurrency: function (num) {
          return Num.formatCurrency(num, this.currency)
        },
        limitAmount ($event) {
          // restrict to 2 decimal places
          const n = new BigNumber(this.transaction.amount)

          if(this.transaction.amount!=null && this.transaction.amount.indexOf(".")>-1 && (this.transaction.amount.split('.')[1].length > (this.selectAsset.decimals-1))){
            $event.preventDefault();
          }
        },
        close: function () {
            this.$router.push({name: 'home'});
            this[Actions.SET_CURRENT_ASSET](undefined)

            this.transaction.to = "";
            this.transaction.amount = "";
            if(this.$route.query.type == 'popup'){
               window.close();
            }
        },
        max: function () {
            this.transaction.amount = this.currentBalance;
        },
        validate: function () {
          this.$v.$touch();
          if (this.$v.$invalid) {
            const transaction = this.$v.transaction
            for (let key in Object.keys(transaction)) {
              const input = Object.keys(transaction)[key];
              if (input.includes("$")) return false;

              if (transaction[input].$error) {
                switch(input){
                  case 'to':
                    this.$toast.error(
                      this.$t("transfer.emptyTo")
                    );
                    break;
                  case 'amount':
                    this.$toast.error(
                      this.$t("transfer.noneBTM")
                    );
                    break;
                }
                this.$refs[input].focus();
                break;
              }
            }
          } else {
            const n = new BigNumber(this.transaction.amount)
            const to  = this.transaction.to
            if(!address.isValid(to, this.netType)){
                this.$toast.error(
                    this.$t("error.BTM0006")
                );
                this.$refs['to'].focus();
                return
            }
            else if (n.gt(this.currentBalance)) {
                this.$toast.error(
                    this.$t("error.BTM0005")
                );
                this.$refs['amount'].focus();
                return;
            }

            this.$refs.modalPasswd.open();
        }
      },
      send: function (password) {

            let loader = this.$loading.show({
                // Optional parameters
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });

            this.transaction.asset = this.selectAsset.assetId;
            transaction.transfer(this.transaction, password, this.address, this).then(result => {
                loader.hide();
                this.$router.push('/')

            }).catch(error => {
                loader.hide();
                this.$toast.error(
                   getLang(error.message)
                );
            });
      },
      ...mapActions([
        Actions.SET_CURRENT_ASSET,
      ])
    }, mounted() {
        //detect injection
        let currentAssetId
        if(this.$route.query.type === 'popup'){
          if (this.$route.query.from != undefined) {
              this.address = this.$route.query.from
              this.guid = this.currentAccount.guid
              this.account = this.currentAccount
          }

          if (this.$route.query.asset != undefined) {
            currentAssetId = this.$route.query.asset

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

          const currentAsset = this.currentAsset || this.selectAsset
          currentAssetId = currentAsset.assetId

        }

        const that = this

        transaction.asset(currentAssetId).then(ret => {
            that.selectAsset = ret
            if(that.transaction.amount){
              that.transaction.cost = Number(ret[currencyInPrice[that.currency]] * that.transaction.amount).toFixed(2);
            }
          });

    }
};
</script>
