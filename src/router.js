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
        path: '/asset',
        name: 'asset',
        meta: { title: '资产' },
        component: resolve => {
          require(['@/views/assetList.vue'], resolve)
        }
      },
      {
        path: '/listVote',
        name: 'listVote',
        meta: { title: '节点展示' },
        component: resolve => {
          require(['@/views/vote/listVote.vue'], resolve)
        }
      },
      {
        path: '/listCancel',
        name: 'listCancel',
        meta: { title: '选择节点' },
        component: resolve => {
          require(['@/views/vote/listCancel.vue'], resolve)
        }
      },
      {
        path: '/voteRecord',
        name: 'voteRecord',
        meta: { title: '投票记录' },
        component: resolve => {
          require(['@/views/vote/voteRecord.vue'], resolve)
        }
      },
      {
        path: '/voteRegulation',
        name: 'voteRegulation',
        meta: { title: '投票规则' },
        component: resolve => {
          require(['@/views/vote/voteRegulation.vue'], resolve)
        }
      },
      {
        path: '/vote',
        name: 'vote',
        meta: { title: '投票' },
        component: resolve => {
          require(['@/views/vote/vote.vue'], resolve)
        }
      },
      {
        path: '/veto',
        name: 'veto',
        meta: { title: '取消投票' },
        component: resolve => {
          require(['@/views/vote/veto.vue'], resolve)
        }
      },
      {
        path: '/vote/confirm',
        name: 'vote-confirm',
        meta: { title: '投票确认' },
        component: resolve => {
          require(['@/views/vote/voteConfirm.vue'], resolve)
        }
      },
      {
        path: '/crossChain',
        name: 'cross-chain',
        meta: { title: '跨链' },
        component: resolve => {
          require(['@/views/sendTransaction/crossChainTransaction.vue'], resolve)
        }
      },
      {
        path: '/signMessage',
        name: 'sign-message',
        meta: { title: '请求签名' },
        component: resolve => {
          require(['@/views/sendTransaction/signMessage.vue'], resolve)
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
        path: '/signTransaction',
        name: 'sign-transaction',
        meta: { title: '签名交易' },
        component: resolve => {
          require(['@/views/sendTransaction/signTransaction.vue'], resolve)
        }
      },
      {
        path: '/enable',
        name: 'enable',
        meta: { title: '授权' },
        component: resolve => {
          require(['@/views/prompts/authentication.vue'], resolve)
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
    path: '/welcome',
    name: 'welcome',
    meta: { title: '创建账户' },
    component: resolve => {
      require(['@/views/welcome/welcome.vue'], resolve)
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
    path: '/import',
    name: 'welcome-import',
    meta: { title: '创建账户' },
    component: resolve => {
      require(['@/views/welcome/import.vue'], resolve)
    }
  }
]
export default routers
