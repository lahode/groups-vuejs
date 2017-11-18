import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

import { Group } from './models/group.model';
import { User } from './models/user.model';

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent);
const newGroupComponent = () => import('./components/new-group').then(({ NewGroupComponent }) => NewGroupComponent);

if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = './components/home';
  const newGroupModuleId = './components/new-group';

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (<any>require('./components/home')).HomeComponent)));

  makeHot(newGroupModuleId, newGroupComponent,
    module.hot.accept('./components/new-group', () => reload(newGroupModuleId, (<any>require('./components/new-group')).NewGroupComponent)));
}

Vue.use(VueRouter);

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
    path: '*',
    redirect: '/'
  }
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });