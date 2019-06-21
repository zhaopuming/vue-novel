<template>
  <div class="search">
    <input id="search-input" class="search-input" type="search" placeholder="搜索书名或作者">
    <a id="search-btn" class="search-btn">
        <faicon icon="search"></faicon>
    </a>
  </div>
</template>

<style lang="stylus">
.search
    position absolute
    right 10px
    bottom 10px
    width 300px
    height 40px
    border 1px solid #cab389
    .search-input
        width 240px
        height 100%
        line-height 40px
        padding-left 10px
        color #666
        border 0 none
        background-color #f2f2f2
        box-sizing border-box
    .search-btn
        float right
        width 60px
        height 40px
        line-height 40px
        background-color #cab389
        background-repeat no-repeat
        background-position center center
        cursor pointer
        text-align center
        color #f2f2f2
</style>
