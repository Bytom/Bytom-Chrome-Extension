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
    margin-bottom: 20px;
    padding: 10px 15px;
    border-radius:4px;
    height: 300px;
    overflow: scroll;
}

.transfer-header{
  background: #035BD4;
}
.vote-item> td{
  padding: 12px 5px;
  border-bottom: 1px solid #F0F0F0;
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

  .bp{
    background: #F4FBE5;
    color: #91D303;
  }

  .stanbybp{
    background: #FFFAE5;
    color: #FFCC00;
  }

  .otherbp{
    background: #F2F3F4;
    color: #808A95;
  }
  .vote-role{
    width: 20px;
    height: 20px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 20px;
    text-align: center
  }

  .vote-label{
    font-size: 14px;
    padding: 20px;
    display:flex;
    border-bottom: 1px solid #F0F0F0;

  }

</style>

<template>
    <div class="warp-chlid bg-gray">
        <section class="header bg-header">
            <i class="iconfont icon-back" @click="close"></i>
            <p>{{ $t('listVote.title') }}</p>
        </section>

        <section class="my-vote transfer-header">
          <div>{{ $t('listVote.myVote') }}</div>
          <div class="vote-number">{{myVote}}</div>
          <div>{{ $t('listVote.totalVote')}} {{formatNue(totalVote)}}</div>
        </section>

        <section class="vote-container  bg-white">
          <div>
            <router-link :to="{name: 'voteRecord'}">
              voteRecord
            </router-link>
            <button>{{ $t('listVote.voteRules')}}</button>
            <router-link :to="{name: 'listCancel'}">
              {{ $t('listVote.cancelVote')}}
            </router-link>
          </div>
          <div class="vote-label color-black">
            <div>
              {{ $t('listVote.bp') }}
            </div>
            <div>{{ $t('listVote.standbyBP') }}</div>
            <div class="search-wrapper">
              <input type="text" v-model="search" placeholder="Search title.."/>
            </div>
          </div>
          <div class="vote-list">
            <table class="list accounts">
              <tr class="vote-item" v-for="(vote, index) in filteredList" :key="index">
                  <td>
                    <div :class="voteRole(vote.role)">
                      {{ vote.rank }}
                    </div>
                  </td>
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
                    <div class="vote-number">{{$t('listVote.votes')}} {{formatNue(vote.vote_num)}} ({{formatFraction(vote.vote_num, totalVote)}})</div>
                  </td>
                <td>
                  <button @click="openVote(vote)">
                    {{$t('listVote.vote')}}
                  </button>
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
import * as Actions from '@/store/constants';
import _ from 'lodash';

export default {
    components: {
    },
    data() {
        return {
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
        return (vote != null && vote != 0) ? Number.formatNue(vote, 8) : '0.00'
      },
      filteredList() {
        return this.listVote.filter(post => {
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
        'net',
      ])
    },
    watch: {

    },
    methods: {
        close: function () {
            this.$router.go(-1)
            },
        formatNue: function (nue) {
          return Number.formatNue(nue, 8);
        },
        formatFraction: function (upper, lower) {
          return Number.fractionalNum(upper, lower);
        },
        openVote: function(vote){
          this[Actions.SET_SELECTED_VOTE](vote);
          this.$router.push({name: 'vote'});
        },
        ...mapActions([
          Actions.SET_LIST_VOTE,
          Actions.SET_SELECTED_VOTE,
        ])
    },
    mounted() {
      query.chainStatus().then(resp => {
        if(resp){
          this.totalVote = resp.total_vote_num;
          const votes =  resp.consensus_nodes.map( (item, index) => {
            item.rank = index+1;
            return item
          });
          this[Actions.SET_LIST_VOTE](votes)
        }
      });
    }
};
</script>
