import { Dropdown, Popconfirm, Select, Table, Tabs } from 'antd';
import { FunnelFill, Plus, ThreeDots } from 'react-bootstrap-icons';

import { useEffect, useState } from 'react';

import { Flex } from 'antd';
import Button from '~/components/Button';

import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

import classNames from 'classnames/bind';
import ProductService from '~/services/manager/ProductService';
import styles from './ProductTable.module.scss';
const cx = classNames.bind(styles);

const actionItems = [
    {
        key: 'edit',
        label: 'Edit',
    },
    {
        key: 'copy',
        label: 'Copy',
        disabled: true,
    },
    {
        key: 'delete',
        label: 'Delete',
        danger: true,
    },
];

const ProductTable = () => {
    const productService = ProductService();

    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        productService
            .getProductsByStatus({ type: activeTab })
            .then((res) => {
                const modifiedProducts = res.map((product) => ({
                    ...product,
                    totalStock: product.additionalInfo.totalStock,
                    totalSold: product.additionalInfo.totalSold,
                }));
                setProducts(modifiedProducts);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [activeTab, productService]);

    const expandedRowRender = (product) => {
        const columns = [
            {
                title: 'SKU',
                dataIndex: 'sku',
                key: 'sku',
            },
            {
                title: 'Variation',
                dataIndex: 'variation',
                key: 'variation',
                render: (variation) => {
                    return Object.entries(variation).map(([key, value]) => (
                        <div key={key}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                        </div>
                    ));
                },
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Stock',
                dataIndex: 'stock',
                key: 'stock',
            },
            {
                title: 'Sold',
                dataIndex: 'sold',
                key: 'sold',
            },
        ];

        product.productItems.forEach((item) => {

            try {
                item.variation = JSON.parse(item.variation);
            } catch (error) {
                console.log(error);
            }
        });

        return <Table columns={columns} dataSource={product.productItems} pagination={false} rowKey="id" />;
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.product - b.product,
        },
        {
            title: 'Total Stock',
            dataIndex: 'totalStock',
            key: 'totalStock',
        },
        {
            title: 'Total Sold',
            dataIndex: 'totalSold',
            key: 'totalSold',
        },
        {
            title: '',
            dataIndex: 'action',
            render: () => (
                <Dropdown
                    menu={{
                        items: actionItems,
                    }}
                    trigger={['click']}
                    className={cx('drop-down')}
                >
                    <ThreeDots />
                </Dropdown>
            ),
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // Handle Bulk Actions
    const [bulkActionValue, setBulkAcionValue] = useState(null);

    const hasSelected = selectedRowKeys.length > 0;
    const confirm = (e) => {
        console.log(bulkActionValue);
    };
    const cancel = (e) => {
        console.log('Cancel');
    };

    const renderTitle = () => {
        return (
            <Flex justify="space-between">
                <h1 className={cx('title')}>{products.length + (products.length > 1 ? " Products" : " Product")} </h1>
                {!hasSelected ? (
                    <Flex>
                        <Button
                            to={'/manager/account'}
                            size={'small'}
                            type={'primary'}
                            leftIcon={<Plus />}
                            className={cx('btn')}
                        >
                            Add New Product
                        </Button>
                        <Button size={'small'} type={'outline'} leftIcon={<FunnelFill />} className={cx('btn')}>
                            Filter
                        </Button>
                    </Flex>
                ) : (
                    <Flex align="center" gap={10}>
                        <Select
                            style={{
                                minWidth: 120,
                            }}
                            placeholder="Bulk Actions"
                            options={[
                                {
                                    value: 'delete',
                                    label: 'Delete',
                                },
                            ]}
                            onChange={(value) => {
                                setBulkAcionValue(value);
                                console.log('selected value:', value);
                            }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size={'small'} type={'outline'} disabled={!bulkActionValue}>
                                Apply
                            </Button>
                        </Popconfirm>
                    </Flex>
                )}
            </Flex>
        );
    };

    const tabs = [
        {
            key: 'all',
            label: 'All',
        },
        {
            key: 'live',
            label: 'Live',
        },
        {
            key: 'soldout',
            label: 'Sold Out',
        },
    ];

    const handleTab = (tab) => {
        setActiveTab(tab)
    };

    return (
        <Content>
            <Tabs defaultActiveKey="all" type="card" items={tabs} size="middle" onChange={(tab) => handleTab(tab)} />
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => expandedRowRender(record),
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={products}
                size="middle"
                title={renderTitle}
                rowSelection={rowSelection}
                bordered
                rowKey="id"
                pagination={{ pageSize: 1 }}
                />
        </Content>
    );
};
export default ProductTable;
