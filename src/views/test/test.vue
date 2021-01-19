<template>
    <div>
<!--        <el-table-->
<!--                :data="tableData"-->
<!--                :span-method="arraySpanMethod"-->
<!--                border-->
<!--                style="width: 100%">-->
<!--            <el-table-column-->
<!--                    prop="id"-->
<!--                    label="ID"-->
<!--                    width="180">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="name"-->
<!--                    label="姓名">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="amount1"-->
<!--                    sortable-->
<!--                    label="数值 1">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="amount2"-->
<!--                    sortable-->
<!--                    label="数值 2">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="amount3"-->
<!--                    sortable-->
<!--                    label="数值 3">-->
<!--            </el-table-column>-->
<!--        </el-table>-->

        <el-table
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="amount1"
                    label="数值 1（元）">
            </el-table-column>
            <el-table-column
                    prop="amount2"
                    label="数值 2（元）">
            </el-table-column>
            <el-table-column
                    prop="amount3"
                    label="数值 3（元）">
            </el-table-column>
        </el-table>
        <button @click="rowspan">hahhahahah</button>
    </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                spanArr:[],//存放每一行的合并数
                position:0,//spanArr的索引
                tableData: [{
                    id: '123',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                }, {
                    id: '123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12
                }, {
                    id: '123',
                    name: '王小刚',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9
                },
                {
                    id: '221',
                    name: '王小刚',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                },
                {
                    id: '221',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                },
                {
                    id: '222',
                    name: '王小刚',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                },
                {
                    id: '221',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17
                },
                {
                    id: '2',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15
                }
                ]
            };
        },
        methods: {
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },
            //用返回的this.spanArr数组的，定义每一行rowspan
            rowspan(){
                //循环遍历获取tableData数组中的数据，item：一个数据元素，index：数据下标
                this.tableData.forEach((item,index)=>{
                    // console.log("forEach")
                    // console.log(item)
                    // console.log('index:' + index);
                    if(index == 0){
                        this.spanArr.push(1) //里面无数据，第一行先占一行
                        this.position = 0 //给第一行索引为0
                    }else{
                        //让下一行ID与上一行ID作比较
                        // if(this.tableData[index].id === this.tableData[index-1].id ){
                        if(this.tableData[index].id === this.tableData[index-1].id && this.tableData[index].name == this.tableData[index-1].name){
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
                // console.log(row)
                console.log('row=:' + row.name);
                console.log('column=:' + column.id);
                console.log('rowIndex=:' + rowIndex);
                console.log('columnIndex=:' + columnIndex);
                console.log("==========================")
                console.log(this.spanArr)
                console.log("==========================")
                // if (columnIndex === 0) {
                //     if (rowIndex % 2 === 0) {
                //         return {
                //             rowspan: 2,
                //             colspan: 1
                //         };
                //     } else {
                //         return {
                //             rowspan: 0,
                //             colspan: 0
                //         };
                //     }
                // }

                // row, column, rowIndex, columnIndex
                // row 是当前行数据，column是当前列，rowIndex是当前行的索引，columnIndex是当前列的索引
                //对第一列数据进行比较合并
                if(columnIndex === 0){
                    const _row = this.spanArr[rowIndex] //合并行的行数，1代表独占一行，比1大代表合并若干行，0标识不显示
                    const _col = _row>0 ? 1 : 0 //行如果存在的话那么列也就存在，行如果不存在，那么列也就不存在
                    return {
                        rowspan:_row,
                        colspan:_col
                    }
                }
                // if(columnIndex === 1){
                //     const _row = this.spanArr[rowIndex] //合并行的行数，1代表独占一行，比1大代表合并若干行，0标识不显示
                //     const _col = _row>0 ? 1 : 0 //行如果存在的话那么列也就存在，行如果不存在，那么列也就不存在
                //     return {
                //         rowspan:_row,
                //         colspan:_col
                //     }
                // }






            }
        },
        created() {
            this.rowspan()
            console.log("hahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        }
    }
</script>

<style scoped>

</style>