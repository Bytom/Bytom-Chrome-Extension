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
    height: 60px;
}

.content {
    padding: 25px 30px;
}

.ft {
    border-radius: 5px;
    padding: 0 20px !important;
    line-height: 45px;
    margin-bottom: 20px;
}

.ft .from {
    overflow-x: hidden;
    width: 90px;
}
.ft .to {
    overflow-x: hidden;
    padding-left: 20px;
    float: right;
}

.right-arrow {
    width: 32px;
    height: 32px;
    border-top: 12px solid #3c454b;
    border-right: 12px solid #3c454b;
    transform: rotate(45deg);
    position: absolute;
    left: 105px;
}

.row {
    padding: 12px 10px;
}
.value {
    float: right;
}
.value .uint {
    font-size: 12px;
    margin-left: 3px;
}

.fee-intro {
    font-size: 10px;
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
        <transition name="page-transfer" <!-- enter-active-class="animated slideInUp faster" leave-active-class="animated slideOutDown faster"> -->
            <div v-show="show" class="warp bg-gray">
                <section class="header bg-green">
                    <i class="iconfont icon-back" @click="show=false"></i>
                </section>

                <section class="content">
                    <div class="row bg-green ft">
                        <div class="col from">{{account.alias}}</div>
                        <div class="col right-arrow"></div>
                        <div class="col to">{{transaction.toShort}}</div>
                    </div>
                    <div class="row">
                        <div class="col label">{{ $t('transfer.transferAmount') }}</div>
                        <div class="col value">{{transaction.amount}}<span class="uint">BTM</span></div>
                    </div>
                    <div class="row">
                        <div class="col label">{{ $t('transfer.transferCost') }}</div>
                        <div class="col value">{{transaction.cost}}<span class="uint">CNY</span></div>
                    </div>
                    <div class="row">
                        <div class="col label">{{ $t('transfer.fee') }}</div>
                        <div class="col value">{{transaction.fee}}<span class="uint">BTM</span></div>
                    </div>

                    <div class="divider" style="margin-top: 130px; margin-bottom: 10px;"></div>
                    <div class="row" style="text-align: right;">
                        <div class="col label" style="line-height: 50px;">{{ $t('transfer.total') }}</div>
                        <div class="col value">
                            <p class="fee-intro">{{ $t('transfer.totalTip') }}</p>
                            {{Number(transaction.amount)+Number(transaction.fee)}}<span class="uint">BTM</span>
                        </div>
                    </div>
                    <div class="row" style="margin: 20px;">
                        <div class="btn bg-green" @click="$refs.modalPasswd.open()">{{ $t('transfer.confirm') }}</div>
                    </div>
                </section>
            </div>
        </transition>

        <modalPasswd ref="modalPasswd" @confirm="transfer"></modalPasswd>
    </div>
</template>

<script>
import utils from "../common/utils";
import transaction from "../../models/transaction";
import modalPasswd from "./modal-passwd";
import getLang from "../../assets/language/sdk";
export default {
    components: {
        modalPasswd
    },
    data() {
        return {
            show: false,
            rawData: {},
            account: {},
            transaction: {
                to: "",
                toShort: "",
                amount: 0,
                fee: ""
            }
        };
    },
    methods: {
        open: function (account, transaction, data) {
            this.account = account;
            this.transaction = transaction;
            this.transaction.toShort = utils.shortAddress(transaction.to, 4);
            this.rawData = data;
            this.show = true;
        },
        close: function () {
            this.show = false;
        },
        transfer: function (passwd) {
            let loader = this.$loading.show({
                // Optional parameters
                container: null,
                canCancel: true,
                onCancel: this.onCancel
            });

            // rawData, password
            transaction.transfer(this.account.guid, this.rawData, passwd)
                .then(ret => {
                    loader.hide();
                    this.close();
                    this.$emit("on-success");
                    this.$dialog.show({
                        body: this.$t("transfer.success")
                    });
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