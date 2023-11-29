import Tippy from '@tippyjs/react/headless';
import { Popper as PopperWrapper } from '~/components/Buyer/Popper';
import MenuItem from './MenuItem';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} data={item} />;
        });
    };

    return (
        <>
            <Tippy
                interactive
                delay={[0, 500]}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </>
    );
}

export default Menu;
