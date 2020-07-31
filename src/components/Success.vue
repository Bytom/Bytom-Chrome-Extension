<template>
    <section class="v-success" :class="{'show':alerts.length}">
        <section class="box" v-if="alerts.length">
            <section class="head">
              <div class="icon icon-success">
              </div>
                <h2 class="header">{{alerts[0].header}}</h2>
                <p class="sub-header">
                    {{(alerts[0].description)}}
                </p>
            </section>
            <section class="body">
                <a class="btn btn-primary" @click="cancel">{{ $t('welcome.enterMain') }}</a>
            </section>
        </section>

    </section>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '@/store/constants';

    export default {
        data() { return {
        }},
        computed: {
            ...mapState([
                'alerts'
            ])
        },
        methods: {
            cancel(){
                this.$router.push('/');
                this[Actions.PULL_ALERT]();
            },
            ...mapActions([
                Actions.PULL_ALERT,
            ])
        },
    };
</script>

<style lang="scss">
    .v-success {
        position:fixed;
        top:0; bottom:0;
        left:0; right:0;
        background:rgba(73, 73, 73, 0);
        opacity:0;
        visibility: hidden;
        padding:20px;
        transition:all 0.2s ease;
        transition-property: background, opacity, visibility;
        z-index:9999;

      .icon{
        width: 80px;
        height: 80px;
        margin: 0px auto 40px;
      }
      .icon-success{
        background-image: url('../assets/img/icon/success.svg');
      }

        &.show {
            visibility:visible;
            opacity:1;
            background:white;
        }

        .box {
            max-width: 420px;
            margin: 0 auto;
            right:20px;
            left:20px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);

            .head {
                display:flex;
                flex-direction: column;
                justify-content: center;
                text-align:center;

                .header {
                  font-weight: 600;
                  font-size: 28px;
                  color: rgba(0, 0, 0, 0.88);
                  padding-bottom:10px;
                }

                .sub-header {
                  font-size: 13px;
                  /* Text / Dark-Minor */
                  color: rgba(0, 0, 0, 0.36);
                }
            }

            .body {
                padding:15px;
                .btn{
                  width: 145px;
                  height: 41px;
                  border-radius: 22px;
                  font-size: 15px;
                  padding: 10px;
                  margin: auto;
                  display: block;
                }
            }

        }
    }
</style>
