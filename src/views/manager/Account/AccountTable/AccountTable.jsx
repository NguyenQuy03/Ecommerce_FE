import { useRef, useState } from 'react';
import { Plus, Search } from 'react-bootstrap-icons';

import { Flex, Input, Popconfirm, Select, Space, Table, Tabs } from 'antd';
import Button from '~/components/Button';

import classNames from 'classnames/bind';
import styles from './AccountTable.module.scss';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';
const cx = classNames.bind(styles);

const data = [
    {
        key: '1',
        name: 'John Brown',
        email: 32,
        phone: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        email: 42,
        phone: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        email: 32,
        phone: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        email: 32,
        phone: 32,
        address: 'London No. 2 Lake Park',
    },
];
const AccountTable = () => {
    const searchInput = useRef(null);
    const handleSearch = (confirm) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div className={cx('search-container')} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button type="primary" onClick={() => handleSearch(confirm)} size="small">
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" type={'outline'}>
                        Reset
                    </Button>
                    <Button
                        type="default"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="transparent"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <Search
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

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
                <h1 className={cx('title')}>Buyers</h1>
                {!hasSelected ? (
                    <Button
                        to={'/manager/account'}
                        size={'small'}
                        type={'outline'}
                        leftIcon={<Plus />}
                        className={cx('add-btn')}
                    >
                        New
                    </Button>
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: (text) => <a href={text}>{text}</a>,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Billing Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
        },
    ];

    const tabs = [
        {
            key: 'all',
            label: 'All',
        },
        {
            key: 'buyer',
            label: 'Buyer',
        },
        {
            key: 'seller',
            label: 'Seller',
        },
    ];

    const handleTab = (tab) => {
        console.log(tab);
    };
    return (
        <Content>
            <Tabs defaultActiveKey="all" type="card" items={tabs} size="middle" onChange={(tab) => handleTab(tab)} />

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} title={renderTitle} />
        </Content>
    );
};
export default AccountTable;
