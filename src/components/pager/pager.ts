import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './pager.scss';

@Component({
    template: require('./pager.html'),
})
export class PagerComponent extends Vue {
}
