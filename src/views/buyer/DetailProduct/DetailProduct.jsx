import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Divider, InputNumber, Radio, Rate, Row, Space } from 'antd';
import { CartPlus, ChatSquareText, ShopWindow } from 'react-bootstrap-icons';

import { getProduct, getProducts } from '~/services/ProductService';

import Button from '~/components/Buyer/Button';
import { BannerItem, CardProductItem, Carousel } from '~/components/Buyer/Carousel';
import Grid, { RcmProducts } from '~/components/Buyer/Grid';
import { WrapperComponent, WrapperContent } from '~/components/Buyer/Wrapper';

import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    let productItems = [];
    const [specification, setSpecification] = useState({});

    const [shopProducts, setShopProducts] = useState([]);
    const [relevantProducts, setRelevantProducts] = useState([]);

    useEffect(() => {
        getProduct({ id })
            .then((response) => {
                setProduct(response);

                productItems = response.productItems;
                setSpecification(response.specification);
                console.log(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // getProductsBySellerId({ id })
        //     .then((response) => {
        //         setShopProducts(response);
        //         console.log(response);
        //     })
        //     .catch((error) => console.error('Error fetching data:', error));
        getProducts()
            .then((response) => {
                setShopProducts(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <Row align={'middle'} justify={'center'} className={cx('content')}>
            {/* PRODUCT INFORMATION GENERAL */}
            <WrapperComponent>
                <WrapperContent>
                    <Row className={cx('detail')} gutter={[30, 0]}>
                        <Col lg={10} sm={24} md={24}>
                            <Carousel
                                items={product?.images}
                                element={<BannerItem />}
                                showIndicators={false}
                                autoplay={false}
                                slidesToShow={1}
                                controlType={'banner'}
                            />
                        </Col>
                        <Col lg={14} className={cx('basic-info')}>
                            <Space size={'middle'} direction={'vertical'}>
                                <h1>{product?.name}</h1>
                                <Space size={'small'}>
                                    <Rate allowHalf defaultValue={3.5} className={cx('rate')} disabled />
                                    <span>(50 Reviews)</span>
                                </Space>
                                <Space size={'small'}>
                                    <p className={cx('title')}>Price </p>
                                    <h1 className={cx('price')}>{product?.additionalInfo.avgPrice}</h1>
                                </Space>
                                <Space size={'small'} direction={'vertical'}>
                                    {product &&
                                        Object.keys(product.variations).map((key) => (
                                            <Space key={key} size={'small'} className={cx('variation')}>
                                                <p className={cx('title')}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </p>
                                                <Radio.Group
                                                    size="large"
                                                    className={cx('variation-content')}
                                                    onChange={(e) => {
                                                        console.log(e.target.value);
                                                    }}
                                                >
                                                    <Space size={[4, 6]} wrap>
                                                        {product.variations[key].map((value, index) => (
                                                            <Radio.Button key={index} value={value}>
                                                                {value}
                                                            </Radio.Button>
                                                        ))}
                                                    </Space>
                                                </Radio.Group>
                                            </Space>
                                        ))}
                                </Space>
                                <Space size={'small'}>
                                    <p className={cx('title')}>Quantity </p>
                                    <InputNumber min={1} max={10} defaultValue={1} size="large" />
                                    <span>{product?.additionalInfo.totalStock + ' pieces available'}</span>
                                </Space>
                                <div>
                                    <Button size={'normal'} type={'outline'} leftIcon={<CartPlus />}>
                                        Add To Cart
                                    </Button>
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </WrapperContent>
            </WrapperComponent>

            {/* SHOP INFORMATION DETAIL */}
            <WrapperComponent>
                <WrapperContent>
                    <Row className={cx('shop-container')} align={'middle'} justify={'space-between'}>
                        <Col xl={8} lg={10} sm={24}>
                            <Space>
                                <div>
                                    <img
                                        className={cx('shop-avatar')}
                                        src="https://res.cloudinary.com/dald4jiyw/image/upload/v1697031664/Default_pfp.svg_xkjczv.png"
                                        alt="Avatar image"
                                    />
                                </div>
                                <Space direction={'vertical'}>
                                    <div>
                                        <p>0l9ih6qg_t</p>
                                    </div>
                                    <Space>
                                        <Button type={'outline'} size={'small'} leftIcon={<ShopWindow />}>
                                            VIEW SHOP
                                        </Button>
                                        <Button type={'default'} size={'small'} leftIcon={<ChatSquareText />}>
                                            CHAT NOW
                                        </Button>
                                    </Space>
                                </Space>
                            </Space>
                            <Divider type="vertical" />
                        </Col>
                        <Col xl={16} lg={14} sm={24}>
                            <Row gutter={{ xl: 40, lg: 20 }}>
                                <Col xl={8} lg={12}>
                                    <Row justify={'space-between'}>
                                        <span>Products </span> <span className={cx('shop-info-value')}>0</span>
                                    </Row>
                                </Col>
                                <Col xl={8} lg={12}>
                                    <Row justify={'space-between'}>
                                        <p>Following </p> <span className={cx('shop-info-value')}>0</span>
                                    </Row>
                                </Col>
                                <Col xl={8} lg={12}>
                                    <Row justify={'space-between'}>
                                        <p>Chat Performance </p> <span className={cx('shop-info-value')}>57%</span>
                                    </Row>
                                </Col>
                                <Col xl={8} lg={12}>
                                    <Row justify={'space-between'}>
                                        <p>Followers </p> <span className={cx('shop-info-value')}>0</span>
                                    </Row>
                                </Col>
                                <Col xl={8} lg={12}>
                                    <Row justify={'space-between'}>
                                        <p>Rating </p> <span className={cx('shop-info-value')}>0</span>
                                    </Row>
                                </Col>
                                <Col xl={8} lg={12}>
                                    <Row justify={'space-between'}>
                                        <p>Joined </p> <span className={cx('shop-info-value')}>0</span>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </WrapperContent>
            </WrapperComponent>

            {/* PRODUCT INFORMATION DETAIL  */}
            <WrapperComponent>
                <WrapperContent>
                    <Row gutter={[0, 30]}>
                        <Col span={24} className={cx('product-detail-container')}>
                            <span className={cx('small-title')}>Product Specifications</span>
                            <div className={cx('product-detail-content')}>
                                {Object.entries(specification).map(([specKey, specValue]) => (
                                    <div key={specKey}>
                                        <span className={cx('spec-key')}>{specKey}</span>
                                        <span>{specValue}</span>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        <Col span={24} className={cx('product-detail-container')}>
                            <span className={cx('small-title')}>Product Description</span>

                            <div
                                className={cx('product-detail-content')}
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                            />
                        </Col>

                        <Col span={24} className={cx('product-detail-container')}>
                            <span className={cx('small-title')}>Product Ratings</span>

                            <div
                                className={cx('product-detail-content')}
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                            />
                        </Col>
                    </Row>
                </WrapperContent>
            </WrapperComponent>

            {/* From The Same Shop */}
            <WrapperComponent>
                <WrapperContent>
                    <Row>
                        <span className={cx('small-title')}>FROM THE SAME SHOP</span>
                    </Row>
                    {shopProducts?.length > 0 && (
                        <Carousel
                            items={shopProducts}
                            element={<CardProductItem />}
                            showIndicators={false}
                            autoplay={false}
                            slidesToShow={6}
                            controlType={'card'}
                        />
                    )}
                </WrapperContent>
            </WrapperComponent>

            {/* YOU MAY ALSO LIKE */}
            <RcmProducts title={'YOU MAY ALSO LIKE'} items={shopProducts}/>
        </Row>
    );
}

export default DetailProduct;
