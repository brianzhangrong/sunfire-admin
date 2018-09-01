/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table, Icon } from 'antd';
import Popconfirm from 'antd'
import EditableTable from './EditableTable'


const columns = [{
    title: '规则id',
    dataIndex: 'regularId',
    key: 'regularId',
    render: text => <a>{text}</a>,
}, {
    title: '规则详情',
    dataIndex: 'regularDetail',
    key: 'regularDetail',
},  {
    title: '修改',
    key: 'modify',
    render: (text, record) => (
        <span>
            <a>Delete</a>
            <span className="ant-divider" /> 
        </span>
    ),
}];

const data = [{
    key: '1',
    regularId: 1,
    regularDetail: "1--------",
    modify: '修改',
}, {
    key: '2',
    regularId: 2,
    regularDetail: "2--------",
    modify: '修改',
}, {
    key: '3',
    regularId: 23,
    regularDetail: "3--------",
    modify: '修改',
}];

//fetchData({funcName: 'admin', stateName: 'auth'});
class BasicTable  extends React.Component {
    constructor(props) {
        super(props);
    }
    
      render() {
       
        return (
          <div>
            {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
              Add a row
            </Button> */}
            <EditableTable
            />
          </div>
        );
      }
}
// <Table
// columns={self.tableColumns} //th菜单项
// rowKey={record => record.registered}
// dataSource={this.state.dataSource.data} //数据
// pagination={{  //分页
//     total: this.state.dataSource.count, //数据总数量
//     pageSize: this.state.queryInfo.pageSize,  //显示几条一页
//     defaultPageSize: this.state.queryInfo.pageSize, //默认显示几条一页
//     showSizeChanger: true,  //是否显示可以设置几条一页的选项
//     onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
//     　　self.toSelectchange(current, pageSize); //这边已经设置了self = this
//     },
//     onChange(current) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
//         self.gotoThispage(current, self.state.queryInfo.pageSize);
//     },                                         
//     showTotal: function () {  //设置显示一共几条数据
//         return '共 ' + this.state.dataSource.count + ' 条数据'; 
//     }
// }}
// loading={this.state.loading}  //设置loading属性
// />
export default BasicTable;