import React from 'react';
import {Form,Input,Button,Select,Modal} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;
 
class  AddRegular extends React.Component{//在es6中定义一个AddRule类
     constructor(props){//构造函数
         super(props);
         this.state = {
             visible:false
         };
         this.handleAdd = this.handleAdd.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleOk = this.handleOk.bind(this)
         this.handleClear = this.handleClear.bind(this)
       
    
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
                //  console.log('接收的值：',values);
                 this.setState({
                     visible:false,
                    beginPosition:values.beginPosition,
                    beginSplitSymbol:values.beginSplitSymbol,
                    endPosition:values.endPosition,
                    endSplitSymbol:values.endSplitSymbol,
                    value:values.value,
                    id:values.id,
                 })
                 this.props.form.resetFields();//清空提交的表单
                 //当值传递到父元素后，通过回调函数触发appendPerson方法将参数values带到父元素
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
                <Button type="primary" onClick={this.handleAdd}>添加规则</Button>
            <Modal title="新建规则" visible={this.state.visible} onCancel={this.handleOk} onOk={this.handleOk}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label = "规则id:"  hasFeedback>
                
                         <Input value={this.props.id} disabled={true} size="small" style={{width:50}} ></Input>
                            
                    </FormItem>
                    <FormItem {...formItemLayout} label = "起始位置"  hasFeedback>
                    {getFieldDecorator('beginPosition', {
                                rules: [ {
                                    required: true, message: '请输入规则起始位置'
                                }]
                            })(
                            <Input name="beginPosition" maxLength="5" size="small" prefix="第" suffix="个" style={{width:120}} />
                            )
                        }
                          {getFieldDecorator('beginSplitSymbol', {
                                rules: [{
                                    required: true, message: '请输入规则起始位置'
                                }]
                            })(
                            <Input name="beginSplitSymbol" maxLength="5" size="small" suffix="符" style={{width:120}}/>
                            )
                        }
                    </FormItem>
                 
                    <FormItem {...formItemLayout} label = "终止位置"  hasFeedback>
                    {getFieldDecorator('endPosition', {
                                rules: [{
                                    required: true, message: '请输入规则终止位置'
                                }]
                            })(
                            <Input name="endPosition" maxLength="5" size="small" prefix="第" suffix="个"  style={{width:120}} />
                            )
                            }
                             {getFieldDecorator('endSplitSymbol', {
                                rules: [{
                                    required: true, message: '请输入规则终止位置'
                                }]
                            })(
                                <Input name="endSplitSymbol" maxLength="5" size="small" suffix="符" style={{width:120}}/>
                            )}
                    </FormItem>
                  
                    <FormItem {...formItemLayout} label = "匹配规则"  hasFeedback >
                    {getFieldDecorator('value', {
                                rules: [{
                                    required: true, message: '请输入规则终止位置'
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
AddRegular = Form.create()(AddRegular); //解决了getFieldDecorator无法定义;
 
export default AddRegular;