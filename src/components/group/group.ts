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
    @Prop() group: Group;

    getMemberCount() {
        return this.group.members ? this.group.members.length : '';
    }

    quitGroupDetail() {
        this.$emit('hideGroup');
    }
}
