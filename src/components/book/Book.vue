<template>
  <div class="book-container">
    <el-container>
      <el-header height="200px">
        <el-row class="title-row indent-20">
          <el-col :span="4" class="title">
            <faicon icon="book" size="lg"></faicon>
            <span class="title-text">小说详情</span>
          </el-col>
        </el-row>
        <el-row>
          <book-info v-bind="book" :intro-limit="180"></book-info>
        </el-row>
      </el-header>
      <el-header height="80px">
        <el-row>
          <div class="button-row">
            <el-col :span="6">
              <router-link
                :to="firstChapterLink()"
                tag="el-button"
                class="el-button--danger">
                <i class="el-icon-reading"/>
                开始阅读</router-link>
              <el-button type="warning" icon="el-icon-star-off">加入书架</el-button>
            </el-col>
            <el-col :span="3" class="stat-col">
              <div class="stat-title">追书人数</div>
              <div class="stat-value">{{lateFollower}}</div>
            </el-col>
            <el-col :span="3" class="stat-col">
              <div class="stat-title">读者存留率</div>
              <div class="stat-value">{{book.retentionRatio}}%</div>
            </el-col>
            <el-col :span="3" class="stat-col">
              <div class="stat-title">日更新字数</div>
              <div class="stat-value">{{book.serializeWordCount}}</div>
            </el-col>
            <el-col :span="3" class="stat-col">
              <div class="stat-title">最近更新</div>
              <div class="stat-value">{{book.updated | formatd}}</div>
            </el-col>
            <el-col :span="6" class="stat-col">
              <div class="stat-title">最新章节</div>
              <div class="stat-value">{{book.lastChapter}}</div>
            </el-col>
          </div>
        </el-row>
      </el-header>
      <el-row>
        <el-col :span="24">
          <div class="toc-container">
            <toc :bid="$route.params.id" @first-chapter="setFirstChapter"></toc>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>


<script>
import BookInfo from "../BookInfo.vue";
import toc from "./TOC.vue";
import { toHumanString } from "../../util/math";
import { formatDate } from "../../util/time";
export default {
  components: {
    BookInfo,
    toc
  },
  filters: {
    formatd(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  data() {
    return {
      book: {
        _id: ""
      },
      chapter: {}
    };
  },
  methods: {
    fixBookInfo() {
      this.book.shortIntro = this.book.longIntro;
      var cover = unescape(this.book.cover);
      this.book.cover = cover.replace("/agent/", "");
    },
    setFirstChapter(ch) {
      this.chapter = ch;
    },
    firstChapterLink() {
      let r = {
        path: "/reader/" + this.book._id + "/",
        query: {
          cid: this.chapter.id,
          order: this.chapter.order
        }
      };
      return r;
    }
  },
  created() {
    this.book._id = this.$route.params.id;
  },
  mounted() {
    let id = this.$route.params.id;
    let self = this;
    this.$axios.get(`/api/book/${id}`).then(res => {
      if (res.status === 200) {
        self.book = res.data;
        // fix book info
        self.fixBookInfo();
      }
    });
  },
  computed: {
    lateFollower() {
      return toHumanString(this.book.latelyFollower);
    }
  }
};
</script>

<style lang="stylus" scopedd>
.title-row
  border-bottom 1px solid #eeeeee
  padding 0 0 10px 0

.indent-20
  margin 0 20px

.title
  text-align left

  svg
    color #755928

  .title-text
    margin-left 10px
    font-size 20px
    font-weight bold
    color #755928

.book-container
  border 1px solid #eeeeee
  border-radius 10px
  padding 20px 0

.button-row
  text-align left
  padding-left 20px
  padding-top 20px

  .stat-col
    border-left 1px solid #eeee
    padding-left 5px

  .stat-title
    font-size 14px

  .stat-value
    margin-top 2px
    color red
    font-size 14px

.collect
  color red

.read
  color red

.toc-container
  margin 0 20px
</style>

