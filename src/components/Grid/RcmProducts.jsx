import { Row } from 'antd';

import { CardProductItem } from '../Carousel';
import { WrapperComponent, WrapperContent } from '~/components/Wrapper';
import Grid from '~/components/Grid/Grid';

import classNames from 'classnames/bind';
import styles from './RcmProducts.module.scss';
const cx = classNames.bind(styles);

function RcmProducts({title, items = []}) {
    return (
        <WrapperComponent>
            <WrapperContent>
                <Row>
                    <span className={cx('small-title')}>{title}</span>
                </Row>
                {items?.length > 0 && <Grid items={items} element={<CardProductItem />} />}
            </WrapperContent>
        </WrapperComponent>
    );
}

export default RcmProducts;
