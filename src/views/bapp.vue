<style scoped>

</style>

<template>
    <MenuPage :title="$t('createAccount.title')">
        <div class="form">
            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.accountAlias') }}</label>
                <div class="form-item-content">
                    <input type="text" v-model="formItem.accAlias">
                </div>
            </div>

            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.keyPassword') }}</label>
                <div class="form-item-content">
                    <input type="password" v-model="formItem.passwd1">
                </div>
            </div>
            <div class="form-item">
                <label class="form-item-label">{{ $t('createAccount.confirmPassword') }}</label>
                <div class="form-item-content">
                    <input type="password" v-model="formItem.passwd2">
                </div>
            </div>
            <div class="tips">{{tips}}</div>
        </div>
        <a class="btn btn-primary submit" @click="create">{{ $t('createAccount.create') }}</a>
    </MenuPage>
</template>

<script>
import account from "@/models/account";
import * as Actions from '@/store/constants';
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
    name: "",
    components: {},
    data() {
        return {
            formItem: {
                accAlias: "",
                keyAlias: "",
                passwd1: "",
                passwd2: ""
            },
            tips: ""
        };
    },
    computed: {
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'net',
        'netType'
      ])
    },
    methods: {
        create: function () {

        },
        ...mapActions([
          Actions.CREATE_NEW_BYTOM_ACCOUNT,
          Actions.UPDATE_STORED_BYTOM
        ])
    },
    mounted() { }
};
</script>
