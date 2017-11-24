import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { SwitchInputComponent } from '../switch-input';

import { Group } from '../../models/group.model';
import { User } from '../../models/user.model';

import './new-group.scss';

export const user1 = new User('soloh', 'Han', 'Solo');
export const options = ['Anyone can see the list of members',
                        'Only the owner can see the list of members'];

@Component({
    template: require('./new-group.html'),
    components: {
        switchInput: SwitchInputComponent
    }
})
export class NewGroupComponent extends Vue {
    group: Group = new Group('', '', 0, false, user1);
    accessOptions: string[] = [];
    showPopup: boolean = false;

    created() {
        this.accessOptions = options;
    }

    changeUrl(event: any) {
        this.group.url = event.target.value;
    }

    changeVisibility(visibility: boolean) {
        this.group.visibility = visibility;
    }

    save() {
        this.showPopup = true;
    }
}
