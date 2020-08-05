<template>
    <nav v-if="showNav()">
        <section class="breadcrumb">
          <figure><img class="logo" src="@/assets/logo_pure.png" alt=""></figure>
          <div class="logo_divider"></div>
          <figure  :class="active('HOME')" v-on:click="toggleTab('HOME')"><i class="iconfont iconhome_filled"></i></figure>
          <figure  v-on:click=""><i class="iconfont iconbapp_filled"></i></figure>
          <figure  v-on:click=""><i class="iconfont iconwallet_filled"></i></figure>
          <figure  v-on:click=""><i class="iconfont iconbackup_filled"></i></figure>
        </section>
        <figure class="setting" v-on:click="">
          <i class="iconfont iconSetting_fiiled" @click="$router.go(-1)"></i>
        </figure>
    </nav>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import {RouteNames} from '@/router'

    export default {
        computed: {
            ...mapState([
                'bytom'
            ])
        },
        methods: {
            back(){ this.$router.back() },
            active: function (name) {
              const home_tab = [
                RouteNames.HOME,
                RouteNames.ASSET,
                RouteNames.TRANSFER,
                RouteNames.RECEIVE
              ]
              switch(name){
                case 'HOME':{
                  if(home_tab.includes(this.$route.name)){
                    return "active";
                  }
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
        }

        figure.setting{
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          text-align: center;
        }

        .breadcrumb {
            padding-top: 15px;

            figure.active{
              .iconfont {
                background: #F5F5F5;
                border-radius: 20px;
                color: #333333;
              }
            }

            .iconfont {
                cursor: pointer;
                color:#dbdbdb;
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
</style>
