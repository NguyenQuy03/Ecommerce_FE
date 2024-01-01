
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
const cx = classNames.bind(styles);

function BannerItem({ data }) {
    return <img className={cx('banner-img')} src={data} alt="Banner" />;
}

export default BannerItem;
