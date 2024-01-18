import { Layout, theme } from 'antd';

import { Footer, Header, Sider } from '../LayoutComponents';

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                    <Content
                        style={{
                            padding: 20,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default DashboardLayout;
