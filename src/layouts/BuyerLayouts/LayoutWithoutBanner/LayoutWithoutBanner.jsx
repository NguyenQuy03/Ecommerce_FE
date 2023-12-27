import Layout from 'antd/es/layout/layout';
import { Header, Footer } from '~/layouts/BuyerLayouts/LayoutComponents';
import { Row, Col } from 'antd';

function LayoutWithoutSlider({ children }) {
    return (
        <Layout>
            <Header />
            <Row align={'middle'}>
                <Col span={24}>
                    <Row align={'middle'} justify={'center'}>
                        {children}
                    </Row>
                </Col>
            </Row>
            <Footer />
        </Layout>
    );
}

export default LayoutWithoutSlider;
