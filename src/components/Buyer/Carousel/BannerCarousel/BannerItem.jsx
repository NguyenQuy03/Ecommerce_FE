import classNames from 'classnames/bind';
import styles from './BannerCarousel.module.scss';
const cx = classNames.bind(styles);

function BannerItem({ data }) {

    return (
        <div className={cx('banner-item')}>
            <img src={data} alt="Banner" />
        </div>
    );
}

export default BannerItem;
