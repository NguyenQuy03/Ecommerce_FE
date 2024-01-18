import { Menu, Layout } from 'antd';
import { ArrowLeftRight, CardList, Person } from 'react-bootstrap-icons';

const { Sider: AntSider } = Layout;


const items = [
    {
        key: 'acc',
        icon: <Person />,
        label: 'Account',
        children: [
            { key: 'acc1', label: 'Seller Accounts' },
            { key: 'acc2', label: 'Buyer Accounts' },
        ],
    },
    {
        key: 'sub2',
        icon: <CardList />,
        label: 'Categories',
        children: [
            { key: 'cat1', label: 'Category List' },
            { key: 'cat2', label: 'Add New Category' },
        ],
    },
    {
        key: 'sub3',
        icon: <ArrowLeftRight />,
        label: 'Transactions',
    },
];

function Sider() {
    return (
        <AntSider width={200} breakpoint="lg" theme={'light'}>
            <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                items={items}
            />
        </AntSider>
    );
}

export default Sider;
