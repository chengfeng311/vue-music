<template>
  <scroll
    class="list-view"
    :data="list"
    ref="scroll"
    :listenScroll="listenScroll"
    :probeType="probeType"
    :click="needClick"
    @scroll="scroll">
    <ul>
        <li class="list-block" v-for="(item, index) in list" :key="index" ref="listBlock">
            <div class="title">{{item.title}}</div>
            <div class="singers" v-for="(ele, idx) in item.items" :key="idx" @click="selectSinger(ele)">
                <div class="sigle-singer" :data-id="ele.id">
                    <img :src="ele.avatar" alt="">
                    <span class="name">{{ele.name}}</span></div>
            </div>
        </li>
    </ul>
    <div class="fixed-title title" ref="fixedTitle" v-show="scrollY<0">{{curTitle}}</div>
    <ul class="letter-list">
        <li class="letter"
            :class="{'curIndex': curIndex == index}"
            v-for="(item, index) in letterList"
            :key="index"
            @touchstart.stop="onShortcutTouchStart(index, $event)"
            @touchmove.stop="onShortcutTouchMove($event)">
            {{item}}
        </li>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'

const LETTER_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      listenScroll: true,
      probeType: 3,
      needClick: true,
      curIndex: 0,
      scrollY: 0,
      diff: 0,
    }
  },
  created() {
    this.touches = {}
    this.heightList = []
  },
  methods: {
    // 点击右侧，左侧跳转到指定位置
    onShortcutTouchStart(index, event) {
      this.touches.y1 = event.touches[0].pageY
      this.curIndex = index
      this.touches.anchorIndex = index
      this._scrollTo(this.$refs.listBlock[index])
    },
    onShortcutTouchMove(event) {
      this.touches.y2 = event.touches[0].pageY
      const diff = Math.floor((this.touches.y2 - this.touches.y1) / LETTER_HEIGHT)
      const nowIndex = this.touches.anchorIndex + Number(diff)
      this._scrollTo(this.$refs.listBlock[nowIndex])
    },
    _scrollTo(index) {
      if (index < 0) {
        return
      } else if (index > this.list.length) {
        return
      }
      this.$refs.scroll.scrollToElement(index)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calculateHeight() {
      const heightList = []
      let height = 0
      heightList.push(height)
      this.$refs.listBlock.forEach((item) => {
        height += item.clientHeight
        heightList.push(height)
      })
      this.heightList = heightList
    },
    selectSinger(ele) {
      this.$emit('select', ele)
    },
  },
  computed: {
    letterList() {
      const letterList = []
      this.list.forEach((val) => {
        letterList.push(val.title.substr(0, 1))
      })
      return letterList
    },
    curTitle() {
      if (this.list.length) {
        return this.list[this.curIndex].title
      }
      return ''
    },
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    scrollY(val) {
      const newVal = -val
      if (newVal < 0 && newVal > this.heightList[this.heightList.length - 1]) {
        return
      }
      for (let i = 0; i < this.heightList.length - 1; i++) {
        const curHeight = this.heightList[i]
        const nextHeight = this.heightList[i + 1]
        if (newVal >= curHeight && newVal < nextHeight) {
          this.curIndex = i
          this.diff = nextHeight - newVal
        }
      }
    },
    diff(val) {
      const distance = val < TITLE_HEIGHT ? val - TITLE_HEIGHT : 0
      this.$refs.fixedTitle.style.transform = `translate3d(0, ${distance}px , 0)`
    },
  },
  components: {
    Scroll,
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.list-view
    color $color-text-l
    .fixed-title
        position absolute
        top 0
        left 0
        width 100%
        z-index 10
    .title
        line-height 30px
        padding-left 20px
        font-size $font-size-small-s
        background-color $color-highlight-background
    .sigle-singer
        display flex
        align-items center
        padding 20px 0 0 30px
        img
            display block
            width 40px
            height 40px
            border-radius: 50%
        .name
            line-height 40px
            margin-left 20px
            font-size $font-size-medium
    .letter-list
        position absolute
        right 0
        top 50%
        transform translateY(-50%)
        padding 20px 0
        width 20px
        border-radius 10px
        background-color $color-background-d
        .letter
            width 100%
            text-align center
            line-height 18px
            color $color-text-l
            font-size $font-size-small-s
        .curIndex
            color $color-theme
</style>
