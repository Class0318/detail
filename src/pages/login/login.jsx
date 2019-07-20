import React,{Component} from 'react'
import {Form,Input,Icon,Button,message} from 'antd'
import { Redirect } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './login.less'
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'


const Item = Form.Item
class Login extends Component{
      
    
      handleSubmit = e => {
          //阻止事件的默认行为：阻止表达的提交
          e.preventDefault()
          
          //取出输入的相关的数据
        //   const form = this.props.form
        //   const values = form.getFieldsValue()
        //   const username = form.getFieldValue('username')
        //   const password = form.getFieldValue('password')
        //   console.log(values,username,password)
        //   alert('发送登录的ajax请求')

        
        //对表单所有字段进行统一验证
        this.props.form.validateFields(async(err, {username,password}) => {
            if (!err) {//----->验证通过了
                // alert(`发登录的ajax请求,username=${username},password=${password}`)
              const result = await reqLogin(username,password)//此时的result是API文档
              //登录成功
              if(result.status===0){
                  //将user信息保存到local
                  const user = result.data
              //localStorage.setItem('user_key',JSON.stringify(user))
              storageUtils.saveUser(user)
               //保存到内存中
               memoryUtils.user = user
               //跳转到管理界面
               
               this.props.history.replace('/')
               message.success('登陆成功!')
                 } else { // 登陆失败
                    message.error(result.msg)
                 }
            }else{
               // alert('验证失败')
            }
          })
       
      }   
    
      //对密码进行自定义验证
      validatortwd=(rule,value,callback)=>{
           value = value.trim()//去空格
           if(!value){
               callback('密码必须输入')
           }else if(value.length<4){
               callback('密码不能小于4位')
           }else if(value.length>12){
               callback('密码不能超过12位')
           }else{
               callback()//验证通过
           }
      }
      
      
      render(){
        //读取保存的user,如果存在，直接挑转到管理界面
        //const user = JSON.parse(localStorage.getItem('user_key' || '{}'))
        const user = memoryUtils.user
        if (user._id) {
          return <Redirect to="/" /> // 自动跳转到指定的路由路径
        }
        const {getFieldDecorator} = this.props.form
         
        return(
                <div className='login'>
                    <header className='login-header'>
                      <img src={logo} alt="logo"/>
                      <h1>React项目：后台管理系统</h1>
                    </header>
                <section className='login-content'>
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                           {
                                getFieldDecorator('username',{//配置对象：属性名是一些特定的名称
                                    initialValue: '',//初始值
                                    rules:[//声明式验证：使用插件已定义号的规则进行验证
                                        { required: true, whitespace:true,message: '用户名是必须的' },
                                        {min:4,message:'用户名不能小于4位'},
                                        {max:12,message:'用户名不能大于12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文的、数字或下划线组成'}
                        
                                    ]
     
                                 })(
                                     <Input 
                                    prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}/>}
                                    placeholder="用户名"/> 
                                 )
                           }
                           
                         </Item>
                    <Form.Item>
                         {
                                getFieldDecorator('password',{
                                    initialValue: '',//初始值
                                    rules:[

                                       {validator:this.validatortwd}
                                    ]
     
                                 })(
                                     <Input 
                                    prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}/>}
                                    type="password" placeholder="密码"/> 
                                 )
                           }
                    </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
            )
        }
}










/*

理解Form组件:包含<Form>的组件
利用Form.create()包装Form组件生成一个新的组件
新的组件会向form组件传递一个强大的属性：属性名：form, 属性值对象


高阶函数：
    定义：接收的参数是函数或者返回值是函数
    常见的：数组遍历相关的方法 / 定时器 / Promise / 高阶组件
    作用：实现一个更加强大，动态的功能

高阶组件：
    本质接收一个组件 ，返回一个新的组件
    Form.create()返回的就是一个高阶组件
*/




const WrapperForm = Form.create()(Login)
export default WrapperForm   //<Form(login)/>

/*
组件：组件类，本质就是一个构造函数,定义组件：class组件/function组件
组件对象：组件类的实例，也就是构造函数的实例

*/