import { Card, Flex } from 'antd';

import classNames from 'classnames/bind';
import styles from './CardCarousel.module.scss';
const cx = classNames.bind(styles);

function CardItem({ data }) {
    return (
        <Card
            className={cx('card-item')}
            hoverable
            cover={<div style={{overflow: 'hidden'}}><img src={data.image} alt="Card" /></div>}
            bodyStyle={{ padding: '4px'}}
        >
            <Flex className={cx('content')} vertical justify="space-between">
                <div className={cx('header')}>
                    <div className={cx('header-title')}>
                        <p>{data.name}</p>
                    </div>
                </div>
                <Flex className={cx('body')} vertical justify="space-between">
                    <Flex justify="space-between">
                        <p className={cx('main-title')}>{data.price}</p>
                        <p className={cx('sub-title')}>{data.sold}</p>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}

export default CardItem;
