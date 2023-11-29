import { Footer as AntdFooter } from 'antd/es/layout/layout';

import classNames from 'classnames/bind';
import styles from '../Footer/Footer.module.scss';
import { Row } from 'antd';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <AntdFooter className={cx('wrapper')}>
            <Row>Footer</Row>
        </AntdFooter>
    );
}

export default Footer;
