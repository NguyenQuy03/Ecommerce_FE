import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Cart, ChevronDown, Search, ShopWindow } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Popper as PopperWrapper } from '~/components/Buyer/Popper';

import { Dropdown } from 'antd';
import images from '~/assets/images';
import Button from '~/components/Buyer/Button';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

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

let orderQuantity = 10;

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 1000);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <img src={images.logo} alt="ZEcommerce" />
                </Link>

                <div>
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
                </div>

                <div className={cx('actions')}>
                    {isLogin ? (
                        <>
                            <Button
                                className={cx('cart-content')}
                                type={'transparent'}
                                size={'small'}
                                leftIcon={<Cart />}
                            >
                                <span className={cx('order-quantity')}>{orderQuantity}</span>
                            </Button>
                            <Dropdown
                                className={cx('drop-down')}
                                menu={{
                                    items,
                                }}
                                arrow={false}
                            >
                                <div className={cx('menu-title')}>
                                    <span className={cx('full-name')}>Nguyen Huy Quy</span>
                                    <ChevronDown />
                                </div>
                            </Dropdown>
                        </>
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
                </div>
            </div>
        </header>
    );
}

export default Header;
