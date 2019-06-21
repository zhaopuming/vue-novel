<template>
  <div>
    <div class="carousel">
      <el-carousel height="240px">
        <el-carousel-item v-for="(item, i) in recommends" :key="i">
          <img @click="viewBook(item.link)" :src="item.img" alt>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <div class="con" v-for="item in hotlists" :key="item.id">
        <hot-list :title="item.title" :id="item._id"></hot-list>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from "./HotList.vue";
export default {
  components: {
    HotList
  },
  data() {
    return {
      recommends: {},
      hotlists: {}
    };
  },
  created() {
    this.getbook();
  },
  methods: {
    getbook() {
      this.$axios
        .get("/api/recommendPage/node/spread/575f74f27a4a60dc78a435a3?pl=ios")
        .then(res => {
          if (res.data.ok) {
            this.recommends = res.data.data.slice(1, 5);
          }
        });

      // 首页分类数据
      this.$axios
        .get("/api/recommendPage/nodes/5910018c8094b1e228e5868f")
        .then(res => {
          var arr = res.data.data;
          if (res.data.ok) {
            //  this.booklist=this.imgurl(res.data.data.book)
            this.hotlists = arr.filter(item => {
              //  return arrs.includes(item.order!=2);
              return item.title != "m站顶部banner";
            });
          }
        });
    },
    viewBook(link) {
      console.log(link);
    }
  }
};
</script>

<style lang="stylus" scoped>
.carousel
  padding-top 10px
</style>
