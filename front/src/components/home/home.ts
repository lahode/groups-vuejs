import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios, {AxiosResponse} from 'axios';

import { PagerComponent } from '../pager';
import { GroupComponent } from '../group';

import { Group } from '../../models/group.model';
import { EventBus, MAX_PER_PAGE } from '../../main';

import './home.scss';

@Component({
    template: require('./home.html'),
    components: {
        appPager : PagerComponent,
        appGroup: GroupComponent
    }
})
export class HomeComponent extends Vue {
    axios: any;
    error: any = '';
    groups: Group[] = [];
    logGroupSeen: string[] = [];
    groupCount: number = 0;
    maxPerPage: number = MAX_PER_PAGE;
    fromto: any = {from: 0, to: MAX_PER_PAGE - 1};

    // Lance la récupération des groupes à la création du composant
    created() {
        this.axios = axios;
        this.getGroupRange();
    }

    // Lorsque le composant est initialisé, ajoute un listener Eventbus
    // permettant de mettre à jour les logs
    // Attention EventBus.$on() écoute uniquement les événements qui ont été
    // envoyé avec this.$emit depuis ce controleur ou un contrôleur enfant
    // Pour que le log fonctionne, utilisez VueX ou un enregistrement via localstorage
    mounted() {
        EventBus.$on('latestGroup', (latestGroup: any) => {
            this.logGroupSeen.push(latestGroup);
        });
    }

    // Affiche le composant "Détail d'un groupe"
    showGroup(groupID: number) {
        this.$router.push({ name: 'group', params: {id: '' + groupID}});
    }

    // Modifie la tranche des groupes à afficher (Pagination)
    changeResult(fromTo: any) {
        this.fromto = fromTo;
        this.getGroupRange();
    }

    // Sélectionne la tranche des groupe à afficher pour l'affichage
    getGroupRange() {
        this.groups = [];
        let from = this.fromto.from;
        let to = this.fromto.to;
        let token = localStorage.getItem('token');
        this.axios.get(process.env.ENDPOINT + 'api/groups/all/' + from + '/' + to, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                this.groups = response.data.groups;
                this.groupCount = response.data.total;
            })
            .catch((error) => {
                this.error = error.response ? error.response.data.message : 'Erreur de connexion au serveur';
            });
    }

}
