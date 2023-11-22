import { Carousel as AntCarousel } from 'antd';
import { useRef } from 'react';

import Button from '../../Button';

import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

import images from '~/assets/images';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
const cx = classNames.bind(styles);

const Carousel = function ({ showControls = true, showIndicators = true }) {
    const carouselContent = useRef(null);

    const nextSlide = () => {
        carouselContent.current.next();
    };

    const prevSlide = () => {
        carouselContent.current.prev();
    };

    return (
        <div className={cx('carousel-container')}>
            {showControls && (
                <Button onClick={prevSlide} transparent small className={cx('carousel-control', 'prev')}>
                    <ArrowLeft className={cx('control-icon')} />
                </Button>
            )}
            <AntCarousel
                className={cx('carousel-content')}
                autoplay={false}
                dots={showIndicators}
                ref={carouselContent}
            >
                {images.banners.map((item, index) => (
                    <div key={index} className={cx('carousel-item')}>
                        <img src={item} alt="Banner" />
                    </div>
                ))}
            </AntCarousel>
            {showControls && (
                <Button onClick={nextSlide} transparent small className={cx('carousel-control', 'next')}>
                    <ArrowRight className={cx('control-icon')} />
                </Button>
            )}
        </div>
    );
};
export default Carousel;
