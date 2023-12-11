
import { Flex } from 'antd';

import classNames from 'classnames/bind';
import styles from './LayoutBlank.module.scss';
const cx = classNames.bind(styles);

function LayoutBlank({ children }) {
    return (
        <Flex vertical justify='center' align='center' className={cx('wrapper')}>
            <Flex vertical justify='center' align='center' className={cx('container')}>{children}</Flex>
        </Flex>
    );
}

export default LayoutBlank;
