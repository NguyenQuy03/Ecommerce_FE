import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { ArrowLeftRight, CardList, Person, ReceiptCutoff, List, FilterLeft, Box2Heart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
const { Sider: AntSider } = Layout;

const items = [
    {
        key: 'transaction',
        icon: <ArrowLeftRight />,
        label: <Link to={'/manager/transaction/list'}>Transactions</Link>,
    },
    {
        key: 'order',
        icon: <ReceiptCutoff />,
        label: <Link to={'/manager/order/list'}>Orders</Link>,
    },
    {
        key: 'account',
        icon: <Person />,
        label: 'Account',
        children: [
            { key: 'acc1', label: <Link to={'/manager/account/list'}>User Accounts</Link> },
            { key: 'acc2', label: <Link to={'/manager/account'}>Add Account</Link> },
        ],
    },
    {
        key: 'category',
        icon: <CardList />,
        label: 'Categories',
        children: [
            { key: 'cat1', label: <Link to={'/manager/category/list'}>Category List</Link> },
            { key: 'cat2', label: <Link to={'/manager/category'}>Add Category</Link> },
        ],
    },
    {
        key: 'product',
        icon: <Box2Heart />,
        label: 'Products',
        children: [
            { key: 'pro1', label: <Link to={'/manager/product/list'}>Product List</Link> },
            { key: 'pro2', label: <Link to={'/manager/product'}>Add Product</Link> },
        ],
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
                    left: '10px',
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
