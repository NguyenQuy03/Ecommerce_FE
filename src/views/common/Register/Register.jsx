import { Flex, Form, Input } from 'antd';

import { Link } from 'react-router-dom';

import Button from '~/components/Buyer/Button';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { register } from '~/services/AuthService';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);

const maxLengthInput = 40;

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

const Register = () => {
    const navigate = useNavigate();

    const onFinish = (formData) => {
        register(formData)
            .then((response) => {
                navigate('/login', { state: { message: response.data, status: response.status } });
            })
            .catch((error) => {
                console.log('Error registering user:', error.response.data);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateEmail = async (rule, value) => {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(value) && value) {
            throw new Error('Invalid email address');
        }
    };

    return (
        <div className={cx('content')}>
            <Flex vertical className={cx('header')} align="center" justify="center">
                <h3 className={cx('title')}>Create an Account</h3>
                <p className={cx('sub-title')}>Enter your personal details to create account</p>
            </Flex>
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
                    label="Full name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className={cx('field')} maxLength={maxLengthInput} />
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className={cx('field')} maxLength={maxLengthInput} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }, { validator: validateEmail }]}
                    hasFeedback
                >
                    <Input type="email" className={cx('field')} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input type="password" className={cx('field')} />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input type="password" className={cx('field')} addonAfter={''} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button className={cx('submit-btn')} type="primary" size={'large'} htmltype="submit">
                        Create Account
                    </Button>
                </Form.Item>
            </Form>

            <Flex className={cx('footer')} justify="flex-start">
                <span>Already have an account?</span>
                <Link className={cx('redirect-btn')} to={'/login'}>
                    Login
                </Link>
            </Flex>
        </div>
    );
};

export default Register;
