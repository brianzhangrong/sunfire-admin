/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import BasicTable from './BasicTable';
import SelectTable from './SelectTable';
import SortTable from './SortTable';
import SearchTable from './SearchTable';
import BreadcrumbCustom from '../BreadcrumbCustom';

const BasicTables = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="监控配置" second="app元数据" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="规则引擎配置" bordered={false}>
                        <BasicTable  />
                    </Card>
                </div>
            </Col>

            {/*<Col className="gutter-row" span={10}>*/}
                {/*<div className="gutter-box">*/}
                    {/*<Card title="弹层表单" bordered={false}>*/}
                    {/*</Card>*/}
                {/*</div>*/}
            {/*</Col>*/}
        </Row>
        {/* <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="基础表格" bordered={false}>
                        <SelectTable />
                    </Card>
                </div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="可控的筛选和排序" bordered={false}>
                        <SortTable />
                    </Card>
                </div>
            </Col>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="自定义筛选" bordered={false}>
                        <SearchTable />
                    </Card>
                </div>
            </Col>
        </Row> */}
    </div>
);

export default BasicTables;