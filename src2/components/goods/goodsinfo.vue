<template>
	<div id="tmpl">
	  <!--1.0 商品轮播图-->
		<div class="silder">
		<silder :imgs="imgs"></silder>
		</div>

		<!--2.0 实现商品购买区-->
		<div id="buy">
			<h4 v-text="info.title"></h4>
			<p class="line"></p>
			<ul>
				<li class="price">
					市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
				</li>
				<li class="inputli">
					购买数量： <inputnumber v-on:dataobj="getcount" class="inputnumber"></inputnumber>
					<transition name="show"
					 @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
					>
						<div v-if="isshow" class="ball"></div>
					</transition>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
				</li>
			</ul>
		</div>

		<div id="params">
				<h6>商品参数</h6>
				<p class="line"></p>
			<ul>
				<li>商品货号：{{info.goods_no}}</li>
				<li>库存情况：{{info.stock_quantity}}</li>
				<li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
			</ul>
		</div>

		<!--3.0 图文详情-->
		<!--4.0 商品评论-->
		<div id="other">
			<router-link v-bind="{to:'/goods/goodsdesc/'+id}">
				<mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
			</router-link>
			<router-link v-bind="{to:'/goods/goodscomment/'+id}">
				<mt-button type="danger" size="large">商品评论</mt-button>
			</router-link>
		</div>
	</div>
</template>

<script>
	import silder from '../subcom/silder.vue';
	import common from '../../kits/common.js';
	import inputnumber from '../subcom/inputNumber.vue';
//	使用vm对象
	import {vm,COUNTSTR} from '../../kits/vm.js';
	import {setItem,valueObj} from '../../kits/localSg.js'

	export default{
		components:{silder,inputnumber},
		data(){
			return {
				isshow :false , //控制小球的显示状态
				inputNumberCount:1, //表示当前购买商品的数量
				id : 0,  //表示商品id
				imgs:[],
				info:{
//					"id": 87,
//					"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
//					"add_time": "2015-04-19T16:51:03.000Z",
//					"goods_no": "SD9102356032",
//					"stock_quantity": 60,
//					"market_price": 2499,
//					"sell_price": 2195
				}  // 存储商品的详细信息
			}
		},
		created(){
//			获取url传入的商品id值
			this.id = this.$route.params.id;
			this.getimgs();
			this.getinfo();
		},
		methods:{
//			动画3个方法
			beforeEnter(el){
//				设定小球的初始位置
				el.style.transform = "translate(0px,0px)";
			},
			enter(el,done){
//				保证小球出现动画
				el.offsetWidth;

//				设置小球的结束位置
				el.style.transform = "translate(75px,366px)";

//				结束动画
				done();
			},
			afterEnter(el){
//			重置小球的初始状态
				this.isshow = !this.isshow;
			},
//			加入购物车方法
			toshopcar(){
//				1.0 触发事件
				vm.$emit(COUNTSTR,this.inputNumberCount);
//				2.0 将数据保存到localStroage中
				valueObj.goodsid = this.id;
				valueObj.count = this.inputNumberCount;
				setItem(valueObj);

//				3.0 实现小球动画
				this.isshow = !this.isshow;
			},
//			获取inputnumber组件中传入的值
			getcount(count){
				this.inputNumberCount = count;
			},
//			1.0 获取商品详细描述
			getinfo(){
				var url = common.apidomain +'/api/goods/getinfo/'+this.id;
				this.$http.get(url).then(function(res){
					//判断状态
					this.info =res.body.message[0];
				});
			},
			getimgs(){
				var url  = common.apidomain + '/api/getthumimages/'+this.id;
				this.$http.get(url).then(function(res){
					//判断状态
				this.imgs =res.body.message;
				});
			}
		}
	}

</script>

<style scoped>
 .silder{
	 border:1px solid rgba(0,0,0,0.4);
	 border-radius: 5px;
	 margin: 5px;
 }

	#buy,#params,#other
	{
		margin: 5px;
		padding: 5px;
		border:1px solid rgba(0,0,0,0.4);
		border-radius: 5px;
	}
 .line{
		height: 1px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	#buy ul,#params ul{
		padding-left: 0px;
	}
 #buy h4{
	 color:#0094ff;
	padding: 5px;
 }
 #buy li,#params li{
	 list-style: none;
	 padding: 8px;
 }

	#buy .price span{
		color:red;
	}

	#other .imgdesc{
		margin-bottom: 20px;
	}
	.inputli{
		position: relative;
	}
	.inputnumber{
		position: absolute;
		left:100px;
		top:5px;
	}

	.ball{
		background-color: red;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		position: absolute;
		left:150px;
		top:10px;
		transition: all 0.4s ease;
		z-index: 100;
	}
</style>