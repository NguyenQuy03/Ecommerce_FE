import { Form, Input, Modal, Upload, message, Flex } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import Button from '~/components/Buyer/Button';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const handleThumbnailFileType = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const maxLengthCode = 10;
const maxLengthName = 20;

const CategoryForm = () => {
    const [fileList, setFileList] = useState([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Handle Submit Behavior
    const [form] = Form.useForm();
    const onFinish = (formData) => {
        console.log('Sucess');
        console.log(formData);
    };

    const onFinishFailed = (e) => {
        console.log('Error');
        console.log(e);
    };

    // Validate Form Field
    const handleChange = async ({ fileList: newFileList }) => {
        // Update the fileList state
        setFileList(newFileList);

        // Convert files to base64 and update form values
        const base64Promises = newFileList.map((file) => {
            if (file.originFileObj && !file.url && !file.preview) {
                // Only convert to base64 if it's a newly added file without a preview
                return getBase64(file.originFileObj);
            }
            return Promise.resolve(file.url || file.preview);
        });

        const base64Files = await Promise.all(base64Promises);

        // Update the form with the base64 strings
        form.setFieldsValue({ thumbnail: base64Files });
    };  

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewThumbnail(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    return (
        <div>
            <Flex>
                <p style={{ fontSize: '2.4rem', fontWeight: 500 }}>BASIC INFORMATION</p>
            </Flex>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                colon={false}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ padding: '20px 0' }}
            >
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[
                        { required: true, message: 'This field cannot be empty' },
                        { max: maxLengthCode, message: 'The length of your code is too long' },
                    ]}
                >
                    <Input maxLength={maxLengthCode} showCount />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: 'This field cannot be empty' },
                        { max: maxLengthName, message: 'The length of your name is too long' },
                    ]}
                >
                    <Input maxLength={maxLengthName} showCount />
                </Form.Item>

                <Form.Item
                    label="Thumbnail"
                    valuePropName="fileList"
                    rules={[{ required: true, message: 'Please select a thumbnail!' }]}
                    name="thumbnail"
                >
                    <ImgCrop rotationSlider>
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            accept="image/png, image/jpeg"
                            fileList={fileList}
                            onChange={handleChange}
                            onPreview={handlePreview}
                            beforeUpload={handleThumbnailFileType}
                            maxCount={1}
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Form.Item>

                <Form.Item label=" ">
                    <Button type={'primary'} size={'normal'} htmltype="submit">
                        Submit
                    </Button>
                </Form.Item>

                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                    style={{ marginTop: '-40px' }}
                >
                    <img
                        alt="Preview Thumbnail"
                        style={{
                            width: '100%',
                        }}
                        src={previewThumbnail}
                    />
                </Modal>
            </Form>
        </div>
    );
};
export default CategoryForm;
