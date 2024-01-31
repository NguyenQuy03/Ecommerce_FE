import { Layout, theme } from 'antd';

const { Content: AntContent } = Layout;

function Content({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AntContent
            style={{
                padding: 20,
                margin: '8px 0',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            {children}
        </AntContent>
    );
}

export default Content;
