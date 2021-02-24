<template>
  <div class="lock-page">
    <div class="main">
      <img class="img-lock" src="@/assets/img/locked.png" alt="">
      <div class="title">{{ $t('lock.title') }}</div>
      <div class="subtitle">{{ $t('lock.subtitle') }}</div> 
      <input 
        class="input" 
        type="password" 
        v-model="password"
        :class="{ error: inputError }"
        :placeholder="$t('lock.placeholder')" 
        @input="inputError = false"
        @keyup.enter="onSubmit"
      />
      <div class="tip">
        {{ $t('lock.forget') }} <a @click="$router.push({ name: 'welcome-import' })">{{ $t('lock.import') }}</a>
      </div>
      <div class="btn-submit btn btn-primary btn-round float-right" @click="onSubmit">
        <i class="iconfont icon-right-arrow"></i>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { store } from '@/store/store'
import { toast } from '@/components/toast'
import account from "@/models/account"
import { updateLockTime } from '@/models/lock'
import { log } from 'util'

export default {
  data () {
    return {
      password: '',
      inputError: false
    }
  },
  computed: {
    currentAccount: () => store.state.bytom.currentAccount
  },
  methods: {
    onSubmit () {
      if (!this.password) {
        this.inputError = true
        toast.error(this.$t('lock.passwordEmpty'))
        return
      }
      if (!account.isValidPassword(this.currentAccount.keystore, this.password)) {
        this.inputError = true
        toast.error(this.$t('lock.passwordError'))
        return
      }
      
      // success
      updateLockTime()
      this.$router.replace({ name: this.$route.query.to })
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  padding-top: 80px;
  height: 600px;
  width: 60%;
  min-width: 320px;
  max-width: 600px;
  text-align: center;
}
.img-lock {
  margin-bottom: 16px;
  width: 72px;
  height: 72px;
}
.title {
  margin-bottom: 4px;
  line-height: 40px;
  font-weight: 600;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.88);
}
.subtitle {
  margin-bottom: 32px;
  color: rgba(0, 0, 0, 0.24);
  line-height: 24px;
}
.input {
  box-sizing: border-box;
  padding: 0 20px;
  height: 56px;
  width: 100%;
  line-height: 56px;
  outline: none;
  border: 1px solid #EBEBEB;
  border-radius: 8px;

  &:focus {
    border-color: #D6D6D6;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.24);
  }
  &.error {
    border-color: #DF1E1E;
  }
}
.tip {
  margin-top: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  text-align: left;

  > a {
    color: #004EE4;
  }
}
.btn-submit {
  margin-top: 16px;
  padding: 0;
  line-height: 54px;
}
</style>
