import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
 
class  ModifyRegular extends React.Component{//在es6中定义一个ModifyRule类
     constructor(props){//构造函数
         super(props);
         
         this.handleAdd = this.handleAdd.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOk = this.handleOk.bind(this)
         this.handleClear = this.handleClear.bind(this)
         this.state = {
            visible:false,
            appName:'',
         }
      
        console.log("props:",props)
        let detail =JSON.parse(props.detail)
       
        this.state= {
            visible:false,
            beginPosition:detail.beginPosition,
            beginSplitSymbol:detail.beginSplitSymbol,
            endPosition:detail.endPosition,
            endSplitSymbol:detail.endSplitSymbol,
            value:detail.value,
            id:props.id,
            appName:props.appName,
        };
       
     }
    handleAdd() {
        this.setState({
            visible: true
        });
    }
    handleSubmit(e){//提交表单
        e.preventDefault();
       
         this.props.form.validateFieldsAndScroll((err,values)=>{
             if(!err){
                  console.log('接收的值：',values);
                  this.props.form.resetFields();
                 this.setState({
                    visible:false,
                    beginPosition:values.beginPosition,
                    beginSplitSymbol:values.beginSplitSymbol,
                    endPosition:values.endPosition,
                    endSplitSymbol:values.endSplitSymbol,
                    value:values.value,
                    id:values.id,
                 })
                //清空提交的表单
                 //当值传递到父元素后，通过回调函数触发modifyRule方法将参数values带到父元素
                 this.props.callback(values);
             }
         })
    }
 
    handleClear(){
        this.props.form.resetFields();
    }
 
    handleOk() {
        this.setState({
            visible: false
            });
    }
    render(){
 
     const {getFieldDecorator} = this.props.form;
     const formItemLayout = {
         labelCol:{span : 6},
         wrapperCol:{span: 14}
     };
     const tailFormItemLayout = {
         wrapperCol: {
             span: 20,
             offset: 8
         }
     };
  
        return(
            <div>
                 <Button type="primary" size="small" onClick={this.handleAdd}>修改</Button>
                  {/* <a type="primary"  state="{width:40}" > </a> */}
            <Modal title="修改规则" visible={this.state.visible} onCancel={this.handleOk} onOk={this.handleSubmit}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label = "规则id:"  hasFeedback>
                    {getFieldDecorator('id', 
                    {initialValue:[this.state.id]},
                    {  
                        rules: [ {
                            required: true, message: '请输入规则起始位置',type: 'int'
                        }]
                    })
                    
                    (   <Input name="id" disabled={true} size="small" style={{width:50}} ></Input>)
                }
                      
                    </FormItem>
                    <FormItem {...formItemLayout} label = "起始位置"  hasFeedback>
                    {getFieldDecorator('beginPosition', 
                    
                          {initialValue:[this.state.beginPosition]},
                            {
                                rules: [
                                    
                                    {
                                    required: true, message: '请输入规则起始位置',type: 'int'
                                }]
                            })
                            
                            (
                            <Input name="beginPosition" maxLength="5" size="small" prefix="第" suffix="个" style={{width:120}} />
                            )
                        }
                          {getFieldDecorator('beginSplitSymbol', 
                           {initialValue:[this.state.beginSplitSymbol]},
                          {
                                rules: [{
                                    required: true, message: '请输入规则起始位置',type: 'string'
                                }]
                            })(
                            <Input name="beginSplitSymbol" maxLength="5" size="small" suffix="符" style={{width:120}}/>
                            )
                        }
                    </FormItem>
                 
                    <FormItem {...formItemLayout} label = "终止位置"  hasFeedback>
                    {getFieldDecorator('endPosition',
                            {initialValue:[this.state.endPosition]},
                            {
                                rules: [{
                                    required: true, message: '请输入规则终止位置',type: 'int'
                                }]
                            })(
                            <Input name="endPosition" maxLength="5" size="small" prefix="第" suffix="个"  style={{width:120}} />
                            )
                            }
                             {getFieldDecorator('endSplitSymbol', 
                              {initialValue:[this.state.endSplitSymbol]},
                             {
                                rules: [{
                                    required: true, message: '请输入规则终止位置',type: 'string'
                                }]
                            })(
                                <Input name="endSplitSymbol" maxLength="5" size="small" suffix="符" style={{width:120}}/>
                            )}
                    </FormItem>
                  
                    <FormItem {...formItemLayout} label = "匹配规则"  hasFeedback >
                    {getFieldDecorator('value',
                     {initialValue:[this.state.value]},
                             {
                                rules: [{
                                    required: true, message: '请输入规则终止位置',type: 'string'
                                }]
                            })(
                            <Input name="value" maxLength="50" size="small" style={{width:120}}/>
                            )}
                    </FormItem>
                   
                    <FormItem {...tailFormItemLayout} style={{padding:10}}>
                        <Button type="primary" htmlType="submit" size="small" onClick={this.handleSubmit}>提交</Button>
                        <Button type="primary" size="small" onClick={this.handleClear}>重置</Button>
                    </FormItem>
                </Form>
            </Modal>
            </div>
        )
    }
}
ModifyRegular = Form.create()(ModifyRegular); //解决了getFieldDecorator无法定义;
 
export default ModifyRegular;