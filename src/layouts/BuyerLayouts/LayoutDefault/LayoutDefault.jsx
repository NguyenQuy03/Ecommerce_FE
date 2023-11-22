import Layout from 'antd/es/layout/layout';
import { Carousel, Footer, Header } from '~/components/Buyer/LayoutComponents';

import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
const cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    return (
        <Layout className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Carousel />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </Layout>
    );
}

export default LayoutDefault;
