import { Col, Dropdown, Row, Typography } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { useAuth } from '~/hooks';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);
const { Text } = Typography;

const menuItems = [
    {
        key: '1',
        label: <Link to="/">Home</Link>,
    },
    {
        key: '2',
        label: <Link to="/user/account/profile">My Profile</Link>,
    },
    {
        key: '3',
        label: <Link to="/sign-out">Sign out</Link>,
    },
];

function Header() {
    const { auth } = useAuth();
    return (
        <AntHeader className={cx('wrapper')}>
            <Row className={cx('inner')} justify="space-between" align="middle">
                <Col sm={12} lg={6}>
                    <a href="#">
                        <p>Dashboard</p>
                    </a>
                </Col>

                <Col className={cx('actions')} sm={12} lg={6}>
                    <Row justify="end" align={'middle'}>
                        <Dropdown
                            className={cx('drop-down')}
                            menu={{
                                items: menuItems,
                            }}
                            arrow={false}
                        >
                            <div className={cx('menu-title')}>
                                <Text
                                    style={{
                                        width: 120,
                                        alignItems: 'center',
                                    }}
                                    ellipsis={{
                                        tooltip: <></>,
                                    }}
                                >
                                    {auth?.fullName}
                                    Nguyen Huy Quy
                                </Text>
                                <ChevronDown />
                            </div>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
        </AntHeader>
    );
}

export default Header;
