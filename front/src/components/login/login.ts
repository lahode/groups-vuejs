import Vue from 'vue';
import Component from 'vue-class-component';
import axios, {AxiosResponse} from 'axios';

import { User } from '../../models/user.model';

import './login.scss';

@Component({
    template: require('./login.html'),
})
export class LoginComponent extends Vue {
    username: string = '';
    password: string = '';
    axios: any;
    error: string = '';

    created() {
        this.axios = axios;
    }

    login() {
        axios.post(process.env.ENDPOINT + 'login', {username: this.username, password: this.password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            this.$router.push({ name: 'home'});
        })
        .catch((error) => {
            this.error = error.response ? error.response.data.message : 'Erreur de connexion au serveur';
        });
    }
}
