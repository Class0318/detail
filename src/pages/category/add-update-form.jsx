import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,} from 'antd'
 
const Item = Form.Item

//添加分类的Form组件
class AddUpdateForm extends Component {
      //限制传参类型
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        //有可能有值，有可能没有值，没有传
        categoryName:PropTypes.string,
    }
    //只要可以访问到form了 ，执行一次就可以，将当前子组件的form对象，通过函数交给了category父组件，
    //父组件将接收到的form保存到了组件对象上
     componentWillMount(){
         this.props.setForm(this.props.form)
     }


    render() {
        const { getFieldDecorator } = this.props.form
        const { categoryName } = this.props
        return (
            <Form>
                <Item>
                    {
                        //getFieldDecorator有两个括号，一个是放名字，配置对象，一个放结构input框
                           getFieldDecorator('categoryName',{
                           initialValue: categoryName || '' ,
                           rules:[
                               {required:true, message:'分类名称必须输入'}
                           ]

                        })(
                            <Input type="text" placeholder="请输入分类名称"></Input>
                        )
                        
                    }
                   
                </Item>
            </Form>
        )
    }
}


export default Form.create()(AddUpdateForm)
//主要要用form属性 ，用create创建，传进去一个组件，出来一个新的组件，新的组件包着之前组件，之前的组件有from属性
