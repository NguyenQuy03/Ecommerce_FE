import Layout from 'antd/es/layout/layout';

import { Header, Footer } from '~/layouts/BuyerLayouts/LayoutComponents';
import Carousel from '~/components/Buyer/Carousel';
import BannerCarousel from '~/components/Buyer/Carousel/BannerCarousel';

import images from '~/assets/images';

import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
const cx = classNames.bind(styles);

function LayoutDefault({ children }) {

    return (
        <Layout className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Carousel items={images.banners}>
                    <BannerCarousel items={images.banners} />
                </Carousel>

                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </Layout>
    );
}

export default LayoutDefault;
