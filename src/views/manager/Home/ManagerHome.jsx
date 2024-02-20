import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';
function ManagerHome() {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="Customers"
                        value={11.28}
                        precision={2}
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                    <Link to={'/manager/account/list'}>See All</Link>
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="Orders"
                        value={9.3}
                        precision={2}
                        valueStyle={{
                            color: '#cf1322',
                        }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                    <Link to={'/manager/order/list'}>All Orders</Link>
                </Card>
            </Col>
        </Row>
    );
}

export default ManagerHome;
