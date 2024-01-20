import { Col, Divider, Flex, Table } from 'antd';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Products',
        dataIndex: 'product',
        key: 'product',
        render: (text) => <Link to={'/'}>{text}</Link>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];
const data = [
    {
        key: '1',
        product: 'John Brown',
        quantity: 2,
        rate: 30,
        amount: 60,
    },
    {
        key: '2',
        product: 'John Brown',
        quantity: 2,
        rate: 30,
        amount: 60,
    },
    {
        key: '3',
        product: 'John Brown',
        quantity: 2,
        rate: 30,
        amount: 60,
    },
];

function OrderDetail() {
    return (
        <div>
            <Flex vertical>
                <Flex justify="space-between">
                    <h1 className={cx('header-title')}>
                        OrderDetail: <span>#2737</span>
                    </h1>
                </Flex>
                <div>April 21, 2019, 5:33 PM</div>
                <div>
                    Status: <span>Completed</span>
                </div>
            </Flex>
            <Divider />

            <Flex justify="space-between">
                <Col span={12}>
                    <h3 className={cx('header-form')}>Shipping Address</h3>
                    <p>Antony Hopkins</p>
                    <p>2393 Main Avenue Penasauka, New Jersey 87896</p>
                    <p>
                        Email: <span>huyquy2003@gmail.com</span>
                    </p>
                    <p>
                        Phone: <span>0862193055</span>
                    </p>
                </Col>
                <Col span={12}>
                    <h3 className={cx('header-form')}>Payment Method</h3>
                </Col>
            </Flex>
            <Divider />

            <Table columns={columns} dataSource={data} bordered pagination={false} />
            <Divider />

            <Flex>
                <Col span={20}></Col>
                <Col span={4}>
                    <Flex justify="space-between">
                        <p>Subtotal</p> <span>$6,230.00</span>
                    </Flex>
                    <Flex justify="space-between">
                        <p>Tax 5%</p>
                        <span>$311.50</span>
                    </Flex>
                    <Divider style={{ margin: '4px 0' }} />
                    <Flex justify="space-between">
                        <p>Total</p>
                        <span>$6541.50</span>
                    </Flex>
                </Col>
            </Flex>
        </div>
    );
}

export default OrderDetail;
