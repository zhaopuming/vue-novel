<template>
  <el-container>
    <el-aside width="62px">
      <div id="side-bar" class="side-bar">
        <dl>
          <dd @click="goToBook" title="书页">
            <faicon icon="book" size="lg"></faicon>
          </dd>
          <dd @click="openTOC" title="目录">
            <faicon icon="list" size="lg" slot="reference"></faicon>
          </dd>
          <dd @click="config" title="设置">
            <faicon icon="cog" size="lg"></faicon>
          </dd>
        </dl>
      </div>
    </el-aside>
    <el-main id="reader-main">
      <el-container>
        <el-header height="50px" class="reader-header">
          <el-row class>
            <el-col :span="4" class="reader-prev">
              <a @click="readPrev">
                <faicon icon="arrow-left"></faicon>
                <span>上一章</span>
              </a>
            </el-col>
            <el-col :span="16" class="reader-book-title">{{bookTitle}}</el-col>
            <el-col :span="4" class="reader-next">
              <a @click="readNext">
                <span>下一章</span>
                <faicon icon="arrow-right"></faicon>
              </a>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="reader-main content-box">
          <el-row>
            <el-col :span="24" class="reader-chapter-title">{{chapterTitle}}</el-col>
          </el-row>
          <el-row class>
            <el-col :span="24" class="reader-content-pane">
              <p class="reader-content-line" v-for="(ln,i) in content" :key="i">{{ln}}</p>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-main>
    <el-dialog :title="bookTitle" :visible.sync="tocDialogVisible" width="50%" center>
      <dl class="toc-list">
        <dd @click="goByOrder(item.order);tocDialogVisible=false;" v-for="item in chapters" :key="item.order">
            <span>{{item.title}}</span>
        </dd>
      </dl>
    </el-dialog>
  </el-container>
</template>

<script>
import { doCompact } from "../../util/array";
export default {
  components: {},
  data() {
    return {
      bid: "",
      cid: "",
      order: "",
      bookTitle: "",
      chapterTitle: "",
      chapters: [],
      content: [],
      link: "",
      chapter: {},
      tocDialogVisible: false
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.bid = this.$route.params.id;
    this.cid = this.$route.query.cid;
    this.order = this.$route.query.order;
    this.getTOC();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  beforeRouteUpdate(to, from, next) {
    this.readByOrder(to.query.order);
    next();
  },
  methods: {
    getTOC() {
      let summaryUrl = `/api/btoc/?view=summary&book=${this.bid}`;
      let self = this;
      this.$axios.get(summaryUrl).then(res => {
        let url = `/api/btoc/${res.data[0]._id}?view=chapters&channel=mweb`;
        self.$axios.get(url).then(r => {
          self.bookTitle = r.data.bookName;
          for (let item of r.data.chapters) {
            if (self.cid == item.id && self.order == item.order) {
              self.link = item.link;
              self.getContent();
            }
            var ch = {};
            ch.order = item.order;
            ch.title = item.title;
            ch.id = item.id;
            ch.link = item.link;
            ch.isVip = item.isVip;
            self.chapters.push(ch);
            self.chapter = item;
          }
          self.$emit("first-chapter", self.chapters[0]);
        });
      });
    },
    getContent() {
      let lnk = this.link;
      let url = "/content/chapter/" + escape(lnk);
      let self = this;
      this.$axios.get(url).then(res => {
        let ch = res.data.chapter;
        if (!ch.isVip) {
          self.content = ch.cpContent.split("\n");
          self.chapterTitle = ch.title;
          self.order = ch.order;
        } else {
          self.content = ch.body.split("\n");
          self.chapterTitle = ch.title;
          self.order = ch.order;
        }
      });
    },
    readPrev() {
      let ord = parseInt(this.order) - 1;
      if (ord < 1) ord = 1;
      this.goByOrder(ord);
    },
    readNext() {
      let ord = parseInt(this.order) + 1;
      if (ord > this.chapters.length) ord = this.chapters.length;
      this.goByOrder(ord);
    },
    readByOrder(ord) {
      let item = this.chapters[ord - 1];
      this.link = item.link;
      this.cid = item.id;
      this.order = item.order;
      this.getContent();
    },
    goByOrder(ord) {
      console.log("going to order:", ord);
      let item = this.chapters[ord - 1];
      this.$router.push({
        path: "/reader/" + this.bid + "/",
        query: {
          cid: item.id,
          order: item.order
        }
      });
    },
    goToBook() {
      this.$router.push({
        path: "/book/" + this.bid + "/"
      });
    },
    openTOC() {
      this.tocDialogVisible = true;
    },
    config() {},
    handleScroll() {
      var scrollHeight = document.scrollingElement.scrollTop;
      var el = document.getElementById("side-bar");
      if (scrollHeight < 100) {
        el.style.top = 80 - scrollHeight + "px";
      } else {
        el.style.top = "-20px";
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
bgColor = #e9e6d0
bgHlColor = #faf7e1
bdColor = #cab389

.side-bar
  position fixed
  margin-top 20px

  dl
    border 1px solid bdColor
    border-bottom 0

    dd
      width 60px
      height 60px
      line-height 60px
      text-align center
      background-color bgColor
      border-bottom 1px solid bdColor
      cursor pointer

      &:hover
        background-color bgHlColor
        color #999

.reader-header
  border 1px solid bdColor
  background-color bgColor
  line-height 50px

.content-box
  border 1px solid bdColor
  padding 20px
  background-color bgColor

.reader-main
  margin-top 10px

.reader-title
  text-align right
  font-weight bold
  font-size 20px

.reader-book-title
  text-align center
  font-size 18px

.reader-chapter-title
  text-align center
  font-size 20px
  font-weight bold

.reader-content-pane
  padding 10px

.reader-content-line
  text-align left
  margin-top 10px
  font-size 18px

.reader-prev
  text-align left
  cursor pointer

  span
    margin-left 5px

.reader-next
  text-align next
  cursor pointer

  span
    margin-right 5px

.toc-popper
  width 800px
  background-color bgColor

.toc-list
  overflow-y scroll
  max-height 600px

  dd
    border-bottom 1px solid #eee
    line-height 40px
    height 40px
    padding 0 20px
    cursor pointer
    &:hover
        color #999
        background-color #eee
</style>

