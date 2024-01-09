import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Col, List, Row, Space } from 'antd';
import { createElement, useState, useEffect } from 'react';
import { CardProductItem } from '~/components/Buyer/Carousel';
import { WrapperComponent } from '~/components/Buyer/Wrapper';
import { getProducts } from '~/services/ProductService';
const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
    <Space>
        {createElement(icon)}
        {text}
    </Space>
);
function Search() {
    const [searchProducts, setSearchProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((response) => {
                setSearchProducts(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return <WrapperComponent>
        <Row>
            <Col span={5}>Search Filter</Col>
            <Col span={17}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={searchProducts}
                    renderItem={(item) => <CardProductItem data={item} />}
                />
            </Col>
        </Row>
    </WrapperComponent>;
}
export default Search;
