<template>
  <div id="app">
    <el-container>
      <el-header>
        <!--
        <div class="brand">
          <h1>
            <a href="/">
              VUE小说阅读器
            </a>
          </h1>
        </div>
        -->
        <div class="nav">
          <el-row>
            <el-col :span="18">
              <el-menu
                :default-active="activeIndex"
                class="el-menu"
                mode="horizontal"
                router
                @select="onMenuSelect"
              >
                <el-menu-item index="/home">
                  <faicon icon="home" size="lg"/>
                  <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/bookshelf">
                  <faicon icon="star" size="lg"/>
                  <span>书架</span>
                </el-menu-item>
                <el-menu-item index="/categories">
                  <faicon icon="th-large" size="lg"/>
                  <span>分类</span>
                </el-menu-item>
                <el-menu-item index="/rankings">
                  <faicon icon="sort-amount-down" size="lg"/>
                  <span>排行</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="6">
              <div class="right-corner">
              <search/>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
      <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
export default {
  name: "app",
  components: {
    Search
  },
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    onMenuSelect(idx) {
      console.log(idx);
    }
  }
};
</script>

<style lang="stylus">
*
  margin 0
  padding 0

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.el-menu-item
  span
    margin-left 4px
    font-size 16px

.right-corner
  border-bottom 1px solid #e6e6e6
  height 60px
</style>
