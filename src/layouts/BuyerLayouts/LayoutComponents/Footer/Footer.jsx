import { Footer as AntdFooter } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

import { Col, Divider, List, Row, Avatar } from 'antd';
import classNames from 'classnames/bind';
import styles from '../Footer/Footer.module.scss';
import { Facebook, Instagram, Linkedin } from 'react-bootstrap-icons';

const cx = classNames.bind(styles);

const custommerServiceData = [
    'CUSTOMER SERVICE',
    'Help Center',
    'How To Buy',
    'How To Sell',
    'Shipping',
    'Return & Refund',
];

const aboutData = ['ABOUT ZECO', 'About Us', 'Careers', 'Policies', 'Seller Center', 'Media Contact'];

const paymentData = ['PAYMENT', 'Help Center', 'How To Buy', 'How To Sell', 'Shipping', 'Return & Refund'];

const followData = [
    {
        thumbnail: <></>,
        title: 'FOLLOW US',
    },
    { thumbnail: <Facebook />, title: 'Facebook' },
    { thumbnail: <Instagram />, title: 'Instagram' },
    { thumbnail: <Linkedin />, title: 'Linkedin' },
];

function Footer() {
    return (
        <AntdFooter className={cx('wrapper')}>
            <div className={cx('content')}>
                <div>
                    <Row
                        gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                        }}
                    >
                        <Col className="gutter-row" span={6}>
                            <List
                                size="small"
                                dataSource={custommerServiceData}
                                renderItem={(item) => <List.Item className={cx('list-item')}>{item}</List.Item>}
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <List
                                size="small"
                                dataSource={aboutData}
                                renderItem={(item) => <List.Item className={cx('list-item')}>{item}</List.Item>}
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <List
                                size="small"
                                dataSource={paymentData}
                                renderItem={(item) => <List.Item className={cx('list-item')}>{item}</List.Item>}
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <List
                                size="small"
                                dataSource={followData}
                                renderItem={(item) => (
                                    <List.Item className={cx('list-item')}>
                                        {
                                            <>
                                                {item.thumbnail}
                                                {item.title}
                                            </>
                                        }
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>

                <Divider orientation="center"></Divider>

                <Row>
                    <div>
                        <p className={cx('copyright-title')}>
                            &copy; <Link to="/">ZECO</Link>. All Rights Reserved
                        </p>
                    </div>
                </Row>
            </div>
        </AntdFooter>
    );
}

export default Footer;
