import { Card, Flex, Image } from 'antd';

import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
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
                        <Image src={data.thumbnail} alt="Card" preview={false}/>
                    </div>
                }
                bodyStyle={{ padding: '4px' }}
            >
                <Flex className={cx('content')} vertical justify="space-between">
                    <Flex className={cx('header')} justify="center">
                        <div className={cx('header-title')}>
                            <p>{data.name}</p>
                        </div>
                    </Flex>
                </Flex>
            </Card>

            
        );
    }
}

CardCategoryItem.propTypes = {
    data: PropTypes.shape({
        code: PropTypes.string,
    }),
};

export default CardCategoryItem;
