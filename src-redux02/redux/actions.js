//包含N个用于创建action对象的工厂函数
import {INCREMENT,DECREMENT} from './action-types'
//创建新增加的action
export const increment = (number) => ({type:INCREMENT,number})
//创建新减少的action
export const decrement = (number) => ({type:DECREMENT,number})





