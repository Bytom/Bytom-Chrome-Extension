<style scoped>
.row {
    margin: 25px 0;
    display: flex;
    align-items: center;
}
.row .label{
    flex-grow: 1;
}
.value {
    font-size: 15px;
    line-height: 30px;
}
.setting {
    margin: 5px 0 0 0;
    width: 110px;
    height: 32px;
    position: relative;
}
.form-item-content .select {
    height: 32px;
}
</style>

<template>
    <MenuPage :title="$t('setting.title')">
        <div class="row">
            <div class="label">
                <p>{{ $t("setting.lang") }}</p>
            </div>
            <div class="form-item setting">
                <v-select style="height: 32px;" class="select" :value="selected" :clearable="false" :onChange="changeLanguage" :options="i18nOptions"></v-select>
            </div>
        </div>
        <div class="row">
            <div class="label">
                <p>{{ $t("setting.unit") }}</p>
            </div>
            <div class="form-item setting">
                <v-select style="height: 32px;" class="select" :value="unit" :clearable="false" :options="['BTM']"></v-select>
            </div>
        </div>
        <div class="row">
            <div class="label">
                <p>{{ $t("main.network") }}</p>
            </div>
            <div class="form-item setting">
                <v-select style="height: 32px;" class="select"  :value="network" :clearable="false" :options="networks" :onChange="networkToggle"></v-select>
            </div>
        </div>
    </MenuPage>
</template>

<script>
import { have } from "@/assets/language";
import account from "@/models/account";
import * as Actions from '@/store/constants';
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    name: "",
    data() {
        return {
          currentAccount: {},
          network: { label: this.$t('main.mainNet'), value: "mainnet" },
          unit: "BTM",
            i18nOptions: [
                { label: "中文", value: "cn" },
                { label: "English", value: "en" }
            ],
            networks: [
              { label: this.$t('main.mainNet'), value: "mainnet" },
              { label: this.$t('main.testNet'), value: "testnet" },
              { label: this.$t('main.soloNet'), value: "solonet" }
            ],
            selected: { label: "中文", value: "cn" },
            hashVersion: ""
        };
    },
    computed: {
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'net',
        'language',
        'netType'
      ])
    },
    methods: {
        changeLanguage(lang){
          const bytom = this.bytom.clone();

          if (bytom.settings.language != lang.value) {
            bytom.settings.language = lang.value;
            this.$i18n.locale = lang.value;
            this.selected = lang;
            this[Actions.UPDATE_STORED_BYTOM](bytom)
          }
        },
        networkToggle: function (val) {
          const bytom = this.bytom.clone();

          if (bytom.settings.network != val.value) {
            bytom.settings.network = val.value;
            this.network = val;
            account.setupNet(`${val.value}bytom`);

            bytom.currentAccount = {}
            account.list()
              .then(accounts => {

                bytom.accountList = accounts;
                if (accounts.length > 0) {
                  bytom.currentAccount = accounts[0];
                }

                this[Actions.UPDATE_STORED_BYTOM](bytom)
              })
              .catch((errors) =>{
              bytom.accountList =[]
              this[Actions.UPDATE_STORED_BYTOM](bytom)
            })
          }
        },
        refreshAccounts: function () {
          account.list().then(accounts => {
            this.accounts = accounts;
            if (accounts.length == 0) {
              return;
            }

            this.currentAccount = accounts[0];
          })
        },
        setupNetwork(network) {
          this.network = network;
        },
        ...mapActions([
          Actions.UPDATE_STORED_BYTOM,
        ])
    },
    mounted: function () {
        this.hashVersion = version.hash;
        if (have(this.language)) {
              if (this.language == "cn") {
                  this.selected = { label: "中文", value: "cn" };
              } else if (this.language == "en") {
                  this.selected = { label: "English", value: "en" };
              }
          }
        if(this.net) {
            let network
            switch(this.net){
              case 'mainnet':
                network = this.networks[0]
                break;
              case 'testnet':
                network = this.networks[1]
                break;
              case 'solonet':
                network = this.networks[2]
                break;
            }
            this.setupNetwork(network);
          }

    }
};
</script>
