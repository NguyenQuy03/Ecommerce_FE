import { Carousel as AntCarousel } from 'antd';
import PropTypes from 'prop-types';
import { cloneElement, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import Button from '~/components/Buyer/Button';
import BannerItem from './BannerItem';
import CardCategoryItem from './CardCategoryItem';
import CardProductItem from './CardProductItem';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
const cx = classNames.bind(styles);

const controlTypes = {
    card: {
        type: 'default',
        size: 'tiny',
        shape: 'vertical',
        className: ['card-control'],
    },
    banner: {
        type: 'transparent',
        size: 'tiny',
        shape: 'vertical',
        className: ['banner-control'],
    },
};

function Carousel({
    items = [],
    element,
    controlType,
    showControls = true,
    showIndicators = true,
    infinite = true,
    autoplay = false,
    slidesToShow = 6,
    ...passProps
}) {
    const carouselRef = useRef(null);

    const nextSlide = () => {
        carouselRef.current.next();
    };
    
    const prevSlide = () => {
        carouselRef.current.prev();
    };

    while (items?.length < slidesToShow) {
        items.push({});
    }

    showControls = showControls && items?.length > slidesToShow;

    const renderItems = () => {
        if (items?.length > 0) {
            return items.map((item, index) => cloneElement(element, { data: item, key: index }));
        }
    };

    const responsiveSettings =
        controlType === 'card'
            ? [
                  {
                      breakpoint: 992,
                      settings: {
                          slidesToShow: 4,
                          slidesToScroll: 1,
                      },
                  },
                  {
                      breakpoint: 768,
                      settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                      },
                  },
                  {
                      breakpoint: 576,
                      settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                      },
                  },
              ]
            : undefined;

    return (
        <div className={cx('content')} {...passProps}>
            {showControls && (
                <Button
                    onClick={prevSlide}
                    type={controlTypes[controlType]?.type}
                    size={controlTypes[controlType]?.size}
                    shape={controlTypes[controlType]?.shape}
                    className={cx('control', ...(controlTypes[controlType]?.className || []), 'prev')}
                >
                    <ChevronLeft />
                </Button>
            )}
            <AntCarousel
                ref={carouselRef}
                slidesToShow={slidesToShow}
                autoplay={autoplay}
                infinite={infinite}
                autoplaySpeed={3000}
                speed={500}
                dots={showIndicators}
                responsive={responsiveSettings}
            >
                {renderItems()}
            </AntCarousel>
            {showControls && (
                <Button
                    onClick={nextSlide}
                    type={controlTypes[controlType]?.type}
                    size={controlTypes[controlType]?.size}
                    shape={controlTypes[controlType]?.shape}
                    className={cx('control', ...(controlTypes[controlType]?.className || []), 'next')}
                >
                    <ChevronRight />
                </Button>
            )}
        </div>
    );
}

Carousel.propTypes = {
    items: PropTypes.array.isRequired,
    element: PropTypes.oneOfType([
        PropTypes.shape({ type: PropTypes.oneOf([CardCategoryItem]) }),
        PropTypes.shape({ type: PropTypes.oneOf([CardProductItem]) }),
        PropTypes.shape({ type: PropTypes.oneOf([BannerItem]) }),
    ]).isRequired,
    controlType: PropTypes.oneOf(['card', 'banner']).isRequired,
    autoplay: PropTypes.bool,
    showControls: PropTypes.bool,
    showIndicators: PropTypes.bool,
    infinite: PropTypes.bool,
    slidesToShow: PropTypes.number,
};

export default Carousel;
