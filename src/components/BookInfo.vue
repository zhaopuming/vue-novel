<template>
  <div class="book-info">
    <el-container>
      <el-aside width="100px">
        <img :src="cover" :alt="title" class="cover">
      </el-aside>
      <el-main>
        <h4 class="name">
          <span>{{title}}</span>
          <span class="tag-noSerial">{{getStatus}}</span>
        </h4>
        <p class="desc" :tooltip="shortIntro">{{getIntro}}</p>
        <p class="popularity">
          <span>{{author}}</span>
          <span class="split">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span class="c-red">{{latelyFollower}}</span>&nbsp;人气
        </p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
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
    shortIntro: String,
  },
  computed: {
    getStatus() {
      return "完结";
    },
    getIntro() {
        if (this.shortIntro.length > 60) {
            return this.shortIntro.substr(0, 60) + "..."
        } else {
            return this.shortIntro;
        }
    }
  }
};
</script>

<style lang="stylus">
div.book-info
  padding 20px 20px 20px 20px
  text-align left

  .cover
    float left
    width 90px
    height 120px
    border 1px solid #ebebeb
    background-position center
    background-size 100%
    box-shadow 2px 4px 6px #bbb

  .el-main
    height 120px
    padding 0px 0px 0px 6px

    .name
      height 22px
      line-height 22px
      font-size 15px
      color #333 !important

    .desc
      margin-top 10px
      height 40px
      line-height 20px
      font-size 12px
      color #999

    .popularity
      margin-top 20px
      height 20px
      font-size 14px
    
    .c-red
      color red
</style>


