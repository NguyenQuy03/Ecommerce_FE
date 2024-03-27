import { Col, Dropdown, Row, Typography } from 'antd';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { ChevronDown } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '~/hooks';

import classNames from 'classnames/bind';
import AuthService from '~/services/buyer/AuthService';
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
        key: 'sign-out',
        label: <Link to="/sign-out">Sign out</Link>,
    },
];

function Header() {
    const authService = AuthService();
    const navigate = useNavigate();

    const { auth } = useAuth();

    const handleMenuClick = (e) => {
        if (e.key === 'sign-out') {
            authService.logout()
            .then((res) => {
                navigate('/login', { state: { message: res.data, status: 'success' } });
            })
            .catch((e) => {
                console.log(e);
            });
        }
    };

    return (
        <AntHeader className={cx('wrapper')}>
            <Row className={cx('inner')} justify="space-between" align="middle">
                <Col sm={12} lg={6}>
                    <Link to="/manager">
                        <p style={{ marginLeft: '60px' }}>Dashboard</p>
                    </Link>
                </Col>

                <Col className={cx('actions')} sm={12} lg={6}>
                    <Row justify="end" align={'middle'}>
                        <Dropdown
                            className={cx('drop-down')}
                            menu={{
                                items: menuItems,
                                onClick: handleMenuClick,
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
                                        tooltip: undefined,
                                    }}
                                >
                                    {auth?.fullName}
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
