import { Carousel as AntCarousel } from 'antd';
import { useRef, useState, useEffect } from 'react';
import CardItem from './CardItem';

import Button from '~/components/Buyer/Button';

import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import classNames from 'classnames/bind';
import styles from './CardCarousel.module.scss';
const cx = classNames.bind(styles);

function CardCarousel({ items = [], showControls = true, showIndicators = true, slidesToShow = 6 }) {
    const carouselContent = useRef(null);
    const carouselSlider = useRef(null);

    const nextSlide = () => {
        carouselSlider.current.next();
    };

    const prevSlide = () => {
        carouselSlider.current.prev();
    };

    const renderItems = () => {
        return items.map((item, index) => <CardItem key={index} data={item} />);
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
        <div className={cx('card-content')} ref={carouselContent}>
            {showControls && (
                <Button onClick={prevSlide} type={'normal'} shape={'vertical'} className={cx('card-control', 'prev')}>
                    <ChevronLeft />
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
                <Button onClick={nextSlide} type={'normal'} shape={'vertical'} className={cx('card-control', 'next')}>
                    <ChevronRight />
                </Button>
            )}
        </div>
    );
}

export default CardCarousel;
