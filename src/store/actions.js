import * as Actions from './constants'
import Bytom from '../utils/Bytom'
import InternalMessage from '../messages/internal'
import * as InternalMessageTypes from '../messages/types'
import account from "../models/account";

export const actions = {
    [Actions.SET_BYTOM]:({commit}, bytom) => commit(Actions.SET_BYTOM, bytom),
    [Actions.SET_LIST_VOTE]:({commit}, listVote) => commit(Actions.SET_LIST_VOTE, listVote),
    [Actions.SET_CURRENT_ASSET]:({commit}, currentAsset) => commit(Actions.SET_CURRENT_ASSET, currentAsset),
    [Actions.SET_SELECTED_VOTE]:({commit}, selectVote) => commit(Actions.SET_SELECTED_VOTE, selectVote),


  [Actions.LOAD_BYTOM]:({dispatch}) => {
        return new Promise((resolve, reject) => {
            InternalMessage.signal(InternalMessageTypes.LOAD).send().then(_bytom => {
                dispatch(Actions.SET_BYTOM, Bytom.fromJson(_bytom));
                resolve();
            })
        })
    },

    [Actions.UPDATE_STORED_BYTOM]:({dispatch}, bytom) => {
        return new Promise((resolve, reject) => {
            InternalMessage.payload(InternalMessageTypes.UPDATE, bytom).send().then(_bytom => {
                dispatch(Actions.SET_BYTOM, Bytom.fromJson(_bytom));
                resolve(_bytom)
            })
        })
    },

    [Actions.IMPORT_BYTOM]:({state, commit, dispatch}) => {
        return new Promise(async (resolve, reject) => {
            const bytom = Bytom.fromJson(state.bytom);
            bytom.settings.network = 'mainnet';
            account.setupNet('mainnet')
            account.list().then(accounts => {
                bytom.accountList = accounts;
                if (accounts.length > 0) {
                    bytom.currentAccount = accounts[0];
                }else{
                  bytom.currentAccount={}
                }

                bytom.settings.login = true
                bytom.settings.currency = "in_cny"
                bytom.settings.netType = ''
                dispatch(Actions.UPDATE_STORED_BYTOM, bytom).then(_bytom => {
                    dispatch(Actions.SET_BYTOM, Bytom.fromJson(_bytom));
                    resolve();
                })
            })

        })
    },

    [Actions.CREATE_NEW_BYTOM]:({state, commit, dispatch}, network) => {
        return new Promise(async (resolve, reject) => {
            const bytom = Bytom.fromJson(state.bytom);
            bytom.settings.network = network;
            account.setupNet(`${network}`)
            account.list().then(accounts => {
              bytom.accountList = accounts;
              if (accounts.length > 0) {
                bytom.currentAccount = accounts[0];
              }

              bytom.settings.login = true
              bytom.settings.currency = "in_cny"
              bytom.settings.netType = ''
              dispatch(Actions.UPDATE_STORED_BYTOM, bytom).then(_bytom => {
                  dispatch(Actions.SET_BYTOM, Bytom.fromJson(_bytom));
                  resolve();
              })
            })

        })
    },

  [Actions.CREATE_NEW_BYTOM_ACCOUNT]:({state, commit, dispatch}, currentAccount) => {
        return new Promise(async (resolve, reject) => {
            const bytom = Bytom.fromJson(state.bytom);
            bytom.accountList.push(currentAccount);
            bytom.currentAccount = currentAccount;

            dispatch(Actions.UPDATE_STORED_BYTOM, bytom).then(_bytom => {
                dispatch(Actions.SET_BYTOM, Bytom.fromJson(_bytom));
                resolve();
            })

        })
    },


    // [Actions.PUSH_ALERT]:({state, commit}, error) => {
    //     function waitForErrorResult(resolve){
    //         if(state.alertResult) {
    //             const alertResult = Object.assign({}, state.alertResult);
    //             commit(Actions.CLEAR_ALERT_RESULT);
    //             resolve(alertResult)
    //         } else setTimeout(() => {
    //             waitForErrorResult(resolve);
    //         }, 100)
    //     }
    //
    //     return new Promise((resolve, reject) => {
    //         commit(Actions.PUSH_ALERT, error);
    //         waitForErrorResult(resolve);
    //     })
    // },
    // [Actions.PULL_ALERT]:({commit}) => commit(Actions.PULL_ALERT),
    // [Actions.PUSH_ALERT_RESULT]:({commit}, alertResult) => commit(Actions.PUSH_ALERT_RESULT, alertResult),
    // [Actions.CLEAR_ALERT_RESULT]:({commit}) => commit(Actions.CLEAR_ALERT_RESULT),
    //
    //
    // [Actions.PUSH_PROMPT]:({state, commit}, prompt) => {
    //     if(state.prompt) state.prompt.responder(null);
    //     commit(Actions.PUSH_PROMPT, prompt);
    // },
};