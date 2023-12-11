import { Card, Flex } from 'antd';

import classNames from 'classnames/bind';
import styles from './CardCarousel.module.scss';
const cx = classNames.bind(styles);

function CardCategoryItem({ data }) {
    function isEmpty() {
        for (const prop in data) {
            if (Object.hasOwn(data, prop)) {
                return false;
            }
        }

        return true;
    }

    if (isEmpty()) {
        return <></>;
    } else {
        return (
            // <Link to={'/cart'}>
            // </Link>
            <Card
                className={cx('card-item')}
                hoverable
                cover={
                    <div style={{ overflow: 'hidden' }}>
                        <img src={data.thumbnail} alt="Card" />
                    </div>
                }
                bodyStyle={{ padding: '4px' }}
            >
                <Flex className={cx('content')} vertical justify="space-between">
                    <Flex className={cx('header')} justify='center'>
                        <div className={cx('header-title')}>
                            <p>{data.code}</p>
                        </div>
                    </Flex>
                </Flex>
            </Card>
        );
    }
}

export default CardCategoryItem;
