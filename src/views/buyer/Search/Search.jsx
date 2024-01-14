import { Col, Divider, List, Rate, Row, Slider, Select, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { Funnel } from 'react-bootstrap-icons';
import Button from '~/components/Buyer/Button';

import { CardProductItem } from '~/components/Buyer/Carousel';
import { WrapperComponent } from '~/components/Buyer/Wrapper';
import { getProducts } from '~/services/ProductService';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

let maxRangePrice = 100;
let minRangePrice = 0;

function Search() {
    const [searchProducts, setSearchProducts] = useState([]);

    const [priceRange, setPriceRange] = useState([minRangePrice, maxRangePrice]);

    useEffect(() => {
        getProducts()
            .then((response) => {
                setSearchProducts(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <WrapperComponent>
            {/* {searchProducts.length > 0 ? (
                <Empty description={false}>
                    <p>No results found</p>
                    <p>Try different or more general keywords</p>
                </Empty>
            ) : (
            )} */}
            <Row gutter={[20, 0]}>
                <Col span={5} className={cx('filter')}>
                    <h3>
                        <Funnel /> SEARCH FILTER
                    </h3>
                    <Divider />

                    <Row>
                        <Col span={24}>
                            <p>Price Range</p>
                        </Col>
                        <Col span={24}>
                            <h4>{`$${priceRange[0]} - $${priceRange[1]}`}</h4>
                            <Slider
                                range
                                defaultValue={[minRangePrice, maxRangePrice]}
                                onChange={(value) => setPriceRange(value)}
                                step={5}
                            />
                            <Button type={'primary'} size={'normal'}>
                                Apply
                            </Button>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <p>Rating</p>
                        </Col>
                        <Col span={24}>
                            <List
                                bordered={false}
                                dataSource={[4, 3, 2, 1]}
                                renderItem={(item) => (
                                    <List.Item className={cx('rate-item')}>
                                        <Rate disabled defaultValue={item} allowHalf className={cx('rate')} />
                                        <span>&nbsp; & Up</span>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={19}>
                    <Row className={cx('sort-bar')}>
                        <p>Sort By</p>
                        <Flex>
                            <Button type={'default'} size={'small'}>
                                Lastest
                            </Button>

                            <Button type={'default'}>Top Sales</Button>
                            <Select
                                className={cx('price-sort')}
                                placeholder="Price"
                                options={[
                                    {
                                        value: 'asc',
                                        label: 'Price: Low to High',
                                    },
                                    {
                                        value: 'desc',
                                        label: 'Price: High to Low',
                                    },
                                ]}
                            />
                        </Flex>
                    </Row>
                    <Row>
                        <List
                            grid={{
                                gutter: 8,
                                xs: 1,
                                sm: 2,
                                md: 4,
                                lg: 4,
                                xl: 5,
                                xxl: 3,
                            }}
                            pagination={{
                                pageSize: 6,
                            }}
                            dataSource={searchProducts}
                            renderItem={(item) => (
                                <List.Item>
                                    <CardProductItem data={item} />
                                </List.Item>
                            )}
                        />
                    </Row>
                </Col>
            </Row>
        </WrapperComponent>
    );
}
export default Search;
