import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios, {AxiosResponse} from 'axios';

import './menu.scss';

import { User } from '../../models/user.model';

@Component({
    template: require('./menu.html'),
})
export class MenuComponent extends Vue {
    isAuth: boolean = false;
    user: User | null = null;
    axios: any;

    created() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.axios = axios;
        this.checkAuth();
    }

    // Check if user is authenticated
    checkAuth() {
        let token = localStorage.getItem('token');
        this.axios.get(process.env.ENDPOINT + 'api/check-auth', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                this.isAuth = true;
            }).catch((error) => {
                this.isAuth = false;
            });
    }

    // Log out
    logout() {
        this.isAuth = false;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.$router.push({ name: 'login'});
    }
}
