<template>
    <el-table
            :data="tableData.filter(data => !search || data.ord_username.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            tooltip-effect="dark"
            :height="tableHeight"
    >
        <el-table-column
                label="订单ID"
                prop="ord_id">
        </el-table-column>
        <el-table-column
            label="配送信息"
        >
            <el-table-column
                    label="用户名"
                    prop="ord_username">
            </el-table-column>
            <el-table-column
                    label="发货地址"
                    prop="ord_useradd"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    label="商品ID"
                    prop="ord_goodsid">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="ord_goodsname">
            </el-table-column>
            <el-table-column
                    label="商品数量"
                    prop="ord_goodsnumber">
            </el-table-column>
        </el-table-column>
        <el-table-column
                label="订单总价格"
                prop="ord_sumprice">
        </el-table-column>
        <el-table-column
                label="支付状态"
                prop="ord_paystate"
                :filters="[{text: '等待支付', value: '等待支付'}, {text: '已支付', value: '已支付'},]"
                :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
                label="订单状态"
                prop="ord_orderstate"
                :filters="[{text: '等待支付', value: '等待支付'}, {text: '等待发货', value: '等待发货'}, {text: '等待收货', value: '等待收货'},]"
                :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
                label="下单时间"
                sortable
                prop="ord_createtime"
        >
        </el-table-column>
        <el-table-column
                align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        :loading="false"
                        @click="handleEdit(scope.$index, scope.row)" :disabled="btntext(scope.row.ord_paystate)">发货</el-button>
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)" :disabled="btntext(scope.row.ord_paystate)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "goodsManage",
        data() {
            return {
                tableData: [
                    {
                        ord_id: '1111',
                        ord_username: '张三',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'IPhone 11',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'等待支付',
                        ord_orderstate:'等待支付',
                        ord_createtime:'2020-12-22 12:12:36',
                    },
                    {
                        ord_id: '222222',
                        ord_username: '李四',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'iPhone 11 Pro',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'已支付',
                        ord_orderstate:'等待发货',
                        ord_createtime:'2020-12-22 15:12:36',
                    },
                    {
                        ord_id: '33333',
                        ord_username: '王五',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsnumber: 2,
                        ord_goodsid: 12,
                        ord_goodsname: 'iPhone 11 Pro Max',
                        ord_sumprice:2999.00,
                        ord_paystate:'等待支付',
                        ord_orderstate:'等待支付',
                        ord_createtime:'2020-12-20 12:12:36',
                    },
                    {
                        ord_id: '4444',
                        ord_username: '老六',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'iPhone XR',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'已支付',
                        ord_orderstate:'等待发货',
                        ord_createtime:'2020-12-24 12:12:36',
                    },
                    {
                        ord_id: '55555',
                        ord_username: '老七',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'IPhone 12 Mini',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'等待支付',
                        ord_orderstate:'等待支付',
                        ord_createtime:'2020-12-20 12:12:36',
                    },
                    {
                        ord_id: '55555',
                        ord_username: '老七',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'IPhone 12 Mini',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'等待支付',
                        ord_orderstate:'等待支付',
                        ord_createtime:'2020-12-20 12:12:36',
                    },
                ],
                search: '',
                tableHeight: 640,
                timeScreenData:[]
            }
        },
        computed:{
            // 时间过滤器
            timeScreen() {
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            btntext(ord_paystate){
                // console.log(ord_paystate)
                if(ord_paystate!='已发货'){
                    return false
                }else{
                    return true
                }
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
    }
</script>

<style scoped>

</style>