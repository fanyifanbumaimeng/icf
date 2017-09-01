<template>
	<div id="tmpl">
	  <!--利用mui中的图文表格组件实现：
	  http://www.dcloud.io/hellomui/examples/slider-table-default.html
	  -->
		<div id="mui-content" class="mui-content" style="background-color:#fff">
			<ul class="mui-table-view mui-grid-view">
				<li v-for="item in list" class="mui-table-view-cell mui-media mui-col-xs-6">
					<router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
						<img class="mui-media-object" :src="item.img_url">
						<div class="mui-media-body" v-text="item.title"></div>
						<div class="desc">
							<p>
								<span>￥{{item.sell_price}}</span>
								<s>￥{{item.market_price}}</s>
							</p>
							<p>
									<h6 class="left">热卖中</h6>
									<h6 class="right">剩余{{item.stock_quantity}}件</h6>
							</p>
						</div>

					</router-link>

				</li>

			</ul>
		</div>
	</div>
</template>

<script>
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	// 代表vm
	export default{
		data(){
			return {
				list:[
				]
			}
		},
		created(){
		 this.getlist();
		},
		methods:{
			getlist(){
//				获取到商品列表数据
				let url = common.apidomain + '/api/getgoods?pageindex=1';

				this.$http.get(url).then((res)=>{
          let data = res.data
					if(data.status != 0 ){
						Toast(data.message);
						return;
					}
          //当服务器返回了正常数据的时候做赋值操作
					this.list = data.message;
				});
			}
		}
	}

</script>

<style scoped>
#mui-content li{
	border: 1px solid rgba(0,0,0,0.4);
	-webkit-box-shadow: 0 0 4px #000;
	-moz-box-shadow: 0 0 4px #000 ;
	box-shadow: 0 0 4px #000 ;
	margin-left: 4px;
	padding: 5px;
}

	#mui-content .mui-media-body{
		color: #0094ff;
	}

		#mui-content .desc{
			height: 60px;
			background-color: rgba(0,0,0,0.1);
			margin-top: 10px;
			padding: 5px;
			text-align: left;
		}
#mui-content .desc span{
	color: red;
	margin-right: 15px;
}
	#mui-content a{
		padding-left: 0px;
		margin-left: 0px;
	}

	#mui-content .desc .right{
		position: absolute;
		right: 10px;
		bottom: 0px;
	}

#mui-content .desc .left{
	position: absolute;
	left: 10px;
	bottom: 0px;
}

</style>
