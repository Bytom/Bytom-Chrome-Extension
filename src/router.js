// import Pormpt from './views/prompt'

const routers = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: resolve => {
      require(['@/views/home.vue'], resolve)
    },
    children: [
      {
        path: '/transfer',
        name: 'transfer',
        meta: { title: '转账' },
        component: resolve => {
          require(['@/views/transfer.vue'], resolve)
        }
      },
      {
        path: '/transfer/info',
        name: 'transfer-info',
        meta: { title: '交易详情' },
        component: resolve => {
          require(['@/views/transferDetail.vue'], resolve)
        }
      },
      {
        path: '/transfer/confirm',
        name: 'transfer-confirm',
        meta: { title: '交易确认' },
        component: resolve => {
          require(['@/views/transferConfirm.vue'], resolve)
        }
      },
      {
        path: '/menu',
        name: 'menu',
        meta: { title: '切换账户' },
        component: resolve => {
          require(['@/views/homeMenu.vue'], resolve)
        },
        children: [
          {
            path: '/menu/account/create',
            name: 'menu-account-creation',
            meta: { title: '创建账户' },
            component: resolve => {
              require(['@/views/menuCreation.vue'], resolve)
            }
          },
          {
            path: '/menu/backup',
            name: 'menu-backup',
            meta: { title: '备份' },
            component: resolve => {
              require(['@/views/menuBackup.vue'], resolve)
            }
          },
          {
            path: '/menu/help',
            name: 'menu-help',
            meta: { title: '帮助' },
            component: resolve => {
              require(['@/views/menuHelp.vue'], resolve)
            }
          },
          {
            path: '/menu/settings',
            name: 'menu-settings',
            meta: { title: '设置' },
            component: resolve => {
              require(['@/views/menuSettings.vue'], resolve)
            }
          }
        ]
      }
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    meta: { title: '欢迎页' },
    component: resolve => {
      require(['@/views/welcome/welcome.vue'], resolve)
    }
  },
  {
    path: '/protocol',
    name: 'welcome-protocol',
    meta: { title: '用户协议' },
    component: resolve => {
      require(['@/views/welcome/protocol.vue'], resolve)
    }
  },
  {
    path: '/creation',
    name: 'welcome-creation',
    meta: { title: '创建账户' },
    component: resolve => {
      require(['@/views/welcome/creation.vue'], resolve)
    }
  },
  {
    path: '/recovery',
    name: 'welcome-recovery',
    meta: { title: '恢复账户' },
    component: resolve => {
      require(['@/views/welcome/recovery.vue'], resolve)
    }
  }
]
export default routers
