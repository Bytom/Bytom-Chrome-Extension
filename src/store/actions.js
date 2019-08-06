import * as Actions from './constants'
import Bytom from '../utils/Bytom'
import InternalMessage from '../messages/internal'
import * as InternalMessageTypes from '../messages/types'

export const actions = {
    [Actions.SET_BYTOM]:({commit}, bytom) => commit(Actions.SET_BYTOM, bytom),

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

    // [Actions.IMPORT_BYTOM]:({dispatch}, {imported, seed}) => {
    //     return new Promise(async (resolve, reject) => {
    //
    //         const bytom = Bytom.fromJson(imported);
    //
    //         await Promise.all(PluginRepository.signatureProviders().map(async plugin => {
    //             const network = await plugin.getEndorsedNetwork();
    //
    //             bytom.settings.networks = bytom.settings.networks.filter(_network => _network.unique() !== network.unique());
    //             bytom.settings.networks.push(network);
    //         }));
    //
    //         bytom.meta = new Meta();
    //
    //         InternalMessage.payload(InternalMessageTypes.SET_SEED, seed).send().then(() => {
    //             dispatch(Actions.UPDATE_STORED_BYTOM, bytom).then(_bytom => {
    //                 resolve();
    //             })
    //         });
    //     })
    // },

    [Actions.CREATE_NEW_BYTOM]:({state, commit, dispatch}, network, currentAccount) => {
        return new Promise(async (resolve, reject) => {
            const bytom = Bytom.fromJson(state.bytom);
            bytom.settings.network = network;
            bytom.currentAccount = currentAccount

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
