import { Footer as AntFooter } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

import { Col, Divider, List, Row } from 'antd';
import { Facebook, Instagram, Linkedin } from 'react-bootstrap-icons';

import classNames from 'classnames/bind';
import styles from '../Footer/Footer.module.scss';
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
        <AntFooter className={cx('wrapper')}>
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
                    <Col span={24}>
                        <p className={cx('copyright-title')}>
                            &copy; <Link to="/">ZECO</Link>. All Rights Reserved
                        </p>
                    </Col>
                </Row>
            </div>
        </AntFooter>
    );
}

export default Footer;
