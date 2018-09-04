/**
 * Created by hao.cheng on 2017/5/7.
 */
import React from 'react';
import BasicTable from '.'


class AppTables extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
                 <BasicTable appName={}></BasicTable>
            </div>
        )
    }
}

export default NotFound;