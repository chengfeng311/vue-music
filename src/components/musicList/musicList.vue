<template>
  <div class="music-list">
    <div class="header-pic"></div>
    <div class="title">{{title}}</div>
    <div class="back" @click="back">
      <div class="icon-back"></div>
    </div>
    <scroll class="list">
      <ul>
        <li>
          <div class="name"></div>
          <div class="author"></div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from 'base/scroll/scroll'

export default {
  props: {
    title: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {

    }
  },
  components: {
    scroll,
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.music-list
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  overflow hidden
  background $color-background
  .header-pic
    position relative
    width 100%
    padding-top 70%
  .title
    position absolute
    left 50px
    right 50px
    top 0
    height 48px
    line-height 48px
    text-align center
    color: #fff
  .back
    position absolute
    left 6px
    top 0
    padding 6px
    z-index 50
    div
      padding 10px
      font-size $font-size-large-x
</style>
