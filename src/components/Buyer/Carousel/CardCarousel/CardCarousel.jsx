import { Carousel as AntCarousel } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Button from '~/components/Buyer/Button';
import CardProductItem from './CardProductItem';

import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import classNames from 'classnames/bind';
import styles from './CardCarousel.module.scss';
import CardCategoryItem from './CardCategoryItem';
const cx = classNames.bind(styles);

function CardCarousel({
    items = [],
    type = 'product',
    showControls = true,
    showIndicators = true,
    autoplay = true,
    slidesToShow = 6,
}) {
    const carouselContent = useRef(null);
    const carouselSlider = useRef(null);

    const nextSlide = () => {
        carouselSlider.current.next();
    };

    const prevSlide = () => {
        carouselSlider.current.prev();
    };

    while(items.length < slidesToShow) {
        items.push({})
    }

    const renderItems = () => {
        let ItemComponent = CardProductItem;
        if(type == 'category') {
            ItemComponent = CardCategoryItem;
        }
        return items.map((item, index) => {
            return <ItemComponent key={index} data={item} />;
        });
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (carouselContent.current && windowWidth < 1280) {
            carouselContent.current.style.width = `${windowWidth - 40}px`;
        }
    }, [windowWidth]);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const getSlidesToShow = () => {
        if (isMobile) {
            return 2;
        } else if (isTablet) {
            return 4;
        } else if(isDesktop) {
            return 6;
        }
    };

    if(!slidesToShow) {
        slidesToShow = getSlidesToShow();
    }

    if(showControls) {
        showControls = items.length > slidesToShow;
    }

    return (
        <div className={cx('card-content')} ref={carouselContent}>
            {showControls && (
                <Button onClick={prevSlide} type={'normal'} shape={'vertical'} className={cx('card-control', 'prev')}>
                    <ChevronLeft />
                </Button>
            )}
            <AntCarousel
                ref={carouselSlider}
                slidesToShow={slidesToShow}
                autoplay={autoplay}
                autoplaySpeed={5000}
                speed={500}
                dots={showIndicators}
            >
                {renderItems()}
            </AntCarousel>
            {showControls && (
                <Button onClick={nextSlide} type={'normal'} shape={'vertical'} className={cx('card-control', 'next')}>
                    <ChevronRight />
                </Button>
            )}
        </div>
    );
}

export default CardCarousel;
