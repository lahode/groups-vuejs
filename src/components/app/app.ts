import Vue from 'vue';
import Component from 'vue-class-component';
import { HomeComponent } from '../home';
import { GroupComponent } from '../group';
import { NewGroupComponent } from '../new-group';
import { MenuComponent } from '../menu/menu';

import './app.scss';

@Component({
    template: require('./app.html'),
    components: {
      appHome : HomeComponent,
      appMenu : MenuComponent
    }
})
export class AppComponent extends Vue {
}
