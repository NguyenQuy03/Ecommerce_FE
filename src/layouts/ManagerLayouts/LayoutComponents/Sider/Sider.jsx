import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { ArrowLeftRight, CardList, Person, ReceiptCutoff, List, FilterLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
const { Sider: AntSider } = Layout;

const items = [
    {
        key: 'acc',
        icon: <Person />,
        label: 'Account',
        children: [
            { key: 'acc1', label: <Link to={'/manager/account/seller/list'}>Seller Accounts</Link> },
            { key: 'acc2', label: <Link to={'/manager/account/buyer/list'}>Buyer Accounts</Link> },
            { key: 'acc3', label: <Link to={'/manager/account'}>Add New Account</Link> },
        ],
    },
    {
        key: 'sub2',
        icon: <CardList />,
        label: 'Categories',
        children: [
            { key: 'cat1', label: <Link to={'/manager/category/list'}>Category List</Link> },
            { key: 'cat2', label: <Link to={'/manager/category'}>Add New Category</Link> },
        ],
    },
    {
        key: 'sub3',
        icon: <ArrowLeftRight />,
        label: 'Transactions',
    },
    {
        key: 'sub4',
        icon: <ReceiptCutoff />,
        label: <Link to={'/manager/order/list'}>Orders</Link>,
    },
];

function Sider() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Button
                type="default"
                onClick={toggleCollapsed}
                leftIcon={collapsed ? <FilterLeft /> : <List />}
                size={'normal'}
                style={{
                    marginBottom: 16,
                    position: 'absolute',
                    top: '14px',
                    left: '10px'
                }}
            ></Button>

            <AntSider
                width={200}
                breakpoint="lg"
                theme={'light'}
                collapsed={collapsed}
                style={{ position: 'relative' }}
            >
                <Menu mode="inline" items={items} />
            </AntSider>
        </>
    );
}

export default Sider;
