<style scoped>
  .header {
    position: relative;
    margin:80px 0px 20px;
    line-height: 37px;
  }
  .header p{
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    padding-top: 5px;
  }
  .container{
    position: relative;
    margin-top: 24px;
  }


  .tabs a{
    margin: 0px 20px;
  }
  .tabs .active{
    color: rgba(255,255,255, 1);
  }

  .topbar a{
    position: fixed;
    top: 10px;
    right: 20px;
  }
  .topbar a i{
    font-size: 25px;
    color: white;
  }
  .welcome-title{
    font-weight: 100;
  }
  .widget{
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .widget h4{
    font-weight: 600;
    font-size: 15px;
  }

  .widget p{
    font-size: 13px;
  }
  .widget:hover, .widget:focus{
    background: #FAFAFA;
    border-radius: 8px;
  }
  .logo{
    margin-left:16px;
  }

</style>

<template>
  <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <h1>
          <div class="welcome-title">{{ $t('home.welcome')}}</div>
          <div>{{ $t('home.byone')}}</div>
        </h1>
      </div>
      <div class="divider"></div>

      <div class="container">
       <div class="widget">
         <a @click="$router.push({ name: 'welcome-creation' })">
           <div class="d-flex">
             <div>
               <h4 class="color-black">{{ $t('home.create')}}</h4>
               <p>{{ $t('home.createHint')}}</p>
             </div>
             <img class="logo" src="@/assets/img/icon/wallet-create.svg" alt="">
           </div>
         </a>
       </div>
        <div class="widget" style="margin-top: 16px;">
          <a @click="$router.push({ name: 'welcome-import' })">
            <div class="d-flex">
              <div>
                <h4 class="color-black">{{ $t('home.import')}}</h4>
                <p>{{ $t('home.importHint')}}</p>
              </div>
              <img class="logo" src="@/assets/img/icon/wallet-import.svg" alt="">
            </div>
          </a>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { getLanguage } from '@/assets/language'
import { mapActions, mapGetters, mapState } from 'vuex'

let mainNet = null;
export default {
    name: "",
    data() {
        return {
        };
    },
    computed: {
        formItemLabel: function () {
            if (this.i18n == "cn") {
                return "form-item-label form-item-label-cn";
            } else if (this.i18n == "en") {
                return "form-item-label";
            }
            return "form-item-label form-item-label-cn";
        },
        formItemContent: function () {
            if (this.i18n == "cn") {
                return "form-item-content content-cn";
            } else if (this.i18n == "en") {
                return "form-item-content content";
            }
            return "form-item-label form-item-label-cn";
        },
      ...mapState([
        'bytom'
      ]),
      ...mapGetters([
        'net',
        'language',
        'netType'
      ])
    },
    props: {
        i18n: {
            type: String,
            default: 'cn',
        }
    },
    mounted() {
        this.i18n = getLanguage(this.language);
    }
};
</script>
