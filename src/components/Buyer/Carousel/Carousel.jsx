import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
const cx = classNames.bind(styles);

const Carousel = function ({ children }) {
    const carouselContainer = useRef(null);

    return (
        <div className={cx('carousel-container')} ref={carouselContainer}>
            {children}
        </div>
    );
};

export default Carousel;
