import * as Mutations from './constants'
// import TimingHelpers from '../util/TimingHelpers';

export const mutations = {
    [Mutations.SET_BYTOM]:(state, bytom) => state.bytom = bytom,
    [Mutations.PUSH_ALERT]:(state, error) => state.alerts.push(error),
    [Mutations.PULL_ALERT]:(state, error) => state.alerts.shift(),
    [Mutations.PUSH_ALERT_RESULT]:(state, alertResult) => state.alertResult = alertResult,
    [Mutations.CLEAR_ALERT_RESULT]:(state) => state.alertResult = null,
    [Mutations.PUSH_PROMPT]:(state, prompt) => state.prompt = prompt,
    [Mutations.SET_LIST_VOTE]:(state, listVote) => state.listVote = listVote,
    [Mutations.SET_SELECTED_VOTE]:(state, selectVote) => state.selectVote = selectVote,
    [Mutations.SET_CURRENT_ASSET]:(state, currentAsset) => state.currentAsset = currentAsset,

  // [Mutations.SET_AUTO_LOCK]:(state, inactivityInterval) =>
    //     state.bytom.settings.inactivityInterval = TimingHelpers.minutes(inactivityInterval),
};
