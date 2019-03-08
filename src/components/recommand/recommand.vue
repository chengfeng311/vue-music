<template>
  <div class="recommand">
      推荐
  </div>
</template>

<script type="text/ecmascript-6">
import getRecommand from 'api/recommand'

export default {
	data() {
		return {
			recommandData: [],
		}
	},
	components: {

	},
	created() {
		getRecommand().then((data) => {
			console.log(data)
		})
	},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
