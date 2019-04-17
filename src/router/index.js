import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import navigation from '@/components/navigation'
import index from '@/components/index'
import userinfo from '@/components/userinfo'
import user from '@/components/sys/user'
import role from '@/components/sys/role'
import res from '@/components/sys/res'
import loginLog from '@/components/log/loginLog'
import operationLog from '@/components/log/operationLog'
import blogedit from '@/components/blog/edit'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '/navigation',
      component: navigation
    },
    {
      path: '/login',
      name: '登陆',
      component: login
    },
    {
      path: '/navigation',
      name: '菜单导航栏',
      component: navigation,
      children: [
        {
          path: '/index',
          name: '主页面',
          component: index,
        },
        {
          path: '/info',
          name: '个人信息',
          component: userinfo,
        },
        {
          path: '/sys/user',
          name: '用户管理',
          component: user,
        },
        {
          path: '/sys/role',
          name: '角色管理',
          component: role,
        },
        {
          path: '/sys/res',
          name: '资源管理',
          component: res,
        },
        {
          path: '/log/login',
          name: '登陆日志',
          component: loginLog,
        },
        {
          path: '/log/operation',
          name: '操作日志',
          component: operationLog,
        },
        {
          path: '/blog/edit',
          name: '博客添加',
          component: blogedit,
        },
      ]
    },

  ]
})
