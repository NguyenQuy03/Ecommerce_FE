import { Flex, Form, Input, notification } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '~/components/Buyer/Button';
import { login } from '~/services/AuthService';
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

const Login = () => {
    // const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const [api, contextHolder] = notification.useNotification();
    const usernameRef = useRef();

    const from = location.state?.from?.pathname || '/';

    const [respData, setRespData] = useState(location.state || { message: '', status: 'success' });

    const openNotification = useCallback((placement, status, message) => {
        api[status]({
            message: message,
            placement: placement,
            className: cx('noti', `${status}`),
            closeIcon: false,
            duration: 3.5,
        });
    }, [api]);

    useEffect(() => {
        openNotification('topRight', respData?.status, respData?.message);
    }, [respData, openNotification]);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const onFinish = (formData) => {
        login(formData)
            .then((response) => {
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                // setAuth({ roles, accessToken });

                Cookies.set('access_token', accessToken, { expires: 1 / 24 / 10 });
                navigate(from, {
                    state: { message: response?.data, status: response?.status === 200 ? 'success' : 'error' },
                });
            })
            .catch((error) => {
                setRespData({ message: error.response.data, status: 'error' });
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
                name="basic"
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
