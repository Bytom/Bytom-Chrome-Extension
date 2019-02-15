<style lang="" scoped>
.header {
    height: 150px;
}
.balance {
    text-align: center;
    margin-top: 15px;
}
.balance .token-icon {
    height: 38px;
    width: 38px;
    margin-right: 5px;
}
.balance .token-amount {
    display: inline-block;
    font-size: 45px;
    line-height: 45px;
}
.balance .token-amount .asset {
    font-size: 18px;
    margin-left: 2px;
}
.form {
    padding: 10px 22px;
}
.form-item-group {
    display: flex;
}
.form-item-group .form-item {
    width: 40%;
}

.btn-inline {
    display: flex;
    padding: 0;
}
.btn-inline .btn {
    margin: 10px 15px;
}
</style>

<template>
    <div class="warp-chlid bg-gray">
        <section class="header bg-green">
            <i class="iconfont icon-back" @click="close"></i>
            <div class="balance">
                <img src="@/assets/logo.png" class="token-icon">
                <div class="token-amount">
                    {{accountBalance}}
                    <span class="asset">BTM</span>
                </div>
            </div>
        </section>

        <section class="form">
            <div class="form-item-group">
                <div class="form-item">
                    <!-- <label>账户</label> -->
                    <v-select :clearable="false" v-model="account" style="height: 32px;width: 125px;" label="alias" :options="accounts"></v-select>
                </div>
            </div>
            <br>
            <div class="btn-inline" style="width: 200px;">
              <div class="btn bg-gray" @click="close">{{ $t('transfer.cancel') }}</div>
              <div class="btn bg-green" @click="$refs.modalPasswd.open()">{{ $t('transfer.confirm') }}</div>
            </div>
        </section>

        <!-- modal -->
        <modalPasswd ref="modalPasswd" @confirm="send"></modalPasswd>
    </div>
</template>

<script>
import account from "@/models/account";
import transaction from "@/models/transaction";
import getLang from "@/assets/language/sdk";
import modalPasswd from "@/components/modal-passwd";
import { LocalStream } from 'extension-streams'

export default {
    components: {
        modalPasswd
    },
    data() {
        const ASSET_BTM =
            "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
        return {
            show: false,
            accounts: [],
            guid: null,
            account: {},
            accountBalance: 0.00,
            transaction: {
                to: "",
                asset: ASSET_BTM,
                amount: "",
                fee: "",
                cost: ""
            }
        };
    },
    computed: {
        unit() {
            return this.assets[this.transaction.asset];
        }
    },
    watch: {
        account: function (newAccount) {
            this.guid = newAccount.guid;
        },
        guid: function (newGuid) {
            this.accounts.forEach(account => {
                if (account.guid == newGuid.guid) {
                    this.account = account;
                    return;
                }
            });

            account.balance(newGuid).then(balance => {
                this.accountBalance = balance;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    methods: {
        close: function () {
            LocalStream.send({method:'advanced-transfer',action:'reject'});
            window.close();
        },
        send: function (passwd) {
            let loader = this.$loading.show({
                // Optional parameters
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });
            const inout = JSON.parse(this.$route.query.object)

            transaction.buildTransaction(this.account.guid,  inout.input, inout.output, inout.gas).then(ret => {
                return transaction.convertArgument(inout.args)
                    .then((arrayData) =>{
                        return transaction.advancedTransfer(this.account.guid, ret.result.data, passwd, arrayData)
                            .then((resp) => {
                                loader.hide();
                                LocalStream.send({method:'advanced-transfer',action:'success', message:resp});
                                this.$dialog.show({
                                    body: this.$t("transfer.success")
                                });
                                this.$router.push('/');
                            })
                            .catch(error => {
                                 throw error
                            });
                     })
                  .catch(error => {
                    throw error
                  });
            }).catch(error => {
                loader.hide();

                this.$dialog.show({
                    body: getLang(error.message)
                });
            });
        }
    }, mounted() {
      const inout = JSON.parse(this.$route.query.object);

      if (inout.account != undefined) {
              this.account = inout.account;
          }

          account.setupNet(localStorage.bytomNet);
          account.list().then(accounts => {
              this.accounts = accounts;
              this.accounts.forEach(function (ele) {
                  ele.label = ele.alias
                  ele.value = ele.guid
              });

              if (Object.keys(this.account).length == 0) {
                  this.account = accounts[0]
              }
          });
      }
};
</script>
