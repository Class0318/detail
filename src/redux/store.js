//redux最核心的管理对象是：store
import {createStore,applyMiddleware} from 'redux'//异步中间件
import thunk from 'redux-thunk' //redux支持异步
import {composeWithDevTools} from 'redux-devtools-extension'//调试工具
import reducer from './reducer' //调用reducer返回一个新的


//根据指定的reducer函数，产生一个store对象
//store对象内部管理新状态数据，状态数据的初始值为第一次调用reducer()的返回值
//应用异步中间件
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

                                 