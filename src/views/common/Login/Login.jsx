import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Flex, Form, Input, notification } from 'antd';

import Button from '~/components/Buyer/Button';

import { login } from '~/services/AuthService';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

const maxLengthInput = 40;

const Login = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const respMessage = location.state && location.state.message;
    const respStatus = location.state && location.state.status === 200 ? 'success' : 'error';

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, status, message) => {
        api[status]({
            message: message,
            placement: placement,
            className: cx(`noti-${status}`),
            closeIcon: false,
            duration: 3.5,
        });
    };

    useEffect(() => {
        if (respMessage) {
            openNotification('topRight', respStatus, respMessage);
        }
    }, [respMessage]);

    const onFinish = (formData) => {
        console.log('Success:', formData);
        login(formData)
            .then((response) => {
                navigate('/', { state: { message: response.data, status: response.status } });
            })
            .catch((error) => {
                console.error('Error registering user:', error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className={cx('field')} maxLength={maxLengthInput} />
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
