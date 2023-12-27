import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Col, InputNumber, Radio, Row, Space, Divider, Tabs } from 'antd';
import { CartPlus, Star, StarFill, StarHalf, ChatSquareText, ShopWindow } from 'react-bootstrap-icons';

import { getProduct } from '~/services/ProductService';

import Button from '~/components/Buyer/Button';
import { WrapperComponent, WrapperContent } from '~/components/Buyer/Wrapper';
import Carousel from '~/components/Buyer/Carousel';
import BannerCarousel from '~/components/Buyer/Carousel/BannerCarousel';

import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productItems, setProductItems] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getProduct({ id })
            .then((response) => {
                setProduct(response);
                images.push(response.image);
                response.productItems.forEach((element) => {
                    images.push(element.image);
                });
                setProductItems(response.productItems);
                console.log(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <WrapperComponent className={cx('content')}>
            {/* PRODUCT INFORMATION GENERAL */}
            <div>
                <WrapperContent>
                    <Row className={cx('detail')}>
                        <Col lg={12} sm={24} md={24}>
                            <Carousel className={cx('carousel')}>
                                <BannerCarousel items={images} slidesToShow={1}></BannerCarousel>
                            </Carousel>
                        </Col>
                        <Col lg={12} className={cx('basic-info')}>
                            <Space size={'middle'} direction={'vertical'}>
                                <h1>{product?.name}</h1>
                                <Space size={'small'}>
                                    <div className={cx('rate')}>
                                        <StarFill />
                                        <StarFill />
                                        <StarFill />
                                        <StarHalf />
                                        <Star />
                                    </div>
                                    <span>(50 Reviews)</span>
                                </Space>
                                <Space size={'small'}>
                                    <p className={cx('title')}>Price </p>
                                    <h1 className={cx('price')}>{product?.avgPrice}</h1>
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
                                    <span>{product?.totalStock + ' pieces available'}</span>
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
            </div>

            {/* SHOP INFORMATION DETAIL */}
            <div>
                <Row className={cx('shop-container')} align={'middle'} justify={'space-between'}>
                    <Col span={8}>
                        <Space>
                            <div>
                                <img
                                    src="https://res.cloudinary.com/dald4jiyw/image/upload/v1697031664/Default_pfp.svg_xkjczv.png"
                                    alt="Avatar image"
                                />
                            </div>
                            <Space direction={'vertical'}>
                                <div>
                                    <p class="shop-info-name">0l9ih6qg_t</p>
                                </div>
                                <Space>
                                    <Button type={'outline'} size={'small'} leftIcon={<ShopWindow />}>
                                        VIEW SHOP
                                    </Button>
                                    <Button type={'normal'} size={'small'} leftIcon={<ChatSquareText />}>
                                        CHAT NOW
                                    </Button>
                                </Space>
                            </Space>
                        </Space>
                        <Divider type="vertical" />
                    </Col>
                    <Col span={16}>
                        <Row gutter={[40, 0]}>
                            <Col span={8}>
                                <Row justify={'space-between'}>
                                    <p>Products: </p> <span className={cx('shop-info-value')}>0</span>
                                </Row>
                                <Row justify={'space-between'}>
                                    <p>Following: </p> <span className={cx('shop-info-value')}>0</span>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row justify={'space-between'}>
                                    <p>Chat Performance: </p> <span className={cx('shop-info-value')}>57%</span>
                                </Row>
                                <Row justify={'space-between'}>
                                    <p>Followers: </p> <span className={cx('shop-info-value')}>0</span>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row justify={'space-between'}>
                                    <p>Rating: </p> <span className={cx('shop-info-value')}>0</span>
                                </Row>
                                <Row justify={'space-between'}>
                                    <p>Joined: </p> <span className={cx('shop-info-value')}>0</span>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* PRODUCT INFORMATION DETAIL  */}
            <div>
                <WrapperComponent>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        size={'large'}
                        items={new Array(3).fill(null).map((_, i) => {
                            const id = String(i + 1);
                            return {
                                label: `Card Tab ${id}`,
                                key: id,
                                children: `Content of card tab ${id}`,
                            };
                        })}
                    />
                </WrapperComponent>
            </div>
        </WrapperComponent>
    );
}

export default DetailProduct;
