import { useRef, useState, useEffect } from 'react';
import { Carousel as AntCarousel } from 'antd';
import BannerItem from './BannerItem';

import Button from '~/components/Buyer/Button';

import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

import classNames from 'classnames/bind';
import styles from './BannerCarousel.module.scss';
const cx = classNames.bind(styles);

function BannerCarousel({ items = [], showControls = true, showIndicators = true, slidesToShow = 1 }) {
    const carouselContent = useRef(null);
    const carouselSlider = useRef(null);

    const nextSlide = () => {
        carouselSlider.current.next();
    };

    const prevSlide = () => {
        carouselSlider.current.prev();
    };
    const renderItems = () => {
        return items.map((item, index) => <BannerItem key={index} data={item} />);
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
            carouselContent.current.style.width = `${windowWidth}px`;
        }
    }, [windowWidth]);

    return (
        <div className={cx('banner-content')} ref={carouselContent}>
            {showControls && (
                <Button
                    onClick={prevSlide}
                    type={'transparent'}
                    size={'small'}
                    className={cx('banner-control', 'prev')}
                >
                    <ArrowLeft />
                </Button>
            )}
            <AntCarousel
                ref={carouselSlider}
                slidesToShow={slidesToShow}
                autoplay={false}
                autoplaySpeed={5000}
                speed={500}
                dots={showIndicators}
            >
                {renderItems()}
            </AntCarousel>
            {showControls && (
                <Button
                    onClick={nextSlide}
                    type={'transparent'}
                    size={'small'}
                    className={cx('banner-control', 'next')}
                >
                    <ArrowRight />
                </Button>
            )}
        </div>
    );
}

export default BannerCarousel;
