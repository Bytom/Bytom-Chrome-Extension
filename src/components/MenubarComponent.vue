<template>
    <nav v-if="showNav()">
        <section class="breadcrumb">
          <figure class="logo-f"><img class="logo" src="@/assets/logo.png" alt=""></figure>
          <div class="logo_divider"></div>
          <figure  :class="active('HOME')" v-on:click="toggleTab('HOME')">
            <a><i class="iconfont icon_home_filled"></i> <span class="hide-small">{{ $t('menu.home') }}</span></a>
          </figure>
          <figure  :class="active('BAPP')" v-on:click="toggleTab('BAPP')">
            <a><i class="iconfont icon_bapp_filled"></i> <span class="hide-small">{{ $t('menu.bapp') }}</span></a>
          </figure>
          <figure :class="active('WALLETS')" v-on:click="toggleTab('WALLETS')">
            <a><i class="iconfont icon_wallet_filled"></i> <span class="hide-small">{{ $t('menu.wallets') }}</span></a>
          </figure>
          <figure :class="active('BACKUP')" v-on:click="toggleTab('BACKUP')">
            <a><i class="iconfont icon_backup_filled"></i> <span class="hide-small">{{ $t('menu.backup') }}</span></a>
          </figure>
        </section>
        <section class="bottom">

          <figure>
            <a v-if="!hideExpand" :href="link" target="_blank">
              <i class="iconfont icon_Small_Fullscreen" ></i><span class="hide-small">{{ $t('menu.expand') }}</span>
            </a>
          </figure>
          <figure class="setting" :class="active('SETTINGS')" v-on:click="toggleTab('SETTINGS')">
            <a><i class="iconfont icon_setting_fiiled" ></i><span class="hide-small">{{ $t('menu.setting') }}</span></a>
          </figure>
        </section>
    </nav>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import {RouteNames} from '@/router'
    import {apis} from '@/utils/BrowserApis';

    export default {
        computed: {
            hideExpand(){
              return new URL(window.location.href).pathname === '/pages/prompt.html'
            },
            link(){
              return `${apis.runtime.getURL('pages/prompt.html')}`;
            },
            ...mapState([
                'bytom'
            ]),
            ...mapGetters([
              'currentAccount',
            ])
        },
        methods: {
            back(){ this.$router.back() },
            active: function (name) {
              const home_tab = [
                RouteNames.HOME,
                RouteNames.ASSET,
                RouteNames.TRANSFER,
                RouteNames.RECEIVE,
                RouteNames.ASSET_SELECTION
              ]

              const setting_tab = [
                RouteNames.SETTINGS,
                RouteNames.SETTINGS_CURRENCY,
                RouteNames.SETTINGS_LANG,
                RouteNames.SETTINGS_DELETE,
              ]

              const backup_tab = [
                RouteNames.BACKUP,
                RouteNames.BACKUP_MNEMONIC,
              ]

              const wallet_tab = [
                RouteNames.WALLETS,
                RouteNames.CREATE_ACCOUNT,
                RouteNames.MNEMONIC,
                RouteNames.VERIFY_MNEMONIC,
                RouteNames.ENTRY
              ]

              const bapp_tab = [
                RouteNames.BAPP,
              ]
              switch(name){
                case 'HOME':{
                  if(home_tab.includes(this.$route.name)){
                    return "active";
                  }
                  break;
                }
                case 'SETTINGS':{
                  if(setting_tab.includes(this.$route.name)){
                    return "active";
                  }
                  break;
                }
                case 'BACKUP':{
                  if(backup_tab.includes(this.$route.name)){
                    return "active";
                  }
                  break;
                }
                case 'WALLETS':{
                  if(wallet_tab.includes(this.$route.name)){
                    return "active";
                  }
                  break;
                }
                case 'BAPP':{
                  if(bapp_tab.includes(this.$route.name)){
                    return "active";
                  }
                  break;
                }

                default:
                  return ""
              }
            },
            showNav(){
              switch(this.$route.name){
                  case RouteNames.ENTRY:
                  case RouteNames.CREATE_ACCOUNT:
                  case RouteNames.MNEMONIC:
                  case RouteNames.VERIFY_MNEMONIC:
                  case RouteNames.RESTORE_ACCOUNT:
                  case RouteNames.SETTING_PASSWORD:
                  case RouteNames.ENABLE:
                  case RouteNames.BAPP_PROMPT:
                  case RouteNames.PRIVACY:
                  case RouteNames.PROTOCOL: return false;
                  default: return true;
              }
            },

            toggleTab(name){
                this.$router.push({name:RouteNames[name]})
            }
        },
    }
</script>

<style lang="scss">

    nav {
        height: 100%;
        background: #fff;
        transition: all 0.2s ease;
        transition-property: max-height, line-height, background;
        position: relative;
        z-index: 2;
        width: 80px;
        text-align: center;
        min-height: 585px;

        .logo {
            width: 26px;
        }

        .logo_divider{
          width: 20px;
          height: 1px;

          background: #EBEBEB;
        }

        figure, .logo_divider{

          margin-left: auto;
          margin-right: auto;
        }

        i.iconfont {
          cursor: pointer;
          color: #d6d6d6;
          transition: color 0.2s ease;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          &:hover {
            color:rgba(0,0,0,0.3);
          }

        }

        .bottom{
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          text-align: center;
        }

        figure.active{
          .iconfont {
            background: #F5F5F5;
            border-radius: 20px;
            color: #333333;
          }
        }

        .breadcrumb {
            padding-top: 15px;
        }

        &.no-chain {
            max-height:99px;
            line-height:99px;

            .logo {
                font-size:64px;
                color:#656565;
                width:100%;
                text-align:center;
            }
        }

        &.locked {
            max-height:200px;
            line-height:200px;

            .logo {
                font-size:64px;
                color:#656565;
                width:100%;
                text-align:center;
            }
        }

        &.main-menu-nav {
            background:#f9f9f9;
        }
    }
    @media screen and (max-width: 992px) {
      .hide-small{
        display: none;
      }
    }
    @media screen and (min-width: 993px) {
      nav{
        width: 208px;
        figure{
          text-align: left;
          padding: 0px 12px;
          margin: 18px;
          span{
            font-size: 16px;
            color: rgba(0, 0, 0, 0.64);
            margin-left: 6px;
          }
          a{
            display: flex;
            align-items: center;
          }
        }

        figure.active{
          background: #F5F5F5;
          border-radius: 8px;
          span{
            color:  rgba(0, 0, 0, 0.88);
          }
        }
        figure.logo-f{
          text-align: center;
        }
      }
    }
</style>
