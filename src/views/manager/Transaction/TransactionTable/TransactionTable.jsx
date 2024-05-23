import { Dropdown, Space, Table } from 'antd';
import { FunnelFill, ThreeDots } from 'react-bootstrap-icons';

import { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';

import { Flex, Popconfirm, Select } from 'antd';
import Button from '~/components/Button';

import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

import classNames from 'classnames/bind';
import styles from './TransactionTable.module.scss';
const cx = classNames.bind(styles);

const actionItems = [
    {
        key: 'complete',
        label: 'Complete',
    },
    {
        key: 'processing',
        label: 'Processing',
    },
    {
        key: 'onHold',
        label: 'On Hold',
    },
    {
        key: 'pending',
        label: 'Pending',
    },
    {
        key: 'delete',
        label: 'Delete',
        danger: true,
    },
];

const TransactionTable = () => {
    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Order',
                dataIndex: 'order',
                key: 'order',
            },
            {
                title: 'Ship To',
                dataIndex: 'shipTo',
                key: 'shipTo',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Order Total',
                dataIndex: 'orderTotal',
                key: 'orderTotal',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: () => <div>Refund</div>,
            },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                order: 'Platinum web hosting package9',
                shipTo: '2',
                status: '15',
                orderTotal: '30',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} size="large" />;
    };

    const columns = [
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            key: 'buyer',
            sorter: (a, b) => a.order - b.order,
        },
        {
            title: 'Seller',
            dataIndex: 'seller',
            key: 'seller',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Total Payment',
            dataIndex: 'totalPayment',
            key: 'totalPayment',
        },
        {
            title: '',
            dataIndex: 'action',
            render: () => (
                <Space size="middle">
                    <Dropdown
                        menu={{
                            items: actionItems,
                        }}
                    >
                        <ThreeDots />
                    </Dropdown>
                </Space>
            ),
        },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            buyer: <p>#201 by Miles Haley </p>,
            seller: <p>haley@example.com</p>,
            product: 'iOS',
            status: 'Complete',
            totalPayment: '100',
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
            <Flex justify="space-between" style={{ marginTop: '-12px' }}>
                <h1 className={cx('title')}>Recent Purchases</h1>
                {!hasSelected ? (
                    <Flex>
                        <Button
                            to={'/manager/account'}
                            size={'small'}
                            type={'outline'}
                            leftIcon={<Plus />}
                            className={cx('btn')}
                            disabled
                        >
                            New
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
                                    value: 'refund',
                                    label: 'Refund',
                                },
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

    return (
        <Content>
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
            />
        </Content>
    );
};
export default TransactionTable;
