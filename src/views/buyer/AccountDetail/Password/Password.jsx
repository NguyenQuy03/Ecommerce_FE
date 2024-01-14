import { Form, Row, Col, Input } from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        lg: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        lg: {
            span: 16,
        },
    }
};

function Password() {
    const [form] = Form.useForm();

    return (
        <Row>
            <Col span="16">
                <Form form={form} name="dependencies" autoComplete="off" {...formItemLayout}> 
                    <Form.Item
                        label="Current Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Re-enter New Password"
                        name="confirm-password"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Col>
            <Col span="8"></Col>
        </Row>
    );
}

export default Password;
