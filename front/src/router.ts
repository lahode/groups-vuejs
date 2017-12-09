import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent);
const groupComponent = () => import('./components/group').then(({ GroupComponent }) => GroupComponent);
// Charge New group component en lazy loading
const newGroupComponent = resolve => {
  require.ensure(['./components/new-group'], () => {
    resolve((<any>require('./components/new-group')).NewGroupComponent);
  });
};

if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home';
  // const newGroupModuleId = './components/new-group';
  const groupModuleId = './components/group';

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (<any>require('./components/home')).HomeComponent)));

  // makeHot(newGroupModuleId, newGroupComponent,
  //  module.hot.accept('./components/new-group', () => reload(newGroupModuleId, (<any>require('./components/new-group')).NewGroupComponent)));

  makeHot(groupModuleId, groupComponent,
    module.hot.accept('./components/group', () => reload(groupModuleId, (<any>require('./components/group')).GroupComponent)));
}

Vue.use(VueRouter);

function loadGroupfromRouter(route) {
  return {
    groupID: route.params.id
  };
}

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
    name: 'home'
  },
  {
    path: '/group/new',
    component: newGroupComponent,
    name: 'new-group'
  },
  {
    path: '/group/:id/detail',
    component: groupComponent,
    name: 'group',
    props: loadGroupfromRouter
  },
  {
    path: '*',
    redirect: '/'
  }
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });