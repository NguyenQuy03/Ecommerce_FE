
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import Tippy from '@tippyjs/react/headless';

import { ImSpinner2 } from 'react-icons/im';
import { AiFillCloseCircle, AiOutlinePlus, AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsSearch, BsThreeDotsVertical, BsKeyboard } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <MdLanguage />,
        title: 'English'
    },
    {
        icon: <AiOutlineQuestionCircle />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <BsKeyboard />,
        title: 'Keyboard shortcuts'
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
                <img src={images.logo} alt="Tiktok" />

                <div>
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h4 className={cx('search-title')}>Accounts</h4>
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('search')}>
                            <input placeholder="Search accounts and videos" spellCheck={false} />
                            <button className={cx('clear')}>
                                <AiFillCloseCircle />
                            </button>

                            <button className={cx('loading')}>
                                <ImSpinner2 />
                            </button>

                            <button className={cx('search-btn')}>
                                <BsSearch />
                            </button>
                        </div>
                    </Tippy>
                </div>

                <div className={cx('actions')}>
                    <Button outline className={cx('custom-upload')} leftIcon={<AiOutlinePlus />}>Upload</Button>
                    <Button primary >Log in</Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-btn')}><BsThreeDotsVertical /></button>
                    </Menu>
                </div>
            </div>
        </header >
    );
}

export default Header;