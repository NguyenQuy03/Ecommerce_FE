import { Layout } from 'antd';

import { Footer, Header, Sider } from '../LayoutComponents';

const DashboardLayout = ({ children }) => {
    return (
        <Layout>
            <Header />
            <Layout>
                <Sider />
                <Layout
                    style={{
                        padding: '24px',
                    }}
                >
                    {children}
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default DashboardLayout;
