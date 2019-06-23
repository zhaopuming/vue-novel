<template>
  <div>
    <el-container class="hotlist-container">
      <el-header height="30px">
        <el-row>
          <el-col :span="24">
            <p class="title"><faicon :icon="['far', 'bookmark']"></faicon>&nbsp;{{ title }}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-row v-for="item in booklist" :key="item.id">
        <el-col :span="12">
            <book-info v-bind="item[0]"></book-info>
        </el-col>
        <el-col :span="12">
            <div v-if="item.length == 2">
            <book-info v-bind="item[1]"></book-info>
            </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>



<script>

function makePair(list) {
    var res = []
    for (let i = 0; i < list.length; i = i+2) {
        var pair = [];
        pair[0] = list[i];
        if (i + 1 < list.length) {
            pair[1] = list[i+1]
        }
        res.push(pair)
    }
    return res
}

import BookInfo from "./BookInfo"

export default {
    components: {
        BookInfo
    },
  props: {
    title: String,
    id: String
  },
  data() {
    return {
      booklist: []
    };
  },
  created() {
    this.getHotList();
  },

  methods: {
    getHotList() {
      this.$axios.get(`/api/recommendPage/books/${this.id}`).then(res => {
        var data = res.data.data;
        if (res.data.ok) {
          this.booklist = data.map(item => {
            return item.book;
          });
          this.booklist = makePair(this.booklist)
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>

.el-header
    border-bottom 1px solid #eeeeee
.hotlist-container
  height: 400px
  margin-top 10px
  border 1px solid #cab389
  border-radius 10px
  padding 10px

  .title
    text-align left
    left 5px
    font-weight bold

div.book-info:hover
  border 1px solid #cab389
  border-radius 5px
  background-color #fef1dc


</style>

