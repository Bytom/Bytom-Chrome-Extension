<style lang="" scoped>
  .warp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 600px;
    z-index: 2;
    overflow: scroll;
  }
  .header {
    display: flex;
  }
  .header p{
    text-align: center;
    width: 280px;
    padding-top: 17px;
  }

  .balance {
    width: 280px;
    height: 40px;
    margin: 20px;
    padding: 20px;
    display: flex;
  }
  .balance .token-amount {
    display: inline-block;
  }
  .balance .token-amount .asset {
    font-size: 18px;
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
  .content {
    margin: 20px;
    padding: 20px;
    overflow: hidden;
    border-radius:4px;
    width: 280px;
  }
  .divider {
    margin: 12px 0;
  }

  .value .uint {
    font-size: 12px;
    margin-left: 3px;
  }
  .btn-inline .btn {
    margin: 10px 15px;
  }
  .row{
    word-break: break-all;
  }
  .col{
    font-size: 14px;
    width: 35%;
  }
  .label{
    color: #7B7B7B;
  }
  .value{
    color: #282828;
    width: 60%;
  }
  table{
    width: 100%;
  }
  .form-item{
    padding:0;
    margin:0;
    margin-bottom: 10px;
  }
  .btn-container .btn{
    height: 48px;
    bottom: 20px;
    position: absolute;
    width: 320px;
  }
</style>

<template>
  <div class="warp bg-gray">
    <section class="header bg-header">
      <i class="iconfont icon-back" @click="close"></i>
      <p>{{$t('signMessage.title')}}</p>
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

    <section class="content bg-white">
      <table>
        <tbody>
          <tr class="row">
            <td class="col label">{{ $t('signMessage.address') }}</td>
            <td class="col value">{{address}}</td>
          </tr>

          <div class="divider"></div>

          <tr class="row">
            <td class="col label">{{ $t('signMessage.message') }}</td>
            <td class="col value">{{message}}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="content bg-white">
      <div class="form">
        <div class="form-item">
          <label class="form-item-label">{{ $t('transfer.confirmPassword') }}</label>
          <div class="form-item-content">
            <input type="password"  v-model="password" autofocus>
          </div>
        </div>
      </div>
    </section>

    <div class="row btn-container" style="margin: 20px; position: static;">
      <div class="btn bg-green" @click="sign">{{ $t('signMessage.confirmSignature') }}</div>
    </div>

  </div>
</template>

<script>
import transaction from "@/models/transaction";
import account from "@/models/account";
import getLang from "@/assets/language/sdk";
import { BTM } from "@/utils/constants";
import {apis} from '@/utils/BrowserApis';
import NotificationService from '../../services/NotificationService'
import { mapGetters } from 'vuex'


export default {
    data() {
        return {
            full: false,
            accounts:{},
            account: {},
            accountBalance: 0.00,
            address: '',
            message: '',
            password:'',
            prompt:''
        };
    },
    computed: {
      ...mapGetters([
        'net',
        'netType',
        'accountList'
      ])
    },
    watch: {
    },
    methods: {
        close: function () {
          NotificationService.close();
        },
        sign: function () {
            let loader = this.$loading.show({
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });

            transaction.signMessage(this.message, this.password, this.address).then((resp) => {
                loader.hide();
                this.prompt.responder(resp);
                this.$dialog.show({
                    type: 'success',
                    body: this.$t("transfer.success")
                });
              NotificationService.close();
            }).catch(error => {
                loader.hide();

                this.$dialog.show({
                    body: getLang(error.message)
                });
            });
        }
    }, mounted() {
        this.prompt = window.data || apis.extension.getBackgroundPage().notification || null;
        const object = this.prompt.data

        if(object.address !== undefined){
           this.address = object.address
        }
        if(object.message !== undefined){
            this.message = object.message
        }

        const account = this.accountList.filter(a => (a.address === this.address || a.vpAddress === this.address) )[0]
        this.account = account

        const balances = this.netType ==='vapor'? account.vpBalances : account.balances
        let balance = 0
        if(balances.length > 0){
          const balanceObject = balances.filter(b => b.asset.assetId === BTM)[0]
          balance = balanceObject.availableBalance
        }

        this.accountBalance = balance
      }
};
</script>
