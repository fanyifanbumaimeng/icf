<template>
	<div id="tmpl">
        <!--1.0 实现新闻详情-->
	   <div class="title">
		   <h4 v-text="info.title"></h4>
		   <p>{{ info.add_time | datefmt('YYYY-MM-DD') }}  {{info.click}}次浏览</p>
	   </div>
		<div id="content" v-html="info.content" ></div>

        <!--2.0 实现评论组件的集成-->
        <!--10.2 实现评论组件-->
        <comment :id = "id"></comment>
	</div>
</template>

<script>
    import common from '../../kits/common.js';
//    10.0 导入评论组件 comment.vue
    import comment from '../subcom/comment.vue';

	export default{
        components:{
            comment  // 10.1 注册评论组件
        },
        data(){
            return {
                id: 0,  // 传入的id值
                info: {
//                    "id": 13,
//                    "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
//                    "click": 1,
//                    "add_time": "2015-04-16T03:50:28.000Z",
//                    "content":"sdfsdf"}
                }
            }
        },
        created()
            {
//			1.0 获取url传入的id参数值赋值给data中的id属性
                this.id = this.$route.params.id;

//            2.0 请求服务器获取到这个id对应的详情数据对象
            this.getinfo();
            },
        methods:{
            getinfo(){
//                1.0 定义url
                let url = common.apidomain + '/api/getnew/'+this.id;

//                2.0 发出ajax请求获取数据
                this.$http.get(url).then((res)=>{
                    let data = res.data;
                    if(data.status != 0){
                        alert(data.message);
                        return;
                    }

//                    3.0 赋值
                    this.info = data.message[0];
                });
            }
        }
    }

</script>

<style scoped>
	.title h4{
		color: #0094ff;
	}
	.title p{
		color:rgba(0,0,0,0.5);
	}

	.title,#content{
		padding: 5px;
	}

</style>
