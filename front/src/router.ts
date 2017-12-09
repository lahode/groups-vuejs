import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';
import { makeHot, reload } from './util/hot-reload';
import axios, {AxiosResponse} from 'axios';

const homeComponent = () => import('./components/home').then(({ HomeComponent }) => HomeComponent);
const groupComponent = () => import('./components/group').then(({ GroupComponent }) => GroupComponent);
const loginComponent = () => import('./components/login').then(({ LoginComponent }) => LoginComponent);
const signupComponent = () => import('./components/signup').then(({ SignupComponent }) => SignupComponent);

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
  const loginModuleId = './components/login';
  const signupModuleId = './components/signup';

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('./components/home', () => reload(homeModuleId, (<any>require('./components/home')).HomeComponent)));

  // makeHot(newGroupModuleId, newGroupComponent,
  //  module.hot.accept('./components/new-group', () => reload(newGroupModuleId, (<any>require('./components/new-group')).NewGroupComponent)));

  makeHot(groupModuleId, groupComponent,
    module.hot.accept('./components/group', () => reload(groupModuleId, (<any>require('./components/group')).GroupComponent)));

  makeHot(loginModuleId, loginComponent,
    module.hot.accept('./components/login', () => reload(loginModuleId, (<any>require('./components/login')).LoginComponent)));

  makeHot(signupModuleId, signupComponent,
    module.hot.accept('./components/signup', () => reload(signupModuleId, (<any>require('./components/signup')).SignupComponent)));
}

Vue.use(VueRouter);

function loadGroupfromRouter(route) {
  return {
    groupID: route.params.id
  };
}

// Check if user is authenticated
function checkAuth(checkIfAuth, next) {
  let token = localStorage.getItem('token');
  axios.get(process.env.ENDPOINT + 'api/check-auth', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
      if (checkIfAuth) {
        next();
      }
      else {
        next('home');
      }
    })
    .catch((error) => {
      if (checkIfAuth) {
        next('login');
      }
      else {
        next();
      }
    });
}

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: homeComponent,
    name: 'home',
    beforeEnter: (to, from, next) => checkAuth(true, next)
  },
  {
    path: '/group/new',
    component: newGroupComponent,
    name: 'new-group',
    beforeEnter: (to, from, next) => checkAuth(true, next)
  },
  {
    path: '/group/:id/detail',
    component: groupComponent,
    name: 'group',
    props: loadGroupfromRouter,
    beforeEnter: (to, from, next) => checkAuth(true, next)
  },
  {
    path: '/login',
    component: loginComponent,
    name: 'login',
    beforeEnter: (to, from, next) => checkAuth(false, next)
  },
  {
    path: '/signup',
    component: signupComponent,
    name: 'signup',
    beforeEnter: (to, from, next) => checkAuth(false, next)
  },
  {
    path: '*',
    redirect: '/'
  }
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });
