import Vue from 'vue';
import Component from 'vue-class-component';
import { HomeComponent } from '../home';

import './app.scss';

@Component({
    template: require('./app.html'),
    components: {
      home : HomeComponent
    }
})
export class AppComponent extends Vue {
    msg: string = 'Welcome to Your Vue.js App';
    mode: any = process.env.ENV;
}
