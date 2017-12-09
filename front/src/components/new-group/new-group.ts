import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { SwitchInputComponent } from '../switch-input';
import axios, {AxiosResponse} from 'axios';

import { Group } from '../../models/group.model';
import { store } from '../../store';

import './new-group.scss';

export const options = ['Anyone can see the list of members',
                        'Only the owner can see the list of members'];

@Component({
    template: require('./new-group.html'),
    components: {
        switchInput: SwitchInputComponent
    }
})
export class NewGroupComponent extends Vue {
    axios: any;
    error: string = '';
    group: Group = new Group('', '', 0, false, null);
    accessOptions: string[] = [];
    groupSaved: boolean = false;

    created() {
        this.accessOptions = options;
    }

    changeUrl(event: any) {
        this.group.url = event.target.value;
    }

    changeVisibility(visibility: boolean) {
        this.group.visibility = visibility;
    }

    goToHomePage() {
        if (this.groupSaved) {
            this.$router.push({ name: 'home'});
        }
    }

    save() {
        let token = localStorage.getItem('token');
        let owner = store.state.user;
        this.group._id = undefined;
        this.group.owner = owner._id;
        axios.post(process.env.ENDPOINT + 'api/groups/save/', this.group, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            this.groupSaved = true;
        })
        .catch((error) => {
            this.error = error.response ? error.response.data.message : 'Erreur de connexion au serveur';
        });

    }
}
