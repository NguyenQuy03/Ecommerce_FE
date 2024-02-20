import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

const SellerHome = () => (
    <>
        <Card>
            <Card.Grid style={gridStyle}>
                <Statistic
                    title="Orders"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
                <Statistic
                    title="Items Sold"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
            </Card.Grid>
            <Card.Grid style={gridStyle}>
                <Statistic
                    title="Refunds"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
            </Card.Grid>
            <Card.Grid style={gridStyle}>
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
            </Card.Grid>
        </Card>
        <Content>
            Top Products
        </Content>
    </>
);
export default SellerHome;
