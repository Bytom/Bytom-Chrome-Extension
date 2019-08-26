import Vue from 'vue'
import Vuex from 'vuex';

import {mutations} from './mutations';
import {actions} from './actions';

Vue.use(Vuex);

const state = {
    bytom:null,

    alerts:[],
    alertResult:null,

    prompt:null,
    listVote:[],
    selectVote: null,
};

const getters = {
    currentAccount:state => state.bytom.currentAccount,
    accountList:state => state.bytom.accountList,
    net:state => state.bytom.settings.network,
    netType:state => state.bytom.settings.netType,
    language:state => state.bytom.settings.language,
    login:state => state.bytom.settings.login,

    // FOR PROMPTS ONLY
    messages:state => state.prompt.data.messages || [],
};

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
