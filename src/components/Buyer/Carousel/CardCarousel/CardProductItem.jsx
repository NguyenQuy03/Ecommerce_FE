import { Card, Flex } from 'antd';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CardCarousel.module.scss';
const cx = classNames.bind(styles);

function CardProductItem({ data }) {
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
            <Link to={`/product/detail/${data.id}`}>
                <Card
                    className={cx('card-item')}
                    hoverable
                    cover={
                        <div style={{ overflow: 'hidden' }}>
                            <img src={data.image} alt="Card" />
                        </div>
                    }
                    bodyStyle={{ padding: '4px' }}
                >
                    <Flex className={cx('content')} vertical justify="space-between">
                        <div className={cx('header')}>
                            <div className={cx('header-title')}>
                                <p>{data.name}</p>
                            </div>
                        </div>
                        <Flex className={cx('body')} vertical justify="space-between">
                            <Flex justify="space-between">
                                <p className={cx('main-title')}>{data.avgPrice}</p>
                                <p className={cx('sub-title')}>{data.totalSold}</p>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Link>
        );
    }
}

CardProductItem.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        avgPrice: PropTypes.string.isRequired,
        totalSold: PropTypes.number.isRequired,
    }),
};

export default CardProductItem;
