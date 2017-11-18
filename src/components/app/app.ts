import Vue from 'vue';
import Component from 'vue-class-component';
import { MenuComponent } from '../menu/menu';

import './app.scss';

@Component({
    template: require('./app.html'),
    components: {
      appMenu : MenuComponent
    }
})
export class AppComponent extends Vue {
}
