import { Col, Flex, Form, Input, Row, Select, Switch, notification } from 'antd';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';

import classNames from 'classnames/bind';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';
import AuthService from '~/services/manager/AuthService';
import RoleService from '~/services/manager/RoleService';
import styles from './RegisterForm.module.scss';
const cx = classNames.bind(styles);

const maxLengthName = 40;
const maxLengthEmail = 100;

const USER_REGEX = /^[A-Za-z0-9]+$/;
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;
const layout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
        lg: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        lg: {
            span: 9,
        },
    },
};

const RegisterForm = () => {
    const authService = AuthService();
    const roleService = RoleService();

    const [roles, setRoles] = useState();

    useEffect(() => {
        roleService
            .getRoles()
            .then((response) => {
                setRoles(response);
            })
            .catch((error) => console.error('Error fetching roles in Register Form:', error));
    }, []);

    const [api, notify] = notification.useNotification();
    const openNotificationWithIcon = (type, title, desc) => {
        api[type]({
            message: title,
            description: desc,
        });
    };

    // Set Value Error
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
        authService
            .register(formData)
            .then((response) => {
                openNotificationWithIcon('success', response.data);
                form.resetFields();
            })
            .catch((error) => {
                let errorFeedBack = error.response?.data.errorFeedBack;

                if (errorFeedBack) {
                    Object.entries(errorFeedBack).forEach(([key, value]) => {
                        setFieldError(key, value);
                    });
                } else {
                    console.log('Sth else wrong');
                }
            });
    };

    const validateEmail = async (rule, value) => {
        if (!emailRegex.test(value) && value) {
            throw new Error('Invalid email address');
        }
    };

    return (
        <Flex>
            {notify}
            <Content className={cx('content')}>
                <Flex>
                    <h3 className={cx('title')}>Register</h3>
                </Flex>
                <Row>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <Form
                            form={form}
                            className={cx('body')}
                            {...layout}
                            name="register"
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            layout="horizontal"
                            labelAlign="right"
                            onFinish={onFinish}
                            colon={false}
                        >
                            <Form.Item
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    { required: true, message: 'Please input your full name!' },
                                    { max: maxLengthName, message: 'The length of your full name is too long' },
                                ]}
                            >
                                <Input className={cx('field')} placeholder="Full name" />
                            </Form.Item>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    { required: true, message: 'Please input your username!' },
                                    {
                                        pattern: USER_REGEX,
                                        message: 'Username can only contain letters and digits',
                                    },
                                    { max: maxLengthName, message: 'The length of your username is too long' },
                                    // { min: 3, message: 'The length of your username is too short' },
                                ]}
                            >
                                <Input className={cx('field')} placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { validator: validateEmail },
                                    { max: maxLengthEmail, message: 'The length of your email is too long' },
                                ]}
                                hasFeedback
                            >
                                <Input type="email" className={cx('field')} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input type="password" className={cx('field')} placeholder="Password" />
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
                                            return Promise.reject(
                                                new Error('The new password that you entered do not match!'),
                                            );
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input
                                    type="password"
                                    className={cx('field')}
                                    addonAfter={''}
                                    placeholder="Confirm password"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose a role!',
                                    },
                                ]}
                                required={true}
                            >
                                <Select fieldNames={{ label: 'name', value: 'code' }} options={roles}></Select>
                            </Form.Item>

                            <Form.Item name="isActive" label="Status" initialValue={false}>
                                <Switch />
                            </Form.Item>

                            <Form.Item label=" ">
                                <Button className={cx('submit-btn')} type="primary" size={'large'} htmltype="submit">
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Flex>
    );
};

export default RegisterForm;
