<template>
    <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="订单ID"
                prop="ord_id">
        </el-table-column>
        <el-table-column
                label="用户名"
                prop="ord_username">
        </el-table-column>
        <el-table-column
                label="发货地址"
                prop="ord_useradd">
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
        <el-table-column
                label="订单总价格"
                prop="ord_sumprice">
        </el-table-column>
        <el-table-column
                label="支付状态"
                prop="ord_paystate">
        </el-table-column>
        <el-table-column
                label="订单状态"
                prop="ord_orderstate">
        </el-table-column>
        <el-table-column
                label="下单时间"
                prop="ord_createtime">
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
                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
                    ord_useradd:'上海市普陀区金沙江路 1518 弄',
                    ord_goodsid: 12,
                    ord_goodsname: 'IPhone 11',
                    ord_goodsnumber: 2,
                    ord_sumprice:2999.00,
                    ord_paystate:'等待支付',
                    ord_orderstate:'等待支付',
                    ord_createtime:'2020-12-20 12:12:36',
                },
                    {
                    ord_id: '222222',
                    ord_username: '李四',
                    ord_useradd:'上海市普陀区金沙江路 1518 弄',
                    ord_goodsid: 12,
                    ord_goodsname: 'iPhone 11 Pro',
                    ord_goodsnumber: 2,
                    ord_sumprice:2999.00,
                    ord_paystate:'等待支付',
                    ord_orderstate:'等待支付',
                    ord_createtime:'2020-12-20 12:12:36',
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
                search: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>

<style scoped>

</style>