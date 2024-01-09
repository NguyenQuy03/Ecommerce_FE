import { AutoComplete, Badge, Col, Dropdown, Flex, Input, Row, Typography } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Cart, ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Buyer/Button';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);
const { Text } = Typography;

const renderTitle = (title) => <span>{title}</span>;
const renderItem = (title) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
        </div>
    ),
});
const options = [
    {
        label: renderTitle('Shops'),
        options: [renderItem('AntDesign'), renderItem('AntDesign UI')],
    },
    {
        label: renderTitle('Products'),
        options: [renderItem('AntDesign UI FAQ'), renderItem('AntDesign FAQ')],
    },
];

const menuItems = [
    {
        key: '1',
        label: <Link to="/profile">My Profile</Link>,
    },
    {
        key: '2',
        label: <Link to="/purchase">My Purchase</Link>,
    },
    {
        key: '3',
        label: <Link to="/register-seller">Register Seller</Link>,
    },
    {
        key: '4',
        label: <Link to="/sign-out">Sign out</Link>,
    },
];

let isLogin = true;

let orderQuantity = 9;

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 1000);
    }, []);

    return (
        <AntHeader className={cx('wrapper')}>
            <Row className={cx('inner')} justify="space-between" align="middle">
                <Col sm={12} lg={6}>
                    <Link to="/">
                        <img src={images.logo} alt="ZEcommerce" />
                    </Link>
                </Col>

                <Col lg={12} sm={24} style={{ display: 'flex' }}>
                    <AutoComplete className={cx('search')} options={options} allowClear>
                        <Input.Search size="large" placeholder="Search for products" />
                    </AutoComplete>
                </Col>

                <Col className={cx('actions')} sm={12} lg={6}>
                    {isLogin ? (
                        <Row justify="end" align={'middle'}>
                            <Link to={'/cart'}>
                                <Badge
                                    className={cx('cart-content')}
                                    color="#d19c97"
                                    count={orderQuantity}
                                    overflowCount={9}
                                >
                                    <Cart />
                                </Badge>
                            </Link>
                            <Dropdown
                                className={cx('drop-down')}
                                menu={{
                                    items: menuItems,
                                }}
                                arrow={false}
                            >
                                <div className={cx('menu-title')}>
                                    <Text
                                        style={{
                                            width: 120,
                                        }}
                                        ellipsis={{
                                            tooltip: <></>,
                                        }}
                                    >
                                        Nguyen Huy Quy
                                    </Text>
                                    <ChevronDown />
                                </div>
                            </Dropdown>
                        </Row>
                    ) : (
                        <>
                            <Button type={'outline'} to={'/login'}>
                                Login
                            </Button>
                            <Button type={'primary'} to={'/register'}>
                                Sign up
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
        </AntHeader>
    );
}

export default Header;
