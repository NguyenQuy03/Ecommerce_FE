import { Space } from 'antd';
import TitleSection from '~/components/Buyer/TitleSection';

import classNames from 'classnames/bind';
import Carousel from '~/components/Buyer/Carousel';
import CardCarousel from '~/components/Buyer/Carousel/CardCarousel';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

const productItems = [
    {
        name: 'Giay JD1',
        image: 'https://down-vn.img.susercontent.com/file/sg-11134298-7rbk0-lkps0cv2076u0e_tn',
        price: 690,
        sold: 100,
    },
    {
        name: 'Gile',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lklqshj56igacd_tn',
        price: 140,
        sold: 132,
    },
    {
        name: 'Gile',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lklqshj56igacd_tn',
        price: 140,
        sold: 132,
    },
    {
        name: 'Quan ong loe',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm7kb6ohundr6e_tn',
        price: 217,
        sold: 970,
    },
    {
        name: 'Sweater',
        image: 'https://down-vn.img.susercontent.com/file/cn-11134207-7r98o-lllgljgnf9ap6c_tn',
        price: 159,
        sold: 1200,
    },
    {
        name: 'Ao khoac len',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnuz17h9qd8ad9_tn',
        price: 119,
        sold: 3500,
    },
    {
        name: 'Ao khoac len',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnuz17h9qd8ad9_tn',
        price: 119,
        sold: 3500,
    },
];

function Home() {
    return (
        <div  className={cx('home')}>
            <TitleSection>Categories</TitleSection>

            <Carousel>
                <CardCarousel items={productItems} showIndicators={false} />
            </Carousel>

            <TitleSection>Trendy Products</TitleSection>
            {/* <FloatButton.BackTop icon={<ChevronDoubleUp />}></FloatButton.BackTop> */}
        </div>
    );
}

export default Home;
