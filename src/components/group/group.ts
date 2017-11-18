import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './group.scss';

@Component({
    template: require('./group.html'),
})
export class GroupComponent extends Vue {
}
