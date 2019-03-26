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
          require(['@/views/sendTransaction/transfer.vue'], resolve)
        }
      },
      {
        path: '/received',
        name: 'received',
        meta: { title: '接收' },
        component: resolve => {
          require(['@/views/received.vue'], resolve)
        }
      },
      {
        path: '/advancedTransfer',
        name: 'advanced-transfer',
        meta: { title: '高级转账' },
        component: resolve => {
          require(['@/views/sendTransaction/advancedTransfer.vue'], resolve)
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
          require(['@/views/sendTransaction/transferConfirm.vue'], resolve)
        }
      },
      {
        path: '/menu',
        name: 'menu',
        meta: { title: '切换账户' },
        component: resolve => {
          require(['@/views/sideMenu/homeMenu.vue'], resolve)
        },
        children: [
          {
            path: '/menu/account/create',
            name: 'menu-account-creation',
            meta: { title: '创建账户' },
            component: resolve => {
              require(['@/views/sideMenu/menuCreation.vue'], resolve)
            }
          },
          {
            path: '/menu/backup',
            name: 'menu-backup',
            meta: { title: '备份' },
            component: resolve => {
              require(['@/views/sideMenu/menuBackup.vue'], resolve)
            }
          },
          {
            path: '/menu/help',
            name: 'menu-help',
            meta: { title: '帮助' },
            component: resolve => {
              require(['@/views/sideMenu/menuHelp.vue'], resolve)
            }
          },
          {
            path: '/menu/settings',
            name: 'menu-settings',
            meta: { title: '设置' },
            component: resolve => {
              require(['@/views/sideMenu/menuSettings.vue'], resolve)
            }
          }
        ]
      }
    ]
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
  }
]
export default routers
