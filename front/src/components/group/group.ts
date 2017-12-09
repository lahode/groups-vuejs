import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios, {AxiosResponse} from 'axios';

import { Group } from '../../models/group.model';
import { EventBus } from '../../main';

import './group.scss';

@Component({
    template: require('./group.html'),
})
export class GroupComponent extends Vue {
    @Prop() groupID: string;
    axios: any;
    error: string = '';
    group: Group = null;

    created() {
        this.axios = axios;
        axios.get(process.env.ENDPOINT + 'api/groups/get/' + this.groupID)
        .then((response) => {
            this.group = response.data.group;
            EventBus.$emit('latestGroup', new Date(Date.now()).toLocaleString() + ' - ' + this.group.name);
        })
        .catch((error) => {
            this.error = error.response ? error.response.data.message : 'Erreur de connexion au serveur';
        });
}

    getMemberCount() {
        return this.group.members ? this.group.members.length : '';
    }

    quitGroupDetail() {
        this.$router.push({ name: 'home'});
    }
}
