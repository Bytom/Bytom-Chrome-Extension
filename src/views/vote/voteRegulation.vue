<style lang="" scoped>
  .header {
    display: flex;
  }
  .header p{
    text-align: center;
    width: 280px;
    padding-top: 17px;
  }

.topbar-left .btn-menu i {
    font-size: 100%;
}

.transaction-title h3 {
    font-size: 16px;
    font-weight: inherit;
    padding: 10px 0 10px 20px;
}
#rules{
  height: 500px;
  width: 317px;
  padding: 20px;
}
.list-item-non {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
    cursor: auto;
}

.list-item-non:after {
    content:"";
    background: #e0e0e0;
    position: absolute;
    bottom: 0;
    left: 20px;
    height: 1px;
    width: 90%;
}
.addr{
  font-size: 12px;
}


.no-record{
  display: block;
}


</style>

<template>
    <div class="warp-child bg-white">
        <section class="header bg-header">
          <i class="iconfont icon-back" @click="close"></i>
          <p>{{ $t('listVote.voteRules') }}</p>
        </section>
        <section>
          <iframe id="rules" :src="src"></iframe>
        </section>

    </div>
</template>

<script>
import { BTM } from "@/utils/constants";
import { mapGetters } from 'vuex'



export default {
    name: "",
    data() {
        return {
        };
    },
    watch: {
    },
    computed: {
      src: function () {
        if (this.language == "cn") {
          return "https://h5.bycoin.im:8080/zh/m/rules";
        } else if (this.language == "en") {
          return "https://h5.bycoin.im:8080/en/m/rules";
        }
        return "https://h5.bycoin.im:8080/en/m/rules";
      },
      ...mapGetters([
        'language',
      ])
    },
    methods: {
      close: function () {
        this.$router.go(-1)
      }
    },
    mounted() {
    },
  };
</script>
