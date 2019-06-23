<template>
  <div>
    <el-container class="book-toc">
      <el-header height="40px">
        <el-row class="title-row">
          <el-col :span="4" class="title">
            <faicon icon="list" size="lg"></faicon>
            <span class="title-text">章节目录</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row v-for="(ch, idx) in chapters" :key="ch.order" class="chapters-list">
          <el-col :span="8" v-if="ch.length > 0">
            <router-link :to="routerLink(idx, 0)">{{ch[0].title}}</router-link>
          </el-col>
          <el-col :span="8" v-if="ch.length > 1">
            <router-link :to="routerLink(idx, 1)">{{ch[1].title}}</router-link>
          </el-col>
          <el-col :span="8" v-if="ch.length > 2">
            <router-link :to="routerLink(idx, 2)">{{ch[2].title}}</router-link>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { doCompact } from "../../util/array";
export default {
  props: {
    bid: String
  },
  data() {
    return {
      chapters: []
    };
  },
  created() {},
  mounted() {
    this.getTOC();
  },
  methods: {
    routerLink(idx, subidx) {
      let r = {
        path: "/reader/" + this.bid + '/',
        query: {
          cid: this.chapters[idx][subidx].id,
          order: this.chapters[idx][subidx].order
        }
      };
      return r;
    },
    getLink(lnk) {
      let url = "/content/chapter/" + escape(lnk);
      return url;
    },
    getTOC() {
      let summaryUrl = `/api/btoc/?view=summary&book=${this.bid}`;
      let self = this;
      this.$axios.get(summaryUrl).then(res => {
        let url = `/api/btoc/${res.data[0]._id}?view=chapters&channel=mweb`;
        self.$axios.get(url).then(r => {
          for (let item of r.data.chapters) {
            var ch = {};
            ch.order = item.order;
            ch.title = item.title;
            ch.id = item.id;
            ch.link = item.link;
            ch.isVip = item.isVip;
            self.chapters.push(ch);
          }
          self.$emit('first-chapter', self.chapters[0])
          self.chapters = doCompact(self.chapters, 3);
        });
      });
    }
  },
};
</script>

<style lang="stylus" scoped>
.title-row
  border-bottom 1px solid #eeeeee
  padding 0 0 10px 0

.book-toc
  margin-top 40px

  .title
    text-align left

    .title-text
      margin-left 10px
      font-size 20px
      font-weight bold
      color #755928

.chapters-list
  text-align left
  margin-bottom 5px

  a
    text-decoration none
    font-size 14px
    color #666

    &:active
      color #eee

    &:hover
      color #999

    &:visited
      color #999
</style>

