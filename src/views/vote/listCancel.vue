<style lang="" scoped>
.header {
  display: flex;
}
.header p{
  text-align: center;
  width: 270px;
  padding-top: 17px;
}
.my-vote {
  height: 115px;
    padding: 20px;
  display: flex;
  text-align: center;
  flex-direction: column;
  font-size:14px;
}

.my-vote .vote-number{
  font-size: 28px;
  padding: 15px 0;
}

.vote-list {
    border-radius:4px;
    height: 505px;
    overflow: scroll;
    padding: 20px 0px;
}

.votes{
  width: 100%;
}

.vote-item> td{
  padding: 12px 15px;
  border-bottom: 1px solid #F0F0F0;
  cursor: pointer;
}
  .vote-item img{
    height: 36px;
    width: 36px;
    border:1px solid #E0E0E0;
    opacity:1;
    border-radius:4px;
    margin-right: 15px;
  }
  .vote-item .vote-title{
    font-size: 14px;
  }
  .vote-item .vote-number{
    font-size: 12px;
    color: #8A8A8A;
  }

  .vote-title{
    font-size: 14px;
    line-height: 36px;
    vertical-align: middle;
    align-items: center;
    display: flex;
  }

</style>

<template>
    <div class="warp-chlid bg-gray">
      <section class="header bg-header">
        <i class="iconfont icon-back" @click="close"></i>
        <p>{{ $t('listCancel.selectVote') }}</p>
      </section>

        <section class="vote-container  bg-white">
          <div class="vote-list">
            <table class="list votes">
              <tr class="vote-item" v-for="(vote, index) in filteredList" :key="index"  @click="openVeto(vote)">
                  <td >
                    <div class="vote-title" >
                      <img  :src="vote.logo" alt="">
                      <div v-if="net === 'mainnet'">
                        <a :href="`https://vapor.blockmeta.com/node/${vote.pub_key}`" target="_blank">
                          {{vote.name}}
                        </a>
                      </div>
                      <div v-else>
                        {{vote.name}}
                      </div>
                    </div>
                    <div class="vote-number">{{$t('listCancel.voted')}} {{formatNue(vote.total)}}</div>
                  </td>
                <td>
                  <div class="vote-title">{{formatNue(vote.total-vote.locked)}} </div>
                   <div class="vote-number"> {{$t('listCancel.cancel')}} </div>
                </td>
              </tr>
            </table>
          </div>
        </section>
    </div>
</template>

<script>
import query from "@/models/query";
import { BTM } from "@/utils/constants";
import Number from "@/utils/Number"
import { mapActions, mapGetters, mapState } from 'vuex'
import _ from 'lodash';
import * as Actions from '@/store/constants';


export default {
    components: {
    },
    data() {
        return {
          votes:[],
          totalVote:0,
          search:''
        };
    },
    computed: {
        unit() {
            return this.assets[this.transaction.asset];
        },
        voteRole(){
            return function (roleNum) {
              switch (roleNum){
                case 0:
                  return 'vote-role bp';
                case 1:
                  return 'vote-role stanbybp';
                case 2:
                  return 'vote-role otherbp';
                default:
                  return 'vote-role otherbp';
              }
            }
        },
      myVote() {
        let vote
        const votes = this.currentAccount.votes
        if(votes && votes.length >0 ){
          vote = _.sumBy(votes,'total')
        }
        return (vote != null && vote != 0) ? Number.formatNue(vote) : '0.00'
      },
      filteredList() {
        return this.votes.filter(post => {
          return post.name.toLowerCase().includes(this.search.toLowerCase())
        })
      },
      ...mapState([
        'bytom',
        'listVote'
      ]),
      ...mapGetters([
        'currentAccount',
        'accountList',
        'net'
      ])
    },
    watch: {

    },
    methods: {
        close: function () {
            this.$router.go(-1)
            },
        formatNue: function (nue) {
          return Number.formatNue(nue);
        },
        formatFraction: function (upper, lower) {
          return Number.fractionalNum(upper, lower);
        },
        openVeto: function(veto){
          this[Actions.SET_SELECTED_VOTE](veto);
          this.$router.push({name: 'veto'});
        },
        ...mapActions([
          Actions.SET_SELECTED_VOTE,
        ])
    },
    mounted() {
      const originVotes = this.currentAccount.votes
      const allVotes = this.listVote;
      this.votes = _.map(originVotes, function(obj) {
        return _.assign(obj, _.find(allVotes, {pub_key: obj.vote}));
      });
    }
};
</script>
