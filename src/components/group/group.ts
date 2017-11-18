import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';
import { EventBus } from '../../main';

import './group.scss';

@Component({
    template: require('./group.html'),
})
export class GroupComponent extends Vue {
    @Prop() group: Group;

    created() {
        EventBus.$emit('latestGroup', new Date(Date.now()).toLocaleString() + ' - ' + this.group.name);
    }

    getMemberCount() {
        return this.group.members ? this.group.members.length : '';
    }

    quitGroupDetail() {
        this.$router.push({ name: 'home'});
    }
}
