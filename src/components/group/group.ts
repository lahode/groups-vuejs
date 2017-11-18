import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';

import './group.scss';

@Component({
    template: require('./group.html'),
})
export class GroupComponent extends Vue {
    group: Group;

    created() {
        const user1 = new User('soloh', 'Han', 'Solo');
        const user2 = new User('doj', 'Jon', 'Do');
        const user3 = new User('emmanuelh', 'Henri', 'Emmanuel');

        this.group = new Group('G11117', 'IDEVELOP', 0, true, user1, 'Membres du groupe IDEVELOP', '', [user2, user3]);
    }

    getMemberCount() {
        return this.group.members ? this.group.members.length : '';
    }
}
