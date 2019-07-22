//包含应用中所有请求接口的函数：接口请求函数
//函数的返回值都是promise对象

import jsonp from 'jsonp' //axios不能发jsonp请求
import ajax from './ajax'
import { message } from 'antd'


// const BASE = 'http://localhost:5000'
const BASE = '';

//请求登录
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})

//发送jsonp请求，得到天气信息
export const reqWeather = (city)=>{
   
    //执行器函数：内部去执行异步任务，成功了调用resolve(),失败了调用reject()，直接提示错误
    return new Promise((resolve,reject) => {

        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data)=>{
           if(!error && data.error===0){//成功的
            const {dayPictureUrl,weather} = data.results[0].weather_data[0]  
            resolve({dayPictureUrl,weather })
           } else {//失败的
            message.error('获取天气信息失败')
           }
            
        })
    })
    }


    //获取分类列表
export const reqCategorys = () => ajax(BASE + '/manage/category/list')
//添加分类
export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add',{
    categoryName
}) 
//修改分类，api文档提供什么参数，就得传进去
export const reqUpdateCategory = ({categoryId ,categoryName}) => ajax.post(BASE + '/manage/category/update',{
    categoryId,
    categoryName
})

//根据分类id获取分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{
    params:{
        categoryId
    }
})






//获取商品分页列表
export const reqProducts = (pageNum,pageSize)=> ajax(BASE + '/manage/product/list',{
    params:{ //包含所有query参数对象
        pageNum,
        pageSize
    } })

//根据Name/desc搜索产品分页列表
export const reqSearchProduct = ({
    pageNum,
    pageSize,
    searchName,
    searchType //它的值是'productName'或者'productDesc'
}) =>ajax(BASE + '/manage/product/search',{
    //method:'GET',
    params:{
        pageNum,
        pageSize,
        [searchType]:searchName,

    }
})

//对商品进行上架和下架处理
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{
     method:'POST',
     data:{
         productId,
         status
     }

})

//删除图片
export const  reqDeleteImg = (name) =>ajax.post(BASE + '/manage/img/delete',{name})










    
//     ajax({
//          method:'POST',
//          url:BASE + '/login',
//          data:{//data是对象，默认使用json格式的请求体携带参数数据
//              username,
//              password
//          }
//         //data:qs.stringify({username,password})
//      })
//    ajax.post(BASE + '/loign',{username,password})

// }

// const name = 'admin'
// const pwd = 'admin'
// reqLogin(name,pwd).then(result => {//response.data的值
//     //const result = response.data
//     console.log('请求成功了',result)
    
// },error => {
//     console.log('请求失败了,'+ error.message)
// })

// 将实参数据赋值行参变量