<template>
  <div class="recommand">
		<swiper :options="swiperOption">
			<div class="swiper-slide" v-for="(item, index) in slidesData" :key="index">
				<a :href="item.linkUrl"><img :src="item.picUrl"></a>
			</div>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<div class="recommand-list">
			<h1 class="list-title">热门歌单推荐</h1>
			<ul>
				<li class="item" v-for="(item, index) in discList" :key="index">
					<div class="icon">
						<img width="60" height="60" :src="item.imgurl" alt="">
					</div>
					<div class="text">
						<h2 class="name">{{item.creator.name}}</h2>
						<p class="desc">{{item.dissname}}</p>
					</div>
				</li>
			</ul>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommand, getDiscList } from 'api/recommand'
import { swiper } from 'vue-awesome-swiper'

const ERR_OK = 0

export default {
  data() {
    return {
      slidesData: [],
      discList: [],
      swiperOption: {
        autoplay: true,
        delay: 1000,
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },
  components: {
    swiper,
  },
  created() {
    this.getRecommand()
    this.getDiscList()
  },
  methods: {
    getRecommand() {
      getRecommand().then((data) => {
        if (data.code === ERR_OK) {
          this.slidesData = data.data.slider
        }
      })
    },
    getDiscList() {
      getDiscList().then((data) => {
        console.log(data)
        if (data.code === ERR_OK) {
          this.discList = data.data.list
        }
      })
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.recommand
	.swiper-container
		.swiper-slide
			a
				width 100%
			img
				width 100%
		.swiper-pagination >>> .swiper-pagination-bullet-active
			background $color-text-ll
	.recommand-list
		h1
			height 40px
			line-height 40px
			text-align center
			color $color-theme
		.item
			display flex
			justify-content space-around
			.icon
				flex 1
				padding-left 20px
			.text
				display flex
				flex: 3
				flex-direction column
				justify-content space-around
				font-size $font-size-small
				.name
					color $color-text-ll
				.desc
					color $color-text-l

</style>
