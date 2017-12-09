import { MutationTree } from 'vuex';

import { User } from '../models/user.model';
import { UserStateI } from './app-states';

export const mutations: MutationTree<UserStateI> = {
    setUser(state: UserStateI, user: User) {
        state.user = user;
    }
};
