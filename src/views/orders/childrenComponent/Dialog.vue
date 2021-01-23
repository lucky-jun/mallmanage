<template>
    <div>
        <el-dialog title="收货地址"
                   :visible.sync="dialogVisible"
                   :before-close="handleClose"
        >
            <el-form :model="form">
                <el-form-item label="订单ID：" :label-width="formLabelWidth">
                    <span>{{orderInf.ord_id}}</span>
                </el-form-item>
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <span>{{orderInf.ord_username}}</span>
                </el-form-item>
                <el-form-item label="收货地址" :label-width="formLabelWidth" required>
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付状态" :label-width="formLabelWidth">
                    <span>{{orderInf.ord_paystate}}</span>
                </el-form-item>
                <el-form-item label="订单状态" :label-width="formLabelWidth">
                    <span>{{orderInf.ord_orderstate}}</span>
                </el-form-item>
                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <span>{{orderInf.ord_createtime}}</span>
                </el-form-item>

<!--                <el-form-item>-->
<!--                    <span>{{orderInf.ord_paystate}}</span>-->
<!--                    <span>{{orderInf.ord_orderstate}}</span>-->
<!--                    <span>{{orderInf.ord_createtime}}</span>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="活动区域" :label-width="formLabelWidth">-->
<!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--                        <el-option label="区域一" value="shanghai"></el-option>-->
<!--                        <el-option label="区域二" value="beijing"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Cancel">取 消</el-button>
                <el-button type="primary" @click="Submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network";

    export default {
        name: "Dialog",
        props:{
            orderInf:{},
            state:false
        },
        watch:{
            state(val){
                console.log("val")
                console.log(val)
                this.dialogVisible = val
            },
            orderInf(val){
                console.log("orderInf")
                console.log(val)
                this.orderInf = val
                this.form.address = val.ord_useradd
                // console.log(this.form.address)
            }
        },
        data() {
            return {
                dialogVisible:this.state,
                form: {
                    address: '',
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            //提示是否关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.$emit("dialogState",false)
                        done();
                    })
                    .catch(_ => {});
            },
            //提交按钮
            Submit(){
                console.log("点击了提交")
                if(this.addressRules){
                    this.$emit("dialogState",false)
                    //请求修改axios
                    request({
                        url:'/updateOrderToAddress.do',
                        method:'post',
                        data:{
                            orderInf:this.newOrderInf
                        }
                    }).then(res=>{
                        console.log("返回值："+res)
                        if(res.flag){
                            this.$message({
                                type:"success",
                                message:"修改成功"
                            })
                            this.$emit("dialogState",false)
                        }else{
                            this.$message({
                                type:"error",
                                message:"修改失败，请重试！"
                            })
                        }
                    })
                }else{
                    this.$message({
                        type:"error",
                        message:"地址不能为空！"
                    })
                }
            },
            //取消按钮
            Cancel(){
                console.log("点击了取消")
                this.$emit("dialogState",false)
            }
        },
        computed:{
            addressRules(){
                if(this.form.address != ''){
                    return true
                }else{
                    return false
                }
            },
            newOrderInf(){
                this.orderInf.ord_useradd = this.form.address
                return this.orderInf
            }
        }
    }
</script>

<style scoped>

</style>