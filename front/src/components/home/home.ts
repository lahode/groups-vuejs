import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { PagerComponent } from '../pager';
import { GroupComponent } from '../group';

import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';
import { EventBus, MAX_PER_PAGE } from '../../main';

import './home.scss';

export const user1 = new User('soloh', 'Han', 'Solo');
export const user2 = new User('doj', 'Jon', 'Do');
export const user3 = new User('emmanuelh', 'Henri', 'Emmanuel');

export const groups = [
    new Group('G11113', 'BOUsers', 0, true, user2, 'Utilisateurs BO', '', [user1]),
    new Group('G11114', 'COSI', 0, true, user2, 'Membres et invités de la COSI', '', [user1, user3]),
    new Group('G11115', 'DIT-SB_WinTeam', 1, true, user1, 'membres de la WinTeam'),
    new Group('G11116', 'DIT-WinTeam-SQL', 0, true, user1, 'Groupe concerné'),
    new Group('G11117', 'IDEVELOP', 0, true, user1, 'Membres du groupe IDEVELOP', '', [user2, user3]),
    new Group('G11118', 'IDEVELOP-testeurs-frontend', 1, true, user1, 'Membres du groupe IDEVELOP testeur', '', [user2, user3]),
    new Group('G11119', 'Autre groupe', 0, true, user3, 'Membres du groupe IDEVELOP', '', [user2]),
];

@Component({
    template: require('./home.html'),
    components: {
        appPager : PagerComponent,
        appGroup: GroupComponent
    }
})
export class HomeComponent extends Vue {
    groups: Group[] = [];
    logGroupSeen: string[] = [];
    groupCount: number = 0;
    maxPerPage: number = MAX_PER_PAGE;
    fromto: any = {from: 0, to: MAX_PER_PAGE - 1};

    // Lance la récupération des groupes à la création du composant
    created() {
        this.getGroups();
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

    // Récupère le nombre total des groupes et sélectionne les groupes à afficher
    getGroups() {
        this.groupCount = groups.length;
        this.getGroupRange();
    }

    // Modifie la tranche des groupes à afficher (Pagination)
    changeResult(fromTo: any) {
        this.fromto = fromTo;
        this.getGroupRange();
    }

    // Sélectionne la tranche des groupe à afficher pour l'affichage
    getGroupRange() {
        this.groups = [];
        for (let i = this.fromto.from; i <= this.fromto.to; i++) {
            if (i < groups.length) {
                this.groups.push(groups[i]);
            }
        }
    }

}
