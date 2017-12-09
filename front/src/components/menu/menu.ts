import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import './menu.scss';

import { User } from '../../models/user.model';

@Component({
    template: require('./menu.html'),
})
export class MenuComponent extends Vue {

    @Getter user: User;

    // Log out
    logout() {
        localStorage.removeItem('token');
        this.$router.push({ name: 'login'});
    }

    // Check if object is empty
    isEmpty(user) {
        if (user) {
            for (let u in user) {
                return false;
            }
        }
        return true;
    }
}
