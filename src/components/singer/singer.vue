<template>
  <div class="singer">
      <list-view :list="singerList" @select="selectSinger"></list-view>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import listView from 'base/list-view/list-view'
import { getSingerList } from 'api/singer'
import Singer from 'common/js/singer'
import { ERR_OK } from 'api/config'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  data() {
    return {
      singerList: [],
    }
  },
  created() {
    this.getSingerList()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER',
    }),
    getSingerList() {
      getSingerList().then((data) => {
        if (data.code === ERR_OK) {
          this.singerList = this._narmalizeData(data.data.list)
        }
      })
    },
    _narmalizeData(list) {
      const map = {}
      const hot = {
        title: HOT_NAME,
        items: [],
      }
      for (let i = 0; i < list.length; i++) {
        const ele = list[i]
        // 过滤首字母不是a-z的歌手
        if (!/[A-Z]/.test(ele.Findex)) {
          continue
        }
        // 热门歌手为前十个歌手
        i < HOT_SINGER_LEN && hot.items.push(new Singer({
          id: ele.Fsinger_mid,
          name: ele.Fsinger_name,
        }))
        // 先按首字母分类
        if (map[ele.Findex]) {
          map[ele.Findex].items.push(new Singer({
            id: ele.Fsinger_mid,
            name: ele.Fsinger_name,
          }))
        } else {
          map[ele.Findex] = {
            title: ele.Findex,
            items: [new Singer({
              id: ele.Fsinger_mid,
              name: ele.Fsinger_name,
            })],
          }
        }
      }
      // 再放进一个数组
      const ret = []
      Object.values(map).forEach((item) => {
        ret.push(item)
      })
      // 再按首字母排序
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      ret.unshift(hot)
      return ret
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`,
      })
      this.setSinger(singer)
    },
  },
  components: {
    listView,
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list-view
  position fixed
  width 100%
  top 88px
  bottom 0
  overflow hidden
</style>
