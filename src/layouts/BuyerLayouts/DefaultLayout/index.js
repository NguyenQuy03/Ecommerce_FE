
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss'

import Header from "~/components/Buyer/LayoutComponents/Header"
import Sidebar from "~/components/Buyer/LayoutComponents/Sidebar"
import Slider from '~/components/Buyer/LayoutComponents/Slider';
import Footer from '~/components/Buyer/LayoutComponents/Footer';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Slider />
                <Sidebar />
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;