<template>
  <div class="color-selector-container">
    <span
      v-for="(c,i) in candidateColors"
      :key="i"
      :class="'color-selector color-' + i"
      @click="selectColor(i)"
      :style="'background-color:'+c"
    >
      <faicon icon="check"></faicon>
    </span>
  </div>
</template>

<script>
export default {
  props: ["value", "candidateColors"],
  mounted() {
      this.setActiveTheme('0')
  },
  watch: {
    value() {
      this.setActiveTheme(this.value);
    }
  },
  methods: {
    selectColor(color) {
      this.$emit("input", color);
    },
    setActiveTheme(n) {
      for (let item of this.$el.getElementsByClassName("color-selector")) {
        item.classList.remove("active");
      }
      for (let item of this.$el.getElementsByClassName("color-" + this.value)) {
        item.classList.add("active");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.color-selector-container
  background-color #fff

  .color-selector
    width 34px
    height 34px
    line-height 32px
    text-align center
    margin-right 16px
    background-color #777
    border 1px solid rgba(0, 0, 0, 0.1)
    border-radius 100%
    display inline-block
    cursor pointer
    color #ed4260

    svg
      opacity 0

  .color-selector.active
    border-color #ed4260

    svg
      opacity 1

/*
  .color-0
    background-color #e9e6d0

  .color-1
    background-color #f7edd4

  .color-2
    background-color #eaf4e9

  .color-3
    background-color #e9f4f6

  .color-4
    background-color #f7e9e8

  .color-5
    background-color #e6e6e6
    */
</style>


