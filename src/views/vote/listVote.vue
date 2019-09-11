<style lang="" scoped>
.header {
  display: flex;
}
.header p{
  text-align: center;
  width: 281px;
  padding-top: 17px;
}
.my-vote {
  height: 115px;
    padding: 15px;
  display: flex;
  text-align: center;
  flex-direction: column;
  font-size:14px;
}

.my-vote .vote-number{
  font-size: 28px;
  padding: 10px 0 5px;
}

.vote-list {
    padding: 0px 15px 10px;
    border-radius:4px;
    height: 300px;
    overflow: scroll;
}

.vote-item> td{
  padding: 12px 2px;
  border-bottom: 1px solid #F0F0F0;
}
  .vote-item img{
    height: 54px;
    width: 54px;
    border:1px solid #E0E0E0;
    opacity:1;
    border-radius:4px;
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
    color: white;
    background: #91D303;
  }

  .stanbybp{
    color: white;
    background: #FFCC00;
  }

  .otherbp{
    color: white;
    background: #C4C4C4;
  }
  .vote-role{
    width: 20px;
    height: 20px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 20px;
    text-align: center
  }

  .outer-dot{
    width: 16px;
    height: 16px;

    position:relative;
    border-radius: 9px;
  }

  .inner-dot{
    position: absolute;
    width: 6px;
    height: 6px;
    left: 5px;
    top: 5px;
    border-radius: 3px;
  }

  .vote-label{
    font-size: 12px;
    padding: 0px 20px 5px;
    display:flex;
  }

  .bg-image{
    height: 188px;
  }

  .button-container{
    display: flex;
    font-size: 14px;
    margin: 20px;
  }

  .button-container a:nth-child(2){
    flex: 1;
    margin-left: 20px;
  }

  .btn-vote{
    width: 72px;
    height: 32px;
    border: 1px solid #035BD4;
    box-sizing: border-box;
    border-radius: 2px;
    color: #035BD4;
    font-size:14px;
    background: white;
    padding: 0;
  }

  .v-label{
    display: flex;
    align-items: center;
    margin-right:5px;
  }

  .v-icon{
    margin-right: 5px;
  }

  .bp-icon .outer-dot{
    background: rgba(145, 211, 3, 0.1);
  }
  .bp-icon .inner-dot{
    background: #91D303;
  }

  .stanbybp-icon .outer-dot{
    background: rgba(255, 204, 0, 0.1);
  }
 .stanbybp-icon .inner-dot{
    background: #FFCC00;
  }

  .search-wrapper input{
    margin-left: 5px;
    background: url('../../assets/img/icon/search.svg') top 3px left 2px no-repeat;
    padding-left: 27px;
    width: 118px;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-sizing: border-box;
    border-radius: 100px;
    line-height: 32px;
  }

  .list{
    width: 100%;
  }

  .node-label{
    width: 160px;
  }
</style>

<template>
    <div class="warp-chlid bg-white">

        <section class="bg-image">
          <div class="header">
              <i class="iconfont icon-back" @click="close"></i>
              <p>{{ $t('listVote.title') }}</p>
          </div>
          <div class="my-vote">
            <div class="color-grey">{{ $t('listVote.myVote') }}</div>
            <div class="vote-number">{{myVote}}</div>
            <div class="color-grey">{{ $t('listVote.totalVote')}} {{formatNue(totalVote)}}</div>
          </div>
        </section>

        <section class="vote-container  bg-white">
          <div class="button-container">
            <router-link class="color-black" :to="{name: 'voteRecord'}">
              <div>{{$t('listVote.voteRecord')}}</div>
            </router-link>
            <router-link class="color-black" :to="{name: 'voteRegulation'}">
              <div>{{ $t('listVote.voteRules')}}</div>
            </router-link>
            <router-link class="color-grey" :to="{name: 'listCancel'}">
              <div>{{ $t('listVote.cancelVote')}}</div>
            </router-link>
          </div>
          <div class="vote-label color-black">
            <div class="v-label">
              <div class="v-icon bp-icon">
                <div class="outer-dot">
                  <div class="inner-dot"></div>
                </div>
              </div>
              <div>{{ $t('listVote.bp') }}</div>
            </div>
            <div class="v-label">
              <div class="v-icon stanbybp-icon">
                <div class="outer-dot">
                  <div class="inner-dot"></div>
                </div>
              </div>
              <div>{{ $t('listVote.standbyBP') }}</div>
            </div>
            <div class="search-wrapper">
              <input type="text" v-model="search" :placeholder="$t('listVote.bpName')"/>
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
                  <td>
                    <img  :src="vote.logo || defaultUrlImg" alt="">
                  </td>
                  <td class="node-label">
                    <div class="vote-title" >
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
                <td class="text-align-right">
                  <button class="btn btn-vote" @click="openVote(vote)">
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
import image from '@/assets/img/icon/node-default.svg';

export default {
    components: {
    },
    data() {
        return {
          defaultUrlImg:image,
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
        return (vote != null && vote != 0) ? Number.formatNue(vote,0, 8) : '0.00'
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
          return Number.formatNue(nue,0, 8);
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
