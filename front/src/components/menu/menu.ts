import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './menu.scss';

@Component({
    template: require('./menu.html'),
})
export class MenuComponent extends Vue {
}
