import { Col, Divider, Flex, Form, Input, Row, Select, Switch, InputNumber, Popconfirm } from 'antd';
import { useState } from 'react';
import { PersonFill, PencilFill, CheckLg, XLg } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Buyer/Button';
import { register } from '~/services/AuthService';

import classNames from 'classnames/bind';
import styles from './AccountDetail.module.scss';
const cx = classNames.bind(styles);

const maxLengthName = 40;
const maxLengthEmail = 100;

const USER_REGEX = /^[A-Za-z0-9]+$/;
const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[\d.]{1,3}\.[\d.]{1,3}\.[\d.]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const layoutForm = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
        lg: {
            span: 6,
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
            span: 14,
        },
    },
};

function AccountDetail() {
    const navigate = useNavigate();

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
                    console.log('Sth else wrong');
                }
            });
    };

    const validateEmail = async (rule, value) => {
        if (!emailRegex.test(value) && value) {
            throw new Error('Invalid email address');
        }
    };

    // Edit Account Information
    const [isEditing, setIsEditing] = useState(false);

    const handleEditing = () => {
        setIsEditing(!isEditing);
    };

    const confirm = () => {
        setIsEditing(false);
    };

    const cancel = (e) => {
        console.log(e);
    };

    return (
        <div>
            <Flex vertical>
                <Flex justify="space-between">
                    <h1 className={cx('header-title')}>Tony Robbins</h1>
                    <Flex align="center" gap={6} className={cx('header-title')}>
                        Buyer
                        <PersonFill />
                    </Flex>
                </Flex>
                <div>
                    <p>Customer was created</p>
                    <p>Jan 12, 11:13 PM</p>
                </div>
            </Flex>
            <Divider />
            <Flex vertical>
                <Flex justify="space-between">
                    <h1 className={cx('header-title')}>Details</h1>
                    <Button
                        onClick={handleEditing}
                        className={cx('update-btn')}
                        type={'outline'}
                        size={'small'}
                        leftIcon={<PencilFill />}
                    >
                        Update details
                    </Button>
                </Flex>

                <Form
                    form={form}
                    className={cx('body')}
                    {...layoutForm}
                    name="acc-info"
                    layout="horizontal"
                    labelAlign="left"
                    onFinish={onFinish}
                    colon={false}
                    labelWrap
                    requiredMark="optional"
                    variant={isEditing ? 'outlined' : 'filled'}
                    initialValues={{
                        id: 'nguyenquy',
                        email: 'huyquy2003@gmail.com',
                        role: 'Buyer',
                        'reveive-email': 'huyquy2003@gmail.com',
                        address: 'Dong Mai Ha Dong Ha Noi',
                        phoneNumber: '0862193055',
                    }}
                >
                    <Row className={cx('detail-info')}>
                        <Col span={12}>
                            <h3 className={cx('header-form')}>Account Information</h3>

                            <Form.Item
                                label="ID"
                                name="id"
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
                                <Input readOnly={!isEditing} className={cx('field')} placeholder="Username" />
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
                                <Input readOnly={!isEditing} type="email" className={cx('field')} />
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
                                required
                            >
                                {isEditing ? (
                                    <Select defaultValue={'buyer'}>
                                        <Select.Option value="buyer">Buyer</Select.Option>
                                        <Select.Option value="seller">Seller</Select.Option>
                                    </Select>
                                ) : (
                                    <Input readOnly className={cx('field')} />
                                )}
                            </Form.Item>

                            <Form.Item name={'status'} label="Status">
                                <Switch className={cx('field')} defaultChecked />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <h3 className={cx('header-form')}>Billing Information</h3>

                            <Form.Item
                                label="Send email to"
                                name="reveive-email"
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
                                <Input className={cx('field')} readOnly={!isEditing} />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    { required: true, message: 'Please input your address!' },
                                ]}
                            >
                                <Input className={cx('field')} readOnly={!isEditing} />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[
                                    { required: true, message: 'Please input your phone number!' },
                                ]}
                            >
                                <Input className={cx('field')} readOnly={!isEditing} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Flex justify="flex-end" style={{ height: '36px' }}>
                    {isEditing ? (
                        <>
                            <Popconfirm
                                title="Cancel the task"
                                description="Are you sure to cancel this task?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button className={cx('update-btn')} type={'outline'} size={'small'} leftIcon={<XLg />}>
                                    Cancel
                                </Button>
                            </Popconfirm>
                            <Button className={cx('update-btn')} type={'primary'} size={'small'} leftIcon={<CheckLg />}>
                                Save Change
                            </Button>
                        </>
                    ) : (
                        <div></div>
                    )}
                </Flex>
            </Flex>
        </div>
    );
}

export default AccountDetail;
