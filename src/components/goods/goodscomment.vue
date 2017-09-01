<template>
	<div id="tmpl">
		<comment :id="id"></comment>
	</div>
</template>

<script>
	import comment from '../subcom/comment.vue';

	export default{
		components:{
			comment
		},
		data(){
			return {
				id :0 // 代表商品的id
			}
		},
		created(){
			this.id = this.$route.params.id;
		}
	}

</script>

<style scoped>

</style>