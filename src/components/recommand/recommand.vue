<template>
  <div class="recommand">
		<scroll :data="discList" class="recommand-content" :click="true">
			<div>
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
									<img width="60" height="60" v-lazy="item.imgurl" alt="">
								</div>
								<div class="text">
									<h2 class="name">{{item.creator.name}}</h2>
									<p class="desc">{{item.dissname}}</p>
								</div>
							</li>
						</ul>
						<loading v-if="!discList.length"></loading>
				</div>
			</div>
		</scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommand, getDiscList } from 'api/recommand'
import { swiper } from 'vue-awesome-swiper'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import { ERR_OK } from 'api/config'

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
    scroll,
    loading,
  },
  created() {
    this.getSlides()
    this.getDiscList()
  },
  methods: {
    getSlides() {
      getRecommand().then((data) => {
        if (data.code === ERR_OK) {
          this.slidesData = data.data.slider
        }
      })
    },
    getDiscList() {
      getDiscList().then((data) => {
        // console.log(data)
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
	position fixed
	width 100%
	top 88px
	bottom 0
	.recommand-content
		height 100%
		overflow hidden
	.swiper-container
		.swiper-slide
			a
				width 100%
			img
				width 100%
		.swiper-pagination >>> .swiper-pagination-bullet-active
			background $color-text-ll
			width 16px
			border-radius: 4px
	.recommand-list
		h1
			height 40px
			line-height 40px
			text-align center
			color $color-theme
		.item
			display flex
			height 70px
			justify-content space-around
			.icon
				flex 1
				padding-left 20px
			.text
				display flex
				height 60px
				flex: 3
				flex-direction column
				justify-content space-around
				font-size $font-size-small
				.name
					color $color-text-ll
				.desc
					color $color-text-l

</style>
