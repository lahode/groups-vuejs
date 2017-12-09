import { GetterTree } from 'vuex';

import { UserStateI } from './app-states';

export const getters: GetterTree<UserStateI, any> = {
    user: state => state.user
};