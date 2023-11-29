
import classNames from 'classnames/bind';
import styles from './Menu.module.scss'

import Button from '~/components/Buyer/Button';

const cx = classNames.bind(styles)

function MenuItem({ data }) {
    return (
        <Button type={"transparent"} className={cx('menu-item')} leftIcon={data.icon} to={data.to}>{data.title}</Button>
    );
}

export default MenuItem;