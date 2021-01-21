import axios from "axios";
import router from "../router";

//第四种方式
export function request(config){
    //创建axios的实例
    const instance = axios.create({
        baseURL:'http://localhost:8080/ShoppingMall',
        timeout:180000,
        headers:{
            token:sessionStorage.getItem("sessionId"),
            userId:sessionStorage.getItem("userId")
        }
    })
    //请求
    instance.interceptors.request.use(config=>{
        //可加入请求加载等待界面
        console.log("发送的数据：")
        console.log(config)
        //放行config数据
        return config
    },error => {
        console.log("axios请求失败拦截："+error)
    })
    //响应时拦截，对返回的数据进行拦截
    instance.interceptors.response.use(res=>{
        console.log('axios拦截到的响应返回的后端数据：' + res);

        //只返回res.data中的数据
        return res.data
    },error => {
        console.log('axios响应时失败'+error)
        console.log(error)
        console.log(error.message.toString())
        // console.log(error.message.toString().substring(0,error.message.toString().length-18))
        // console.log(error.message == 'Network Error')

        if(error.message == 'Network Error'){
            router.push('/netWorkError')
        }else if(error.message.toString().substring(0,error.message.toString().length-18) == 'timeout'){
            router.push('/timeout')
        }else{
            console.log('其它请求错误')
        }
        // return error.message
    })

    //
    return instance(config)
}