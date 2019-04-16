<template>
    <transition name="slide">
      <music-list :title="singer.name"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import musicList from 'components/musicList/musicList'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['singer']),
  },
  mounted() {
    if (!this.singer.id) {
      this.$router.push('/singer')
    }
  },
  components: {
    musicList,
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)


</style>
