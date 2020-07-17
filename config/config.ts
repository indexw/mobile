// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

import Welcome from '@/pages/monitoringnet/Welcome'

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  title: '刘利2',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          title: '刘利3',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          title: '刘利4',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/monitoringnet',
            },
            {
              path: '/monitoringnet',
              name: 'monitoringnet',
              icon: 'smile',
              // component: './MonitoringNet',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/monitoringnet/hot',
                  name: 'hot',
                  icon: 'smile',
                  component: './MonitoringNet/Hot',
                  authority: ['admin', 'user'],
                },
                {
                  path: '/monitoringnet/day',
                  name: 'day',
                  icon: 'smile',
                  component: './MonitoringNet/Day',
                  authority: ['admin', 'user'],
                },
              ],
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin', 'user'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
