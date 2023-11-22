import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { CaretDownFill, Cart, Search, ShopWindow } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Buyer/Popper';
import styles from './Header.module.scss';

import images from '~/assets/images';
import Button from '~/components/Buyer/Button';
import Menu from '~/components/Buyer/Popper/Menu';
import SearchSuggestItem from '~/components/Buyer/SearchSuggestItem/SearchSuggestItem';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'My Profile',
        to: '/profile',
    },
    {
        title: 'My Purchase',
        to: '/purchase',
    },
    {
        title: 'Register Seller',
        to: '/register-seller',
    },
    {
        title: 'Sign out',
        to: '/sign-out',
    },
];

let isLogin = false;

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
                                    <SearchSuggestItem />
                                    <SearchSuggestItem />
                                    <SearchSuggestItem />
                                    <SearchSuggestItem />
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
                            <Button small none leftIcon={<Cart />}>
                                3
                            </Button>

                            <button className={cx('drop-down')}>
                                <div>Nguyen Huy Quy</div>
                                <Menu items={MENU_ITEMS}>
                                    <CaretDownFill />
                                </Menu>
                            </button>
                        </>
                    ) : (
                        <>
                            <Button outline to={'/login'}>
                                Login
                            </Button>
                            <Button primary to={'/register'}>
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
