<template>
    <div>
        <!--表格层-->
    <el-table
            :data="tableData.filter(data => !search || data.ord_username.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            tooltip-effect="dark"
            :height="tableHeight"
            :span-method="objectSpanMethod"
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
                        @click="handleDelivering(scope.$index, scope.row)" :disabled="btntext(scope.row.ord_paystate)">发货</el-button>
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
        <!--弹出层-->
    <Dialog :state="this.dialogVisible" :orderInf="this.orderInf" @dialogState="ChildrenLogState"></Dialog>
    </div>
</template>

<script>
    import {request} from "network";
    import Dialog from "./childrenComponent/Dialog";
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
                    },                    {
                        ord_id: '4444',
                        ord_username: '老六',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'iPhone Xs Max',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'已支付',
                        ord_orderstate:'等待发货',
                        ord_createtime:'2020-12-24 12:12:36',
                    },                    {
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
                    },                    {
                        ord_id: '4444',
                        ord_username: '老六',
                        ord_useradd:'上海市普陀区金沙江路 1518 弄',
                        ord_goodsid: 12,
                        ord_goodsname: 'iPhone Xs',
                        ord_goodsnumber: 2,
                        ord_sumprice:2999.00,
                        ord_paystate:'已支付',
                        ord_orderstate:'等待发货',
                        ord_createtime:'2020-12-24 12:12:36',
                    },
                ],
                search: '',
                tableHeight: 640,//表格高度
                timeScreenData:[],//时间筛选
                spanArr:[],//合并行
                position:0,//合并行标识
                dialogVisible:false, //弹出成dialog状态
                orderInf:{}

            }
        },
        components:{
            Dialog
        },
        computed:{
            // 时间过滤器
            timeScreen() {
            }
        },
        methods: {
            //弹窗层 Start
            ChildrenLogState(val){
                this.dialogVisible = val
            },
            //弹窗层 End
            handleDelivering(index, row) {
                // console.log(index, row);
                request({
                    url:'updataOrderToDelivering.do',
                    data:{
                        //订单ID
                        orderId:row.ord_id,
                        //操作员编号
                        employeeId:10
                    }
                }).then(res=>{
                    console.log("界面请求成功："+res)
                    // if(res == 'Network Error'){
                    //     this.router.push('/netWorkError')
                    // }else if(res.toString().substring(0,res.toString().length-18) == 'timeout'){
                    //     this.$router.push('/timeout')
                    // }else{
                    //     console.log('其它请求错误')
                    // }
                }).catch(err=>{
                    console.log("界面请求失败："+err)
                })
            },
            //修改
            handleEdit(index, row) {
                console.log(row)
                this.orderInf = row
                this.dialogVisible = true
            },
            //删除
            handleDelete(index, row) {
                // console.log(index, row);
                request({
                    url:'DeleteOrderToDelivering.do',
                    data:{
                        //订单ID
                        orderId:row.ord_id,
                        //操作员编号
                        employeeId:10
                    }
                }).then(res=>{
                    console.log("界面请求成功："+res)
                }).catch(err=>{
                    console.log("界面请求失败："+err)
                })
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
            },
            //合并行 Start
            //用返回的this.spanArr数组的，定义每一行rowspan
            rowspan(){
                //循环遍历获取tableData数组中的数据，item：一个数据元素，index：数据下标
                this.tableData.forEach((item,index)=>{
                    if(index == 0){
                        this.spanArr.push(1) //里面无数据，第一行先占一行
                        this.position = 0 //给第一行索引为0
                    }else{
                        //让下一行ID与上一行ID作比较,当两个ID一致时合并
                        // if(this.tableData[index].id === this.tableData[index-1].id ){
                        //让下一行ID与上一行ID并且让下一行的name和上一行的name比较,当两个都通过时进行合并
                        if(this.tableData[index].ord_id === this.tableData[index-1].ord_id && this.tableData[index].ord_username == this.tableData[index-1].ord_username){
                            this.spanArr[this.position] += 1 //如果下一行与上一行相同，那么spanArr(要合并的数据行)增加一行
                            this.spanArr.push(0) //当前行不显示，因为与上一行相同
                        }else{
                            this.spanArr.push(1) //如果与与上一行不相等，那么当前行自己占一行
                            this.position = index
                        }
                    }
                })
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                // row 是当前行数据，column是当前列，rowIndex是当前行的索引，columnIndex是当前列的索引
                //对第一列数据进行比较合并
                const arr = [0,1,2,6,7,8,9,10]//合并的列数号
                for(let a of arr){
                    // console.log('arr:'+a)
                    if(columnIndex === a){
                        const _row = this.spanArr[rowIndex] //合并行的行数，1代表独占一行，比1大代表合并若干行，0标识不显示
                        const _col = _row>0 ? 1 : 0 //行如果存在的话那么列也就存在，行如果不存在，那么列也就不存在
                        return {
                            rowspan:_row,
                            colspan:_col
                        }
                    }
                }
            },
            //合并行 End
        },
        created() {
            this.rowspan()
        }
    }
</script>

<style scoped>

</style>