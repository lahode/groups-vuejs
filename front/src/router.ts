import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';

import { Group } from './models/group.model';
import { User } from './models/user.model';

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent);
const groupComponent = () => import('./components/group').then(({ GroupComponent }) => GroupComponent);
// Charge New group component en lazy loading
const newGroupComponent = resolve => {
  require.ensure(['./components/new-group'], () => {
    resolve((<any>require('./components/new-group')).NewGroupComponent);
  });
};

export const user1 = new User('soloh', 'Han', 'Solo');
export const user2 = new User('doj', 'Jon', 'Do');
export const user3 = new User('emmanuelh', 'Henri', 'Emmanuel');

export const groups = [
    new Group('G11113', 'BOUsers', 0, true, user2, 'Utilisateurs BO', '', [user1]),
    new Group('G11114', 'COSI', 0, true, user2, 'Membres et invités de la COSI', '', [user1, user3]),
    new Group('G11115', 'DIT-SB_WinTeam', 1, true, user1, 'membres de la WinTeam'),
    new Group('G11116', 'DIT-WinTeam-SQL', 0, true, user1, 'Groupe concerné'),
    new Group('G11117', 'IDEVELOP', 0, true, user1, 'Membres du groupe IDEVELOP', '', [user2, user3]),
    new Group('G11118', 'IDEVELOP-testeurs-frontend', 1, true, user1, 'Membres du groupe IDEVELOP testeur', '', [user2, user3]),
    new Group('G11119', 'Autre groupe', 0, true, user3, 'Membres du groupe IDEVELOP', '', [user2]),
];

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
        group: groups[parseInt(route.params.id)]
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