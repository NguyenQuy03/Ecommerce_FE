import { Flex, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import Button from '~/components/Buyer/Button';
import { register } from '~/services/AuthService';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);

const maxLengthName = 40;
const maxLengthEmail = 100;

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

const Register = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const setFieldError = (fieldName, errorValue) => {
        form.setFields([
            {
                name: fieldName,
                errors: [errorValue],
            },
        ]);
    };

    const onFinish = (formData) => {
        register(formData)
            .then((response) => {
                navigate('/login', { state: { message: response.data, status: 'success' } });
            })
            .catch((error) => {
                let errorFeedBack = error.response?.data.errorFeedBack;

                if (errorFeedBack) {
                    Object.entries(errorFeedBack).forEach(([key, value]) => {
                        setFieldError(key, value);
                    });
                } else {
                    console.log("Sth else wrong");
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateEmail = async (rule, value) => {
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[\d.]{1,3}\.[\d.]{1,3}\.[\d.]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                form={form}
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
                    labelAlign="left"
                    label="Full name"
                    name="fullName"
                    rules={[
                        { required: true, message: 'Please input your full name!' },
                        { max: maxLengthName, message: 'The length of your full name is too long' },
                    ]}
                >
                    <Input className={cx('field')} />
                </Form.Item>

                <Form.Item
                    labelAlign="left"
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your ${name}!' },
                        {
                            pattern: /^[a-zA-Z0-9]*$/,
                            message: 'Username can only contain letters and digits',
                        },
                        { max: maxLengthName, message: 'The length of your ${name} is too long' },
                    ]}
                >
                    <Input className={cx('field')} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your ${name}!' },
                        { validator: validateEmail },
                        { max: maxLengthEmail, message: 'The length of your ${name} is too long' },
                    ]}
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
                            message: 'Please input your ${name}!',
                        },
                    ]}
                >
                    <Input type="password" className={cx('field')} />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
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