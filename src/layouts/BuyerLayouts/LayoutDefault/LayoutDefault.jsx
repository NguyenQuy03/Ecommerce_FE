import { Col, FloatButton, Row } from 'antd';

import { BannerItem, Carousel } from '~/components/Carousel';
import { WrapperComponent } from '~/components/Wrapper';
import { Footer, Header } from '~/layouts/BuyerLayouts/LayoutComponents';

import images from '~/assets/images';

function LayoutDefault({ children }) {
    return (
        <>
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
        </>
    );
}

export default LayoutDefault;
