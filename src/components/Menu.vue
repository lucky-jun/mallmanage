<template>
    <div id="menu">
        <el-container>
            <!--侧边栏区域-->
            <el-aside width="200px">
                <!--
                1、
                el-menu
                :default-active="this.$router.path"         //路由跳转,this.$router.path可换成具体地址，与下方index一致，即可打开相应的默认地址
                router>										//写上router
                <el-menu-item index="/main">		        //在需要跳转的index加 跳转的地址
                2、在router中的地址添加children的路由地址
                 {
                    path: '/menu',
                    // name: 'Home',
                    component: Menu,
                    children:[
                      {
                        path: '/order',
                        // name: 'Home',
                        component: Orders
                      },
                    ]
                  },
                  ==================================================================
                  @click="handleDelete(scope.i n d e x , s c o p e . r o w ) "
                  这 个 点 击 方 法 里 面 的 s c o p e . index, scope.row)" 这个点击方法里面的scope.index,scope.row)"
                  这个点击方法里面的scope.index就是当前行的索引，
                  scope.row可以拿到当前行的数据，如果想要传参给后台，就可以使用这两个数据，
                  ==================================================================

                  ==================================================================
                -->
                <el-menu
                        default-active="/index"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        router
                >
                    <!--logo-->
                    <el-menu-item index="/index" d>
<!--                        <img src="https://img10.360buyimg.com/img/jfs/t1/159353/17/2928/457625/5ffd107fE2b4a7a10/e0ab266497850f64.gif"-->
                        <img src="@/assets/Logo.png"
                            height="100%"
                             width="100%"
                        ></img>
                    </el-menu-item>
                    <!--首页-->
                    <el-menu-item index="/index" d>
                        <i class="el-icon-s-home"></i>
                        <span>首页</span>
                    </el-menu-item>
                    <!--商品管理-->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
<!--                            <template slot="title">添加商品</template>-->
                            <el-menu-item index="/goodsAll">全部商品</el-menu-item>
                            <el-menu-item index="/addNewGoods">添加新商品</el-menu-item>
<!--                            <el-menu-item index="1-3">添加商品库存</el-menu-item>-->
                        </el-menu-item-group>
<!--                        <el-menu-item-group>-->
<!--&lt;!&ndash;                        <el-menu-item-group title="商品信息修改">&ndash;&gt;-->
<!--                            <el-menu-item index="1-4">修改商品信息</el-menu-item>-->
<!--                        </el-menu-item-group>-->
<!--                        <el-submenu index="1-5">-->
<!--                            <template slot="title">商品上下架</template>-->
<!--                            <el-menu-item index="1-5-1">全部商品</el-menu-item>-->
<!--                        </el-submenu>-->
                    </el-submenu>
                    <!--订单管理-->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">未完成订单</template>
                            <el-menu-item index="/order">正在进行的订单</el-menu-item>
<!--                            <el-menu-item index="3-2">未支付订单</el-menu-item>-->
<!--                            <el-menu-item index="3-3">等待发货订单</el-menu-item>-->
<!--                            <el-menu-item index="3-4">等待收货订单</el-menu-item>-->
<!--                            <el-menu-item index="3-5">问题订单</el-menu-item>-->
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">全部订单</template>
                            <el-menu-item index="/historyOrders">全部订单</el-menu-item>
                        </el-menu-item-group>
<!--                        <el-menu-item-group title="商品信息修改">-->
<!--                            <el-menu-item index="1-3">修改商品信息</el-menu-item>-->
<!--                        </el-menu-item-group>-->
<!--                        <el-submenu index="1-4">-->
<!--                            <template slot="title">商品优惠信息</template>-->
<!--                            <el-menu-item index="1-4-1">商品促销</el-menu-item>-->
<!--                        </el-submenu>-->
                    </el-submenu>
                    <!--管理员界面 - 员工管理-->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span>admin - 员工管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/employeeManage">全部员工信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--用户管理 employeeManage-->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>admin - 用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/userManage">全部员工信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--测试-->
                    <el-menu-item index="/test" d>
                        <i class="el-icon-s-home"></i>
                        <span>测试</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <!--头部区域-->
                <el-header>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">个人中心</template>
                            <el-menu-item index="2-1">个人资料</el-menu-item>
                            <el-menu-item index="2-2">申请</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">信息修改</template>
                                <el-menu-item index="2-4-1">密码修改</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3" disabled>消息中心</el-menu-item>
                        <el-menu-item index="4" disabled><!--<a href="" target="_blank">订单管理</a>--></el-menu-item>
                    </el-menu>
                </el-header>
                <!--内容区域-->
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                isCollapse: true
            };
        },
        methods: {
            /*头部*/
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            /*侧边栏 start*/
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
            /*侧边栏 start*/
        }
    }
</script>

<style scoped>
/*表格侧边栏，头部不动，主体上下滑动*/
/*    .el-aside {*/
/*        display: block;*/
/*        position: absolute;*/
/*        left: 0;*/
/*        top: 60px;*/
/*        bottom: 0;*/
/*    }*/
    .el-main {
        position: absolute;
        left: 200px;
        right: 0;
        top: 60px;
        bottom: 0;
        overflow-y: scroll;
    }
</style>