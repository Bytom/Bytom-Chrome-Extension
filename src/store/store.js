import Vue from 'vue'
import Vuex from 'vuex';

import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

const state = {
    bytom:null,

    data:null,

    alerts:[],
    alertResult:null,

    prompt:null,
    listVote:[],
    selectVote: null,
    currentAsset: null,
    mnemonic:null,
};

const getters = {
    meta:state => state.bytom.meta,
    currentAccount:state => state.bytom.currentAccount,
    accountList:state => state.bytom.accountList,
    net:state => state.bytom.settings.network,
    netType:state => state.bytom.settings.netType,
    language:state => state.bytom.settings.language,
    domainsMeta:state => state.bytom.settings.domainsMeta,
    vMnemonic:state => state.bytom.currentAccount.vMnemonic,
    currency:state => state.bytom.settings.currency,
    pairs: state => state.bytom.keychain.pairs,

    // FOR PROMPTS ONLY
    messages:state => state.prompt.data.messages || [],
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
