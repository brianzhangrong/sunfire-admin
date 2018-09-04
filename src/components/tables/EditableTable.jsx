/**
 * Created by hao.cheng on 2017/4/16.
 */

import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form,Button } from 'antd';
import AddRegular from './AddRegular'
import ModifyRegular from './ModifyRegular'

import {fetchData, receiveData } from '@/action';
import {sunfireAdminSelectRegular,sunfireAdminUpdateRegular,sunfireAdminDeleteRegular} from '@/axios'
import { SUNFIRE_ADMIN_SELECT_REGULAR } from '../../axios/config';


// data.push({
//   key:0,
//   id: 0,
//   detail:`{"beginPosition":"1","beginSplitSymbol":"1","endPosition":"1","endSplitSymbol":"1","value":"sunfire"}`,
// });

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource:[],
      id:1,
      key:1,
      appName:props.appName
    }


    this.columns = [{
      title: '规则id',
      dataIndex: 'id',
      width: '7%',
      editable: 'true',
    }, {
      title: '描述',
      dataIndex: 'detail',
      width: '80%',
      editable: 'true',
    },{
      title: '操作',
      dataIndex: 'operation',
   
      render: (text, record) => {
        return (
          this.state.dataSource.length >= 1
            ? (
              <div>
              <ModifyRegular id={record.id} detail={record.detail} callback={this.modifyRule}/>
              <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)}>
                {/* <a href="javascript:;"> 删除</a> */}
                <Button type="primary" size="small" >删除</Button>
              </Popconfirm>
             
              </div>
            ) : null
        );
      },
    }];
   

    this.modifyRule=this.modifyRule.bind(this);
    this.appendRule=this.appendRule.bind(this);
  
  }
  componentDidMount(){
    let self =this;
    // 发起 ajax 获取到数据后调用 setState 方法更新组件的数据
    let regular= sunfireAdminSelectRegular({appName:this.state.appName},(res)=>{res.data.map((k,v)=>{
      let dataSource={
        detail:JSON.stringify(k),
        id:k.id,
        key:k.id,
     }
   
     self.setState( {
        dataSource:[...this.state.dataSource,dataSource],
        id:k.id,
        key:k.id
      }
      )
    })});
  }
  componentWillUnmount(){
    
  }
 
  componentWillMount(){
    // const data =fetchData({funcName: sunfireAdminSelectRegular, param: {"appName":"irayProxy"}})
    // 拉取远程数据
    // 开启假数据服务器：
    // cd fake-server && npm install && node index.js
   
   
    
  }
 // this.state = {
  //   dataSource: [{
  //     id: 0,
  //     key:0,
  //     detail: '{"beginPosition":"1","beginSplitSymbol":"1","endPosition":"1","endSplitSymbol":"1","value":"sunfire"}',
     
  //   }, {
  //     key:1,
  //     id: 1,
  //     detail: '{"beginPosition":"1","beginSplitSymbol":"1","endPosition":"1","endSplitSymbol":"1","value":"sunfire"}',
  
  //   }],
  //   id: 2,
  //   key:2,
  // };
// 使用自定义的 fetchData 方法从远程服务器获取数据
  


  
  modifyRule(event){//得到子元素传过来的值   
  
   const { id,key, dataSource } = this.state;
 
   let  newDataSource =Object.assign(dataSource) 
 
   newDataSource.forEach(function (element) {
    Object.keys(element).some(function (key) {
        if (key == "id" && element.id==event.id) {
            let a ={};
            element.id= isArray(event.id),
            element.key= isArray(event.id),
            a.beginPosition= isArray(event.beginPosition),
            a.endPosition= isArray(event.endPosition),
            a.value = isArray(event.value),
            a.beginSplitSymbol= isArray(event.beginSplitSymbol),
            a.endSplitSymbol= isArray(event.endSplitSymbol),
            element.detail=JSON.stringify(a)
          //  console.log(event,"---",element)
          let updateRegular={}
          updateRegular.appName=this.state.appName
          updateRegular.regularList=new Array()
          let regular={}
          regular.beginPosition=a.beginPosition
          regular.beginSplitSymbol=a.beginSplitSymbol
          regular.endPosition=a.endPosition
          regular.endSplitSymbol=a.endSplitSymbol
          regular.value=a.value
          regular.id=element.id
          updateRegular.regularList.push(regular)
          sunfireAdminUpdateRegular(JSON.stringify(updateRegular),(res)=>{console.log("modify:",res.data)})
        }
      //  console.log(key)
    })
  })
  this.setState({dataSource:newDataSource,id:id,key:key})
  // let sortData =array.sort();//对遍历得到的数组进行排序
  // let MaxData = sortData[(this.state.dataSource.length)-1]//取最后一位下标的值
  // event.key=MaxData+1;
  // event.id = MaxData+1;
  // this.setState({
  //       dataSource:[...this.state.dataSource,{"id":event.id,"detail":JSON.stringify(event)}]
  //   })
    }
  handleDelete = (id) => {
    // console.log('delete:'+id)
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    
    dataSource.forEach((k,v)=>{
      let detail =JSON.parse(k.detail)
      console.log(detail.id+"delete:",id)
      if(detail.id==id){
        console.log('deleteId:',id)
        let deleteRegular={}
        deleteRegular.appName = this.state.appName
        deleteRegular.regularList = new Array()
        let regular ={}
        regular.id=id
      
        regular.beginPosition=detail.beginPosition
        regular.endPosition=detail.endPosition
        regular.beginSplitSymbol=detail.beginSplitSymbol
        regular.endSplitSymbol=detail.endSplitSymbol
        deleteRegular.regularList.push(regular)
        // console.log(detail.beginPosition+"==="+detail.endPosition)
        sunfireAdminDeleteRegular(JSON.stringify(deleteRegular),(res)=>{console.log("deleteRegular:",res.data)})
      }
    })
   
  }

  handleAdd = () => {
    const { id, dataSource } = this.state;
    const newData = {
      id: id,
      key:id,
      detail: ``,
  
    };
    this.setState({
      dataSource: [...dataSource, newData],
      id: id + 1,
      key:id+1,
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
}

appendRule(event){//得到子元素传过来的值
//  console.log(event)
//   let array = [];
//   let id = 0;
//console.log(this.state)
const { id, dataSource } = this.state;
  const newData = {
    "id": id+1,
    "key":id+1,
    "detail": JSON.stringify(event),

  };
  this.setState({
    dataSource: [...dataSource, newData],
    id: id+1 ,
    key:id+1,
  });
  let updateRegular={}
  updateRegular.appName=this.state.appName
  updateRegular.regularList=new Array()
  let regular={}
  regular.beginPosition=event.beginPosition
  regular.beginSplitSymbol=event.beginSplitSymbol
  regular.endPosition=event.endPosition
  regular.endSplitSymbol=event.endSplitSymbol
  regular.value=event.value
  regular.id=isArray(event.id)
  updateRegular.regularList.push(regular)
  sunfireAdminUpdateRegular(JSON.stringify(updateRegular),(res)=>{console.log("updateres:",res.data)})
}
  render() {
   // console.log(this.state)
  
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          // handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增规则
        </Button> */}
        <AddRegular  callback={this.appendRule} id={this.state.id+1}/>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll ={{y:400}}
        />
      </div>
    );
  }
}

const isArray=(obj)=>{if( Object.prototype.toString.call(obj) === '[object Array]'){
  return isArray(obj[0]);
}else{
  return obj;
}}