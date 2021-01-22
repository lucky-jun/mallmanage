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
            empty-text="暂无任何订单(未搜索到订单)"
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
                :formatter="dateForma"
        >
        </el-table-column>
        <el-table-column
                align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                        v-model="search123"
                        size="mini"
                        placeholder="输入用户名关键字搜索"
                        @keyup.enter.native="queryInput()"
                />
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

    import moment from 'moment'

    export default {
        name: "goodsManage",
        data() {
            return {
                tableData: [],
                tableDataInputQuery: [],
                tableDataOld: [],
                search: '',
                search123: '',
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
        watch:{
          tableData(val,old){
              // console.log("11111111111")
              // console.log(val)
              // console.log(val[1])
              // let a = Object.assign({},val)
              // console.log(a)
              // console.log(a[6])
              //
              // let arr =[]
              // arr = a[6]
              // arr.concat(a[10])
              // // arr.push(a)
              //
              // console.log("2222222222222222")
              // console.log(arr)
              // console.log(old)
              // console.log(this.tableData)
              // console.log("val")
              // console.log(val)
              // let resdata=JSON.parse(JSON.stringify(val));
              // this.tableData.push(a)
              // console.log("123123")
              // console.log(this.tableData)
          },
            search123(val,oldval){
              console.log("新："+val)
              console.log(val)
              console.log("旧："+oldval)
              console.log("判断："+val===undefined)
                // this.rowspan()
                if(val==""){
                    this.tableData = this.tableDataOld
                    this.search = ""
                }
            }
        },
        methods: {
            //弹窗层 Start
            ChildrenLogState(val){
                this.dialogVisible = val
            },
            //弹窗层 End
            //发货
            handleDelivering(index, row) {
                // console.log(index, row);
                //获取合并的数据
                // for(let i = 0;i<this.spanArr[index];i++){
                //     console.log(this.tableData[index+i])
                // }
                //获取合并的数据 END
                request({
                    url:'updataOrderToDelivering.do',
                    method:'post',
                    data:{
                        //订单ID
                        orderId:row.ord_id,
                        //操作员编号
                        employeeId:10
                    }
                }).then(res=>{
                    console.log("界面请求成功："+res)
                    if(res.flag){
                        this.$message({
                            type:"success",
                            message:"发货成功"
                        })
                    }else{
                        this.$message({
                            type:"error",
                            message:"发货失败，请重试！"
                        })
                    }
                }).catch(err=>{
                    console.log("界面请求失败："+err)
                    this.$message({
                        type:"error",
                        message:"发货失败，请重试！"
                    })
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
                    console.log("返回界面的数值"+res)
                    if(res.flag){
                        this.$message({
                            type:"success",
                            message:"删除成功"
                        })
                        setTimeout(()=>{
                            this.$router.go(0)
                        },500)
                    }else{
                        this.$message({
                            type:"error",
                            message:"删除失败，请重试！"
                        })
                    }
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
                        console.log("this.tableData[index].ord_id1:"+this.tableData[index].ord_id)
                        console.log("this.tableData[index].ord_id2:"+this.tableData[index-1].ord_id)
                        console.log("this.tableData[index].ord_username1:"+this.tableData[index].ord_username)
                        console.log("this.tableData[index].ord_username2:"+this.tableData[index-1].ord_username)
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
            dateForma(row,column){

                const date = row[column.property];

                if(date == undefined){return ''};

                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            },
            queryInput(){
                console.log("准备搜索")
                console.log(this.search123)
                this.tableDataOld = this.tableData
                request({
                    url:'/queryOrderByUserName.do',
                    method:'post',
                    data:{
                        ord_username:this.search123
                    }
                }).then(res=>{
                    console.log(res.data)
                    if(res.flag){
                        this.tableData = res.data
                        this.rowspan()
                    }else{
                        this.tableData = []
                    }
                }).catch(err=>{
                    console.log(err)
                    console.log("搜索有问题")
                })
            }
        },
        created() {
            console.log("创建")
            //请求数据
            request({
                url:'/queryMyOrderAll.do',
                method:'post'
            }).then(res=>{
                console.log("订单界面")
                console.log(res)
                console.log("转换后Data")
                // let resdata=JSON.parse(JSON.stringify(res.data));
                // console.log("运行记录组件接到的数据",resdata);
                // console.log(resdata);
                // console.log(resdata[6]);
                if(res.flag){
                    this.tableData = res.data
                    this.rowspan()
                }else{
                }
            }).catch(err=>{
                console.log("查询有误")
            })
        },
        filters:{

        }
    }
</script>

<style scoped>

</style>