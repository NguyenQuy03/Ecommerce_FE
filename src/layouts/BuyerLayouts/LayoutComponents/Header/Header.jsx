import Tippy from '@tippyjs/react/headless';
import { Badge, Col, Dropdown, Row, Typography } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Cart, ChevronDown, Search, ShopWindow } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Buyer/Button';
import { Popper as PopperWrapper } from '~/components/Buyer/Popper';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);
const { Text } = Typography;

const items = [
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
            {/* <Col span={24}> */}
            <Row className={cx('inner')} justify="space-between" align="middle">
                <Col sm={12} lg={6}>
                    <Link to="/">
                        <img src={images.logo} alt="ZEcommerce" />
                    </Link>
                </Col>

                <Col lg={12} sm={24}>
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>
                                        <ShopWindow /> Search "Quan" Shops
                                    </h4>
                                    {/* <SearchSuggestItem />
                                    <SearchSuggestItem />
                                    <SearchSuggestItem />
                                    <SearchSuggestItem /> */}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input placeholder="Search for products" spellCheck={false} />

                            <button className={cx('search-btn')}>
                                <Search />
                            </button>
                        </div>
                    </Tippy>
                </Col>

                <Col className={cx('actions')} sm={12} lg={6}>
                    {isLogin ? (
                        <Row justify="end" align={'middle'}>
                            <Badge
                                className={cx('cart-content')}
                                color="#d19c97"
                                count={orderQuantity}
                                overflowCount={9}
                            >
                                <Cart />
                            </Badge>
                            <Dropdown
                                className={cx('drop-down')}
                                menu={{
                                    items,
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
            {/* </Col> */}
        </AntHeader>
    );
}

export default Header;
