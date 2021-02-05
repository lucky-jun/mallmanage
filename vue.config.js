const path = require("path");  //引入path
function resolve(dir) {    //封装一个通用方法
    return path.resolve(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('acssets',resolve('src/assets'))
            .set('@',resolve('src'))
            .set('views',resolve('src/views'))
            .set('router',resolve('src/router'))
            .set('network',resolve('src/network'))
    },
    devServer:{
        port:8082
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}