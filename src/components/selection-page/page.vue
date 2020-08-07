<template>
    <div>
        <label class="select-item font-bold" v-for="option in options"  :for="option.label">
          {{option.label}}
          <input type="radio" :id="option.label" :name="option.label" :value="option.value" @change="onChange" :checked="(option.value == value)">
        </label><br>
    </div>
</template>

<script>
export default {
    props: {
      title: "",
      value: {
        default: null
      },
      options: {
        type: Array,
        default() {
          return []
        },
      },
      onChange: {
        type: Function,
        default: function (val) {
          this.$emit('input', val)
        }
      },
    },
};
</script>

<style scoped>
.select-item {
  width: calc( 100% - 32px);
  background: #FFFFFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.88);
  font-size:15px;
}
</style>
