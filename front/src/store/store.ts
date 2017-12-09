import Vue from 'vue';
import Vuex from 'vuex';

import { state } from './app-states';
import { getters } from './app-getters';
import { mutations } from './app-mutations';
import { actions } from './app-actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});