import TitleSection from '~/components/Buyer/TitleSection';

import { useEffect, useState } from 'react';
import Button from '~/components/Buyer/Button';
import Carousel from '~/components/Buyer/Carousel';
import CardCarousel from '~/components/Buyer/Carousel/CardCarousel';

import { getProducts } from '~/services/ProductService';
import { getCategories } from '~/services/CategoryService';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        getProducts()
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => console.error('Error fetching data:', error));

    }, []);

    
    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={cx('home')}>
            <TitleSection>Categories</TitleSection>

            <Carousel>
                <CardCarousel type='category' items={categories} showIndicators={false}/>
            </Carousel>

            <TitleSection>Trendy Products</TitleSection>
            <Carousel>
                <CardCarousel items={products} showIndicators={false} showControls={false}/>
            </Carousel>
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
