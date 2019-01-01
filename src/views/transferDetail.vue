<style lang="" scoped>
.header {
    height: 150px;
}

.preview i {
    width: 100px;
    margin: 0 auto;
    display: block;
    width: 45px;
    font-size: 45px;
    margin-bottom: 25px;
}
.preview .value {
    font-size: 30px;
    width: 300px;
    margin: 0 auto;
    text-align: center;
}
.preview .value span {
    font-size: 18px;
}

.title {
    font-size: 18px;
    font-weight: inherit;
    color: #cacaca;
    text-align: center;
    padding: 5px 0;
}
.transcation {
    padding: 0 30px;
    font-size: 15px;
    word-break: break-all;
    height: 415px;
    width: 300px;
    margin-top: 20px;
}
.transcation .time {
    margin: 10px 0;
    font-size: 15px;
}
.transcation .label {
    font-size: 12px;
}
.transcation .info {
    font-size: 18px;
    display: inline-flex;
}
.transcation .info section {
    margin-right: 30px;
    width: 80px;
}
.transcation .txid {
    margin-top: 20px;
}
.transcation .inputs {
    margin-top: 10px;
}
.transcation .outputs {
    margin-top: 10px;
    margin-bottom: 30px;
}
</style>

<template>
    <div class="bg-black warp-chlid">
        <section class="header bg-green">
            <i class="iconfont icon-back" @click="$router.go(-1)"></i>
            <div class="preview">
                <i class="iconfont icon-ios-checkmark-circle color-black"></i>
                <p class="value">{{transcation.direct}}{{transcation.val}}<span>BTM</span></p>
            </div>
        </section>

        <h3 class="title bg-gray">{{ $t('transcationDetail.title') }}</h3>
        <section>
            <vue-scroll>
                <div class="transcation">
                    <p v-if="transcation.is_confirmed" class="time">{{transcation.block_timestamp | moment}}</p>
                    <p v-else class="time">{{transcation.submission_timestamp | moment}}</p>
                    <div class="info">
                        <section>
                            <p class="label">{{ $t('transcationDetail.fee') }}(BTM)</p>
                            <p>{{transcation.fee}}</p>
                        </section>
                        <section>
                            <p class="label">{{ $t('transcationDetail.blockHeight') }}</p>
                            <p v-if="transcation.block_height != undefined">{{transcation.block_height}}</p>
                            <p v-else>-</p>
                        </section>
                        <section>
                            <p class="label">{{ $t('transcationDetail.blockSize') }}</p>
                            <p>{{transcation.size}}</p>
                        </section>
                    </div>
                    <div class="txid">
                        <p class="label">{{ $t('transcationDetail.transcationID') }}</p>
                        <p>{{transcation.hash}}</p>
                    </div>
                    <div class="inputs">
                        <section :key="index" v-for="(input, index) in transcation.inputs">
                            <p class="label">{{ $t('transcationDetail.sendAddress') }}{{transcation.inputs.length > 1 ? index+1 : ''}}</p>
                            <p>{{input.address}}<span v-if="input.address == selfAddress"> {{ $t('transcationDetail.myAddress') }}</span></p>
                        </section>
                    </div>
                    <div class="outputs">
                        <section :key="index" v-for="(output, index) in transcation.outputs">
                            <p class="label">{{ $t('transcationDetail.receiveAddress') }}{{transcation.outputs.length > 1 ? index+1 : ''}}</p>
                            <p>{{output.address}}<span v-if="output.address == selfAddress"> {{ $t('transcationDetail.myAddress') }}</span></p>
                        </section>
                    </div>
                </div>
            </vue-scroll>
        </section>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            selfAddress: "",
            transcation: {
                guid: "",
                to: "",
                amount: 0,
                fee: ""
            }
        };
    },
    methods: {
    },
    mounted() {
        let params = this.$route.params;

        this.transcation = params.transcation;
        this.selfAddress = params.address;
    }
};
</script>