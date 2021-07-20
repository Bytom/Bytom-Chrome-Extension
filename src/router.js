export const RouteNames = {
  HOME:'home',
  ASSET:'asset',
  DELAY_TXS:'delay-transactions',
  ENTRY:'welcome',
  CREATE_ACCOUNT:'welcome-creation',
  MNEMONIC: 'welcome-mnemonic',
  VERIFY_MNEMONIC: 'welcome-verify-mnemonic',
  RESTORE_ACCOUNT:  'welcome-import',
  SETTING_PASSWORD: 'welcome-password',
  PROTOCOL: 'welcome-protocol',
  PRIVACY: 'welcome-privacy',


  SETTINGS:'settings',
  SETTINGS_LANG:'settings-language',
  SETTINGS_CURRENCY:'settings-currency',
  SETTINGS_NETWORK:'settings-network',
  SETTINGS_DELETE:'settings-delete',

  TRANSFER:'transfer',
  ASSET_SELECTION:'asset-selection',
  RECEIVE:'received',

  ENABLE:'enable',
  BACKUP:'backup',
  BACKUP_MNEMONIC:'backup-mnemonic',
  WALLETS:'wallets',
  BAPP:'bapp',
  BAPP_PROMPT:'bapp-prompt',

  LOCK: 'lock'
};

const routers = [
  {
    path: '/',
    name: RouteNames.HOME,
    meta: { title: '首页' },
    component: resolve => {
      require(['@/views/home.vue'], resolve)
    },
    children: [
      {
        path: '/transfer',
        name: RouteNames.TRANSFER,
        meta: { title: '转账' },
        component: resolve => {
          require(['@/views/sendTransaction/transfer.vue'], resolve)
        },
        children: [
          {
            path: '/assetSelection',
            name: RouteNames.ASSET_SELECTION,
            meta: { title: '选择资产' },
            component: resolve => {
              require(['@/views/sendTransaction/assetSelection.vue'], resolve)
            }
          }]
      },
      {
        path: '/asset',
        name: RouteNames.ASSET,
        meta: { title: '资产' },
        component: resolve => {
          require(['@/views/assetList.vue'], resolve)
        }
      },
      {
        path: '/delayTx',
        name: RouteNames.DELAY_TXS,
        meta: { title: '延时交易列表' },
        component: resolve => {
          require(['@/views/delayTxList.vue'], resolve)
        }
      },
      {
        path: '/received',
        name: RouteNames.RECEIVE,
        meta: { title: '接收' },
        component: resolve => {
          require(['@/views/received.vue'], resolve)
        }
      },
    ]
  },
  {
    path: '/enable',
    name: RouteNames.ENABLE,
    meta: { title: '授权', nolock: true },
    component: resolve => {
      require(['@/views/prompts/authentication.vue'], resolve)
    }
  },
  {
    path: '/bappPrompt',
    name: RouteNames.BAPP_PROMPT,
    meta: { title: 'Bapp请求', nolock: true },
    component: resolve => {
      require(['@/views/prompts/bappPrompt.vue'], resolve)
    }
  },
  {
    path: '/wallets',
    name: RouteNames.WALLETS,
    meta: { title: '钱包' },
    component: resolve => {
      require(['@/views/wallets.vue'], resolve)
    }
  },
  {
    path: '/bapp',
    name: RouteNames.BAPP,
    meta: { title: 'Bapp' },
    component: resolve => {
      require(['@/views/bapp.vue'], resolve)
    }
  },
  {
    path: '/backup',
    name: RouteNames.BACKUP,
    meta: { title: '备份' },
    component: resolve => {
      require(['@/views/backup/backup.vue'], resolve)
    },
    children: [
      {
        path: '/backup/mnemonic',
        name: RouteNames.BACKUP_MNEMONIC,
        meta: { title: '备份助记词' },
        component: resolve => {
          require(['@/views/backup/backupMnemonic.vue'], resolve)
        }
      }
    ]
  },

  {
    path: '/settings',
    name: RouteNames.SETTINGS,
    meta: { title: '设置' },
    component: resolve => {
      require(['@/views/settings/settings.vue'], resolve)
    }
  },
  {
    path: '/settings-lang',
    name: RouteNames.SETTINGS_LANG,
    meta: { title: '设置语言' },
    component: resolve => {
      require(['@/views/settings/languageSelection.vue'], resolve)
    }
  },
  {
    path: '/settings-currency',
    name: RouteNames.SETTINGS_CURRENCY,
    meta: { title: '设置货币' },
    component: resolve => {
      require(['@/views/settings/currencySelection.vue'], resolve)
    }
  },
  {
    path: '/settings-network',
    name: RouteNames.SETTINGS_NETWORK,
    meta: { title: '切换网络' },
    component: resolve => {
      require(['@/views/settings/networkSelection.vue'], resolve)
    }
  },
  {
    path: '/settings-delete',
    name: RouteNames.SETTINGS_DELETE,
    meta: { title: '删除钱包' },
    component: resolve => {
      require(['@/views/settings/deleteWallet.vue'], resolve)
    }
  },
  {
    path: '/protocol',
    name: RouteNames.PROTOCOL,
    meta: { title: '用户协议', nolock: true },
    component: resolve => {
      require(['@/views/welcome/protocol.vue'], resolve)
    }
  },{
    path: '/privacy',
    name: RouteNames.PRIVACY,
    meta: { title: '隐私服务', nolock: true },
    component: resolve => {
      require(['@/views/welcome/privacy.vue'], resolve)
    }
  },
  {
    path: '/welcome',
    name: RouteNames.ENTRY,
    meta: { title: '创建账户', nolock: true },
    component: resolve => {
      require(['@/views/welcome/welcome.vue'], resolve)
    }
  },
  {
    path: '/creation',
    name: RouteNames.CREATE_ACCOUNT,
    meta: { title: '创建账户', nolock: true },
    component: resolve => {
      require(['@/views/welcome/creation.vue'], resolve)
    }
  },
  {
    path: '/mnemonic',
    name: RouteNames.MNEMONIC,
    meta: { title: '备份助记词' },
    component: resolve => {
      require(['@/views/welcome/mnemonic.vue'], resolve)
    }
  },
  {
    path: '/verify-mnemonic',
    name: RouteNames.VERIFY_MNEMONIC,
    meta: { title: '验证助记词', nolock: true },
    component: resolve => {
      require(['@/views/welcome/verifyMnemonic.vue'], resolve)
    }
  },
  {
    path: '/import',
    name: RouteNames.RESTORE_ACCOUNT,
    meta: { title: '创建账户', nolock: true },
    component: resolve => {
      require(['@/views/welcome/import.vue'], resolve)
    }
  },
  {
    path: '/restore-password',
    name: RouteNames.SETTING_PASSWORD,
    meta: { title: '密码', nolock: true },
    component: resolve => {
      require(['@/views/welcome/password/setting.vue'], resolve)
    }
  },
  {
    path: '/lock',
    name: RouteNames.LOCK,
    meta: { title: '锁屏', nolock: true },
    component: resolve => {
      require(['@/views/lock.vue'], resolve)
    }
  }
]
export default routers
