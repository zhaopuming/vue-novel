<template>
  <router-link :to="'/book/'+_id" tag="div" class="book-info">
    <el-container>
      <el-aside width="100px">
        <img :src="cover" :alt="title" class="cover">
      </el-aside>
      <el-main>
        <h4 class="name">
          <span>{{title}}</span>
          <span class="status" :class="isSerial ? 'serial' : 'finished'">{{getStatus}}</span>
        </h4>
        <p class="desc" :title="shortIntro">{{getIntro}}</p>
        <p class="popularity">
          <span>{{author}}</span>
          <span class="split">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span class="c-red">{{getLatelyFollower}}</span>&nbsp;人气
        </p>
      </el-main>
    </el-container>
  </router-link>
</template>

<script>
import {toHumanString} from "../util/math.js"
export default {
  props: {
    title: String,
    author: String,
    _id: String,
    cover: String,
    isSerial: Boolean,
    majorCate: String,
    minorCate: String,
    latelyFollower: Number,
    shortIntro: {
      type: String,
      default: ''
    },
    introLimit: {
      type: Number,
      default: 60
    }
  },
  computed: {
    getStatus() {
      if (this.isSerial) {
        return "连载";
      } else {
        return "完结";
      }
    },
    getIntro() {
      if (this.shortIntro.length > this.introLimit) {
        return this.shortIntro.substr(0, this.introLimit) + "...";
      } else {
        return this.shortIntro;
      }
    },
    getLatelyFollower() {
      return toHumanString(this.latelyFollower)
    }
  },
  methods: {
    onClick() {
      console.log("On book info click");
    }
  }
};
</script>

<style lang="stylus" scoped>
div.book-info
  margin 15px
  padding 5px
  text-align left
  cursor pointer
  border 1px solid #fff

  .cover
    float left
    width 90px
    height 120px
    border 1px solid #ebebeb
    background-position center
    background-size 100%
    box-shadow 2px 4px 6px #bbb

  .el-main
    height 130px
    padding 0px 0px 0px 6px

    .name
      height 22px
      line-height 22px
      font-size 15px
      color #333 !important

      .status
        margin-left 10px
        font-size 12px

      .finished
        color red

      .serial
        color green

    .desc
      margin-top 10px
      height 40px
      line-height 20px
      font-size 12px
      color #999

    .popularity
      margin-top 30px
      height 20px
      font-size 14px

    .c-red
      color red
</style>


