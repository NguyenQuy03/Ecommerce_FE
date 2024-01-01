import { Row, Col } from 'antd';

import classNames from 'classnames/bind';
import styles from './WrapperComponent.module.scss';
const cx = classNames.bind(styles);

const WrapperComponent = function ({ children }) {
    return (
        <Row className={cx('container')} gutter={[150, 0]}>
            <Col span={24}>{children}</Col>
        </Row>
    );
};

export default WrapperComponent;
