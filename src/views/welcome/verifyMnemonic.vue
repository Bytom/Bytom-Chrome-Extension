<style scoped>

.header {
  position: relative;
  margin:40px 0px 20px;
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

  .container{
    position: relative;
  }
  .form-item{
    margin: 10px 0;
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
    margin-top: 20px;
  }
  .btn-round{
    padding: 15px 2px;
  }

  .textarea{
    width: calc(100% - 40px);
    min-height: 213px;
    background: #FAFAFA;
    border-radius: 8px;
    border: none;
    padding: 20px;
  }
</style>

<template>
  <div>
    <div class="warp bg-white">
      <div class="header color-black">
        <BackButton :des="'welcome-mnemonic'"/>
        <h1>
          <div class="welcome-title">{{ $t('verifyMnemonic.title')}}</div>
        </h1>
      </div>
      <div class="divider"></div>
      <div class="container">
          <div class="form">
            <div class="form-item">
                  <div :class="[formItemContent, { 'error': $v.inputMnemonic.$error }]">
                      <textarea type="text"
                                class="textarea"
                             :placeholder="$t('verifyMnemonic.hint')"
                             id="inputMnemonic"
                             name="inputMnemonic"
                             ref="inputMnemonic"
                             v-model="$v.inputMnemonic.$model"
                             autofocus />
                  </div>
              </div>
          </div>
          <div>
            <div class="btn btn-primary btn-round float-right" @click="verify"><i class="iconfont icon-right-arrow"></i></div>
          </div>
        </div>
     </div>
      <Footer/>
  </div>
</template>

<script>
import account from "../../models/account";
import { getLanguage } from '@/assets/language'
import { mapActions, mapGetters, mapState } from 'vuex'
import * as Actions from '@/store/constants';
import { required } from "vuelidate/lib/validators";


export default {
    name: "",
    data() {
        return {
            inputMnemonic:''
        };
    },
  validations: {
    inputMnemonic: {
        required,
    }
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
        'currentAccount'
      ])
    },
    props: {
        i18n: {
            type: String,
            default: 'cn',
        }
    },
    methods: {
        verify: function () {
          this.$v.$touch();
          if (this.$v.$invalid) {
            const inputMnemonic = this.$v.inputMnemonic
              if (inputMnemonic.$error) {

                this.$toast.error(
                  this.$t("error.BTM0001")
                );
                this.$refs['inputMnemonic'].focus();
              }
          } else {
            const formMnemonic = this.inputMnemonic.trim()

            if (formMnemonic !== this.currentAccount.mnemonic) {
              this.$toast.error(
                this.$t("error.BTM0002")
              );
              return;
            }

            const bytom = this.bytom.clone();
            bytom.currentAccount.vMnemonic = true;
            bytom.keychain.pairs[bytom.currentAccount.alias].vMnemonic = true;
            this[Actions.UPDATE_STORED_BYTOM](bytom).then(()=>{
              this.$router.push('/')
            })
          }
        },
        ...mapActions([
          Actions.UPDATE_STORED_BYTOM
        ])
    }
};
</script>
