import Vue from 'vue';
import { AppComponent } from './components/app';
import { makeHot, reload } from './util/hot-reload';

const appComponent = () => import('./components/app').then(({ AppComponent }) => AppComponent);

import './sass/main.scss';

export const EventBus = new Vue();
export const MAX_PER_PAGE = 6;

if (process.env.ENV === 'development' && module.hot) {
  const appModuleId = './components/app';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(appModuleId, appComponent,
    module.hot.accept('./components/app', () => reload(appModuleId, (<any>require('./components/app')).AppComponent)));
}

new Vue({
  el: '#app',
  components: {
    'app': appComponent
  }
});
