import { Col, FloatButton, Row } from 'antd';
import Layout from 'antd/es/layout/layout';

import { BannerItem, Carousel } from '~/components/Buyer/Carousel';
import { WrapperComponent } from '~/components/Buyer/Wrapper';
import { Footer, Header } from '~/layouts/BuyerLayouts/LayoutComponents';

import images from '~/assets/images';

import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
const cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    return (
        <Layout className={cx('wrapper')}>
            <Header />
            <Row align={'middle'}>
                <Col span={24}>
                    <Row justify={'center'}>
                        <WrapperComponent>
                            <Carousel
                                items={images.banners}
                                element={<BannerItem />}
                                showIndicators
                                autoplay
                                slidesToShow={1}
                                controlType={'banner'}
                            />
                        </WrapperComponent>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row align={'middle'} justify={'center'}>
                        {children}
                    </Row>
                </Col>
            </Row>
            <Footer />
            <FloatButton.BackTop duration={600} visibilityHeight={600} />
        </Layout>
    );
}

export default LayoutDefault;
