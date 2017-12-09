import { ActionTree } from 'vuex';
import axios from 'axios';

import { User } from '../models/user.model';
import { UserStateI } from './app-states';

export const actions: ActionTree<UserStateI, User> = {
    async updateUser({commit}): Promise<User> {
        let user: User;
        try {
            let token = localStorage.getItem('token');
            let response = await axios.get(process.env.ENDPOINT + 'api/check-auth', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            user = response.data.user;
            commit('setUser', user);
        }
        catch (e) {
            commit('setUser', null);
        }
        return user;
    }
};
