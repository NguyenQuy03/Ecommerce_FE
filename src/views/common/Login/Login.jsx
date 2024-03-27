import { Flex, Form, Input, notification } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import AuthService from '~/services/buyer/AuthService';
import { useAuth } from '~/hooks';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

const maxLengthInput = 40;

const ROLE_PATH = {
    ROLE_20001: '/manager',
    ROLE_20003: '/seller',
    ROLE_20002: '/',
};

const Login = () => {
    const { setAuth } = useAuth();
    const authService = AuthService();

    const navigate = useNavigate();
    const location = useLocation();

    const [api, contextHolder] = notification.useNotification();
    const usernameRef = useRef(null);

    const [respData, setRespData] = useState(location.state);

    const openNotification = useCallback(
        (placement, status, message) => {
            api[status || 'success']({
                message: message,
                placement: placement,
                className: cx('noti', `${status}`),
                closeIcon: false,
                duration: 3.5,
            });
        },
        [api],
    );

    useEffect(() => {
        if (respData) {
            openNotification('topRight', respData?.status, respData?.message);
        }
    }, [respData, openNotification]);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const onFinish = (formData) => {
        authService
            .login(formData)
            .then((response) => {
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                const fullName = response?.data?.fullName;

                setAuth({ roles, accessToken, fullName });

                const from = location.state?.from?.pathname || ROLE_PATH[roles[0]] || '/';

                navigate(from, {
                    state: { message: response?.data, status: response?.status === 200 ? 'success' : 'error' },
                });
            })
            .catch((error) => {
                console.log(error);
                setRespData({ message: error.response?.data, status: 'error' });
            });
    };

    return (
        <div className={cx('content')}>
            <Flex vertical className={cx('header')} align="center" justify="center">
                <h3 className={cx('title')}>Login to Your Account</h3>
                <p className={cx('sub-title')}>Enter your username & password to login</p>
            </Flex>

            {contextHolder}

            <Form
                className={cx('body')}
                {...formLayout}
                requiredMark={false}
                name="form-login"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input ref={usernameRef} className={cx('field')} maxLength={maxLengthInput} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password className={cx('field')} maxLength={maxLengthInput} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button className={cx('submit-btn')} type="primary" size={'large'} htmltype="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <Flex className={cx('footer')} justify="flex-start">
                <span>Don't have account?</span>
                <Link className={cx('redirect-btn')} to={'/register'}>
                    Create an account
                </Link>
            </Flex>
        </div>
    );
};

export default Login;
