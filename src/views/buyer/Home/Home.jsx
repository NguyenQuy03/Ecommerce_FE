import { useEffect, useState } from 'react';
import Button from '~/components/Buyer/Button';
import { WrapperComponent } from '~/components/Buyer/Wrapper';

import TitleSection from '~/components/Buyer/TitleSection';

import { getCategories } from '~/services/CategoryService';
import { getProducts } from '~/services/ProductService';

import { Carousel, CardCategoryItem, CardProductItem } from '~/components/Buyer/Carousel';

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
                    <Carousel
                        items={categories}
                        element={<CardCategoryItem />}
                        showIndicators={false}
                        autoplay={false}
                        slidesToShow={6}
                        controlType={'card'}
                    />
                </WrapperComponent>
            )}

            <TitleSection>Trendy Products</TitleSection>

            {products?.length > 0 && (
                <WrapperComponent>
                    <Carousel
                        items={products}
                        element={<CardProductItem />}
                        showIndicators={false}
                        showControls={true}
                        autoplay={false}
                        slidesToShow={6}
                        controlType={'card'}
                    />
                </WrapperComponent>
            )}

            <div className={cx('see-more-btn')}>
                <Button type={'outline'} size={'large'}>
                    See More
                </Button>
            </div>
        </div>
    );
}

export default Home;
