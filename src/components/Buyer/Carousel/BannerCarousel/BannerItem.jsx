import { Col, Row } from 'antd';

import classNames from 'classnames/bind';
import styles from './BannerCarousel.module.scss';
const cx = classNames.bind(styles);

function BannerItem({ data }) {
    return (
        <Row className={cx('item')}>
            <Col lg={24}>
                <img src={data} alt="Banner" />
            </Col>
        </Row>
    );
}

export default BannerItem;
