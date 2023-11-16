
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import Tippy from '@tippyjs/react/headless';
import { Search, CaretDownFill, Cart, ShopWindow } from 'react-bootstrap-icons';

import { Wrapper as PopperWrapper } from '~/components/Buyer/Popper';
import images from '~/assets/images';
import SearchItem from '~/components/Buyer/SearchItem';
import Button from '~/components/Buyer/Button';
import Menu from '~/components/Buyer/Popper/Menu';

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        title: 'My Profile',
        to: '/profile'
    },
    {
        title: 'My Purchase',
        to: '/purchase'
    },
    {
        title: 'Register Seller'
    },
    {
        title: 'Sign out'
    },
]

function Header() {

    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 1000)
    }, [])

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="ZEcommerce" />

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
                                    <SearchItem />
                                    <SearchItem />
                                    <SearchItem />
                                    <SearchItem />
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
                    {/* <Button outline className={cx('custom-upload')}>Login</Button>
                    <Button primary >Sign up</Button> */}
                    <Button small outline rounded leftIcon={<Cart />}>
                        3
                    </Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}><CaretDownFill /></button>
                    </Menu>
                </div>
            </div>
        </header >
    );
}

export default Header;