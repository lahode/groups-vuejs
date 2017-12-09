import Vue from 'vue';
import Component from 'vue-class-component';
import axios, {AxiosResponse} from 'axios';

import { User } from '../../models/user.model';

import './signup.scss';

@Component({
    template: require('./signup.html'),
})
export class SignupComponent extends Vue {
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    password: string = '';
    axios: any;
    error: string = '';

    created() {
        this.axios = axios;
    }

    signup() {
        axios.post(process.env.ENDPOINT + 'signup', {firstname: this.firstname, lastname: this.lastname, username: this.username, password: this.password})
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            this.$router.push({ name: 'home'});
        })
        .catch((error) => {
            this.error = error.response ? error.response.data.message : 'Erreur de connexion au serveur';
        });
    }
}
