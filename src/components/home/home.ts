import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { PagerComponent } from '../pager';

import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';

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
        appPager : PagerComponent
    }
})
export class HomeComponent extends Vue {
    groups: Group[];

    created() {
        this.getGroups();
    }

    getGroups() {
        this.groups = groups;
    }
}
