import { Col, Row } from 'antd';
import { Footer, Header } from '~/layouts/BuyerLayouts/LayoutComponents';

function LayoutWithoutSlider({ children }) {
    return (
        <>
            <Header />
            <Row align={'middle'}>
                <Col span={24}>
                    <Row align={'middle'} justify={'center'}>
                        {children}
                    </Row>
                </Col>
            </Row>
            <Footer />
        </>
    );
}

export default LayoutWithoutSlider;
