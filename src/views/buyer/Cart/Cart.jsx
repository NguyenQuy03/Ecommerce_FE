import { Affix, Col, Row, Table } from 'antd';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { RcmProducts } from '~/components/Grid';

import classNames from 'classnames/bind';
import { WrapperComponent, WrapperContent } from '~/components/Wrapper';
import styles from './Cart.module.scss';
import ProductService from '~/services/ProductService';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Unit Price',
        dataIndex: 'unitPrice',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];
const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        product: `Edward King ${i}`,
        unitPrice: 32,
        quantity: `London, Park Lane no. ${i}`,
        totalPrice: `Total Lane no. ${i}`,
        action: `Action, Park Lane no. ${i}`,
    });
}
const Cart = () => {
    const productService = ProductService();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [shopProducts, setShopProducts] = useState([]);

    useEffect(() => {
        // getProductsBySellerId({ id })
        //     .then((response) => {
        //         setShopProducts(response);
        //         console.log(response);
        //     })
        //     .catch((error) => console.error('Error fetching data:', error));
        productService.getProducts()
            .then((response) => {
                setShopProducts(response);
                console.log(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    // const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            <WrapperComponent>
                <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    bordered
                    size={'large'}
                    title={() => `Shopping Cart (${shopProducts.length} items)`}
                />
            </WrapperComponent>
            <WrapperComponent>
                <Affix offsetBottom={0}>
                    <WrapperContent className={cx('affix-container')}>
                        <Row>
                            <Col span={12}></Col>
                            <Col span={12}>
                                <Row>Platform Voucher</Row>
                                <Row justify={'end'}>
                                    <Col span={6}>
                                        <span>{`Selected (${selectedRowKeys.length} items): `}</span>
                                        <span>{`$100`}</span>
                                    </Col>

                                    <Col span={6}>
                                        <Button type={'primary'} size={'large'}>
                                            Check Out
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </WrapperContent>
                </Affix>
            </WrapperComponent>

            {/* YOU MAY ALSO LIKE */}
            <RcmProducts title={'YOU MAY ALSO LIKE'} items={shopProducts} />
        </>
    );
};
export default Cart;
