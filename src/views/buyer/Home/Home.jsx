import { useEffect, useState } from 'react';
import Button from '~/components/Buyer/Button';
import Carousel from '~/components/Buyer/Carousel';
import CardCarousel from '~/components/Buyer/Carousel/CardCarousel';
import { WrapperComponent } from '~/components/Buyer/Wrapper';

import TitleSection from '~/components/Buyer/TitleSection';

import { getCategories } from '~/services/CategoryService';
import { getProducts } from '~/services/ProductService';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts()
            .then((response) => {
                setProducts(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={cx('home')}>
            <TitleSection>Categories</TitleSection>

            {categories?.length > 0 && (
                <WrapperComponent>
                    <Carousel>
                        <CardCarousel type="category" items={categories} showIndicators={false} autoplay={false} />
                    </Carousel>
                </WrapperComponent>
            )}

            <TitleSection>Trendy Products</TitleSection>

            {products?.length > 0 && (
                <WrapperComponent>
                    <CardCarousel
                        type="product"
                        items={products}
                        showIndicators={false}
                        showControls={false}
                        autoplay={false}
                    />
                </WrapperComponent>
            )}

            <div className={cx('see-more-btn')}>
                <Button type={'outline'} size={'large'}>
                    See More
                </Button>
            </div>
            {/* <FloatButton.BackTop icon={<ChevronDoubleUp />}></FloatButton.BackTop> */}
        </div>
    );
}

export default Home;
