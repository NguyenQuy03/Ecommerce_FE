import { Dropdown, Space, Table, Tabs, Select, Popconfirm } from 'antd';
import { Plus, ThreeDots, FunnelFill } from 'react-bootstrap-icons';

import { useState } from 'react';

import { Flex } from 'antd';
import Button from '~/components/Button';

import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

import classNames from 'classnames/bind';
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
    },
    {
        key: 'delete',
        label: 'Delete',
        danger: true,
    },
];

const ProductTable = () => {
    const expandedRowRender = () => {
        const columns = [
            {
                title: 'SKU',
                dataIndex: 'sku',
                key: 'sku',
            },
            {
                title: 'Variations',
                dataIndex: 'variations',
                key: 'variations',
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

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                sku: 'Platinum web hosting package9',
                variations: '2',
                price: '15',
                stock: '30',
                sold: '30',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
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

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            product: (
                <>
                    <p>#201 by Miles Haley </p>
                    <p>haley@example.com</p>
                </>
            ),
            totalStock: '100',
            totalSold: '200',
        });
    }

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
                <h1 className={cx('title')}>3 Products</h1>
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
        console.log(tab);
    };

    return (
        <Content>
            <Tabs defaultActiveKey="all" type="card" items={tabs} size="middle" onChange={(tab) => handleTab(tab)} />
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={data}
                size="middle"
                title={renderTitle}
                rowSelection={rowSelection}
                bordered
            />
        </Content>
    );
};
export default ProductTable;
