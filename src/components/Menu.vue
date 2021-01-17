<template>
    <div id="menu">
        <el-container>
            <!--侧边栏区域-->
            <el-aside width="200px">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <!--首页-->
                    <el-menu-item index="1">
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
                            <el-menu-item index="1-1">全部商品</el-menu-item>
                            <el-menu-item index="1-2">添加新商品</el-menu-item>
                            <el-menu-item index="1-3">添加商品库存</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
<!--                        <el-menu-item-group title="商品信息修改">-->
                            <el-menu-item index="1-4">修改商品信息</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-5">
                            <template slot="title">商品上下架</template>
                            <el-menu-item index="1-5-1">全部商品</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <!--订单管理-->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">未完成订单</template>
                            <el-menu-item index="1-1">未支付订单</el-menu-item>
                            <el-menu-item index="1-2">等待发货订单</el-menu-item>
                            <el-menu-item index="1-3">等待收货订单</el-menu-item>
                            <el-menu-item index="1-4">问题订单</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">已完成订单</template>
                            <el-menu-item index="1-1">完成订单</el-menu-item>
                        </el-menu-item-group>
<!--                        <el-menu-item-group title="商品信息修改">-->
<!--                            <el-menu-item index="1-3">修改商品信息</el-menu-item>-->
<!--                        </el-menu-item-group>-->
<!--                        <el-submenu index="1-4">-->
<!--                            <template slot="title">商品优惠信息</template>-->
<!--                            <el-menu-item index="1-4-1">商品促销</el-menu-item>-->
<!--                        </el-submenu>-->
                    </el-submenu>
                    <!--用户管理-->
                    <el-menu-item index="4">
                        <i class="el-icon-document"></i>
                        <span slot="title">员工管理</span>
                    </el-menu-item>
                    <el-menu-item index="5" disabled>
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
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
                    Main
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

</style>