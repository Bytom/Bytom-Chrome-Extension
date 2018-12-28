<style lang="" scoped>
.warp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 600px;
    z-index: 2;
}
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
    padding: 10px 20px;
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
    <div>
        <transition name="page-transfer" enter-active-class="animated fadeInLeft faster" leave-active-class="animated fadeOutLeft faster">
            <div v-show="show" class="warp bg-gray">
                <section class="header bg-green">
                    <i class="iconfont icon-back" @click="close"></i>
                    <div class="balance">
                        <img src="../../assets/logo.png" class="token-icon">
                        <div class="token-amount">
                            {{account.balance}}
                            <span class="asset">BTM</span>
                        </div>
                    </div>
                </section>

                <section class="form">
                    <div class="form-item-group">
                        <div class="form-item">
                            <!-- <label>账户</label> -->
                            <v-select :clearable="false" v-model="guid" style="height: 32px;width: 125px;" label="alias" :options="accounts"></v-select>
                        </div>
                        <div class="form-item" style="margin-left: 20px;">
                            <!-- <label>资产</label> -->
                            <v-select :clearable="false" v-model="selectAsset" style="height: 32px;" label="name" :options="assetOptions"></v-select>
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">{{ $t('transfer.address') }}</label>
                        <div class="form-item-content" style="margin-left: 80px;">
                            <input type="text" v-model="transaction.to">
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">{{ $t('transfer.quantity') }}</label>
                        <div class="form-item-content" style="margin-left: 80px; display: flex;">
                            <input type="number" v-model="transaction.amount" placeholder="0">
                            <span style="width: 40px; font-size: 15px;">{{unit}}</span>
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">≈</label>
                        <div class="form-item-content" style="margin-left: 80px; display: flex;">
                            <input type="number" v-model="transaction.cost" placeholder="0" disabled>
                            <span style="width: 40px; font-size: 15px;">CNY</span>
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">{{ $t('transfer.fee') }}</label>
                        <div class="form-item-content" style="margin-left: 80px;">
                            <v-select :clearable="false" v-model="fee" style="height: 32px;" :options="feeTypeOptions"></v-select>
                        </div>
                    </div>
                    <br>
                    <div style="width: 200px; margin: 0 auto;">
                        <div class="btn bg-green" @click="send">{{ $t('transfer.send') }}</div>
                    </div>
                </section>
            </div>
        </transition>

        <Confirm ref="transferConfirm" @on-success="confirmSuccess"></Confirm>
    </div>
</template>

<script>
import account from "../../models/account";
import transaction from "../../models/transaction";
import getLang from "../../assets/language/sdk";
import Confirm from "./confirm";
export default {
    components: {
        Confirm
    },
    data() {
        const ASSET_BTM =
            "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
        return {
            selectAsset: {
                assets:
                    "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                name: "BTM"
            },
            assetOptions: [
                {
                    assets:
                        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                    name: "BTM"
                }
            ],
            show: false,
            accounts: [],
            unit: "",
            assets: {
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff: "BTM"
            },
            guid: null,
            account: {
                guid: ""
            },
            transaction: {
                to: "",
                asset: ASSET_BTM,
                amount: "",
                fee: "",
                cost: ""
            }
        };
    },
    props: {
        fee: {
            type: String,
            default() {
                return this.$t("transfer.feeType");
            }
        },
        feeTypeOptions: {
            type: Array,
            default() {
                return [this.$t("transfer.feeType")];
            }
        }
    },
    watch: {
        selectAsset: function (val) {
            this.transaction.asset = val.assets;
        },
        "transaction.amount": function (newAmount) {
            transaction.asset(this.transaction.asset).then(ret => {
                this.transaction.cost = Number(ret.result.data.cny_price * newAmount).toFixed(2);
            });
        },
        guid: function (newGuid) {
            this.accounts.forEach(account => {
                if (account.guid == newGuid.guid) {
                    this.account = account;
                    return;
                }
            });
        }
    },
    methods: {
        open: function (accountInfo) {
            this.show = true;

            account.list().then(accounts => {
                this.accounts = accounts;
                let options = [];
                this.accounts.forEach(function (element) {
                    options.push({ label: element.alias, value: element.guid });
                });
                this.options = options;
            });

            this.account = accountInfo;
            this.guid = accountInfo;
            this.unit = this.assets[this.transaction.asset];
        },
        close: function () {
            this.show = false;
            this.transaction.to = "";
            this.transaction.amount = "";
        },
        confirmSuccess: function () {
            this.$emit("on-success");
            this.close()
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
            transaction.build(
                this.account.guid,
                this.transaction.to,
                this.transaction.asset,
                this.transaction.amount,
                this.transaction.fee
            )
                .then(ret => {
                    loader.hide();

                    this.transaction.fee = Number(ret.result.data.fee / 100000000);
                    this.$refs.transferConfirm.open(
                        this.account,
                        this.transaction,
                        ret.result.data
                    );
                })
                .catch(error => {
                    loader.hide();
                    this.$dialog.show({
                        body: getLang(error.message)
                    });
                });
        }
    }
};
</script>