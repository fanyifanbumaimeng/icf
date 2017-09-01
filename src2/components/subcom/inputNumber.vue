<template>
	<div id="subtmpl">
		<div class="inleft div" @click="substrict">-</div>
		<div class="incenter div" v-text="count"></div>
		<div class="inright div"  @click="add">+</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				count :1 //代表购买商品的数量
			}
		},
		methods:{
			substrict(){
				this.count--;
//				确保最小值为1
				if(this.count <1){
					this.count = 1;
				}
				this.sendmessage();
			},
			add(){
				this.count++;
				this.sendmessage();
			},
			sendmessage(){
				this.$emit('dataobj',this.count);
			}
		}
	}

</script>

<style scoped>
	#subtmpl .div{
		width: 40px;
		height: 25px;
		line-height: 25px;
		border: 1px solid #000;
		display: inline-block;
		text-align: center;
	}

</style>