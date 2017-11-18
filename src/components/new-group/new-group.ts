import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './new-group.scss';

@Component({
    template: require('./new-group.html'),
})
export class NewGroupComponent extends Vue {
}
