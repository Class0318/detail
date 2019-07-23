//包含N个 用于创建action 对象的工厂函数，
//调用dispath方法，传入action返回一个新的状态
import {
    INCREMENT,
    DECREMENT
} from './action-types'
//创建增加的action
export const increment = (number) => ({type:INCREMENT,number})
//创建减少的action   
//同步action是对象
export const decrement = (number) => ({type:DECREMENT,number})
//创建异步增加的action
//异步action是一个函数，参数是dispatch函数
//①、执行异步代码
//②、完成后，分发一个同步action
export function incrementAsync (number){
    return dispatch => {
        //(1)执行异步代码
        setTimeout(() => {
        //(2)完成后，分发一个同步action
        dispatch(increment(number))
        },1000);
    }
}



