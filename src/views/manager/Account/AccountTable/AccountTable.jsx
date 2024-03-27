import { useRef, useState, useEffect } from 'react';
import { Plus, Search } from 'react-bootstrap-icons';

import { Flex, Input, Popconfirm, Select, Space, Table, Tabs, Tag, notification } from 'antd';
import Button from '~/components/Button';

import classNames from 'classnames/bind';
import styles from './AccountTable.module.scss';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';
import AccountService from '~/services/manager/AccountService';
const cx = classNames.bind(styles);

const AccountTable = () => {
    const accountService = AccountService();

    const searchInput = useRef(null);
    const [accounts, setAccounts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        accountService
            .getAccounts({ type: activeTab, page: '1', size: '2' })
            .then((response) => {
                setAccounts(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [activeTab]);

    const [api, notify] = notification.useNotification();
    const openNotificationWithIcon = (type, title, desc) => {
        api[type]({
            message: title,
            description: desc,
        });
    };

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
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // Handle Bulk Actions
    const [bulkActionValue, setBulkActionValue] = useState(null);

    const hasSelected = selectedRowKeys.length > 0;
    const confirm = (e) => {
        accountService
            .changeAccountStatus(selectedRowKeys, {
                action: bulkActionValue,
            })
            .then((response) => {
                const updatedAccounts = accounts.map((acc) => {
                    if (selectedRowKeys.includes(acc.id)) {
                        acc = { ...acc, active: bulkActionValue !== 'disable' };
                    }
                    return acc;
                });
                setAccounts(updatedAccounts);
                setBulkActionValue(null);
                setSelectedRowKeys([]);
                openNotificationWithIcon('success', response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const cancel = (e) => {
        console.log('Cancel');
    };

    const renderTitle = () => {
        return (
            <Flex justify="space-between">
                <h1 className={cx('title')}>{accounts.length + (accounts.length > 1 ? ' Accounts' : ' Account')}</h1>
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
                                    value: 'disable',
                                    label: 'Disable',
                                },
                                {
                                    value: 'active',
                                    label: 'Active',
                                },
                            ]}
                            onChange={(value) => {
                                setBulkActionValue(value);
                                console.log('selected value:', value);
                            }}
                        />
                        <Popconfirm
                            title="Are you sure to do this?"
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
            dataIndex: 'fullName',
            key: 'fullName',
            width: '30%',
            render: (text) => <a href={text}>{text}</a>,
            ...getColumnSearchProps('fullName'),
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
        {
            title: 'Status',
            key: 'active',
            dataIndex: 'active',
            render: (record) => (record ? <Tag color="green">Active</Tag> : <Tag color="red">Disabled</Tag>),
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

    const handleTab = (activeTab) => {
        setActiveTab(activeTab);
    };

    return (
        <Content>
            {notify}
            <Tabs
                defaultActiveKey="all"
                type="card"
                items={tabs}
                size="middle"
                onChange={(activeTab) => handleTab(activeTab)}
            />

            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={accounts}
                title={renderTitle}
                rowKey="id"
                pagination={{ pageSize: 1 }}
            />
        </Content>
    );
};
export default AccountTable;
