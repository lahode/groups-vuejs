import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import './home.scss';

@Component({
    template: require('./home.html'),
})
export class HomeComponent extends Vue {
    @Prop() mode: string;
}
