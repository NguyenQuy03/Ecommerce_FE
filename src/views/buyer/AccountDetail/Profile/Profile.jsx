import { Col, Divider, Form, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { WrapperContent } from '~/components/Wrapper';

import { Select } from 'antd';
import Button from '~/components/Buyer/Button';

const { Option } = Select;

const formItemLayout = {
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
            span: 18,
        },
    },
};

function Profile() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/tinh_tp.json') //eslint-disable-line
            .then((response) => response.json())
            .then((responseJson) => {
                setCountries(Object.values(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Row style={{ width: '100%' }}>
            <WrapperContent>
                <p>My Profile</p>
                <Divider></Divider>
                <Row style={{ width: '100%' }}>
                    <Col span="16">
                        <Form {...formItemLayout}>
                            <Form.Item label="Username">
                                <p>nguyenquy3303</p>
                            </Form.Item>
                            <Form.Item label="Email">
                                <p>nguyenquy3303@gmail.com</p>
                            </Form.Item>
                            <Form.Item label="Phone Number">
                                <p>0862193055</p>
                            </Form.Item>
                            <Form.Item label="Gender">
                                <Radio.Group defaultValue={'male'}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Address">
                                <Select style={{ width: 200, fontFamily: 'sans-serif' }}>
                                    {countries.map(item => (
                                        <Option key={item.code} value={item.slug} style={{ fontFamily: 'sans-serif' }}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type={'primary'} htmltype='submit'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span="8">
                        <Divider type="vertical" orientationMargin={1} style={{ height: '100%' }}></Divider>
                        {/* <img src="" alt="" /> */}
                        Image
                    </Col>
                </Row>
            </WrapperContent>
        </Row>
    );
}

export default Profile;
