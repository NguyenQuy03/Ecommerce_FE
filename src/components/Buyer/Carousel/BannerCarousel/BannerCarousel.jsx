import { Carousel as AntCarousel, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

import Button from '~/components/Buyer/Button';
import BannerItem from './BannerItem';

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

    return (
        <Row className={cx('content')} ref={carouselContent}>
            <Col span={24}>
                {showControls && (
                    <Button
                        onClick={prevSlide}
                        type={'transparent'}
                        size={'small'}
                        className={cx('control', 'prev')}
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
                        className={cx('control', 'next')}
                    >
                        <ArrowRight />
                    </Button>
                )}
            </Col>
        </Row>
    );
}

BannerCarousel.propTypes = {
    items: PropTypes.array,
    showControls: PropTypes.bool,
    showIndicators: PropTypes.bool,
    slidesToShow: PropTypes.number,
};

export default BannerCarousel;
