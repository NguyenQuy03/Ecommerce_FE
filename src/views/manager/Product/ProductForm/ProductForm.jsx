import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { Card, Col, Flex, Form, Input, InputNumber, Modal, Table, Upload, message, Select, Row, Space } from 'antd';
import { PlusLg, Trash3, Upload as UploadIcon } from 'react-bootstrap-icons';

import ImgCrop from 'antd-img-crop';
import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

import classNames from 'classnames/bind';
import styles from './ProductForm.module.scss';
import VariationList from './VariationList';
const cx = classNames.bind(styles);

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const handleImageFileType = (file) => {
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

const maxLengthProductName = 120;
const minLengthProductName = 10;

const minStock = 0;
const maxStock = 10000000;

const maxPrice = 100000;
const minPrice = 0.1;

const maxImages = 3;

const ProductForm = () => {
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

    // Handle Images
    const [fileList, setFileList] = useState([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleChange = (info) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        setFileList(newFileList);
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

    const productImagesProps = {
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange: handleChange,
        onPreview: handlePreview,
        beforeUpload: { handleImageFileType },
        multiple: true,
        listType: 'picture-card',
        accept: 'image/png, image/jpeg',
        maxCount: maxImages,
    };

    // HANDLE Variations
    const [variations, setVariations] = useState([]);
    const [variationTableData, setVariationTableData] = useState([]);

    const generateVariationData = (variations) => {
        const data = [];
        let variationsCopy = [...variations];
        let variation1 = variationsCopy.shift();
        let variation2 = variationsCopy.shift();

        if (!variation2) {
            variation1?.options.forEach((item, index) => {
                data.push({
                    id: index,
                    mainVariation: item,
                    price: '',
                    stock: '0',
                    sku: '',
                });
            });
        } else {
            variation1.options.forEach((it1, idx1) => {
                variation2.options.forEach((it2, idx2) => {
                    data.push({
                        id: idx1 * variation2.options.length + idx2,
                        mainVariation: it1,
                        subVariation: it2,
                        price: '',
                        stock: '0',
                        sku: '',
                    });
                });
            });
        }
        return data;
    };

    const variationTableColumns = [
        {
            title: variations[0]?.name || 'Variation 1',
            width: 200,
            dataIndex: 'mainVariation',
            onCell: (record) => ({
                rowSpan: variations[1]
                    ? record.id % variations[1].options.length === 0
                        ? variations[1].options.length
                        : 0
                    : 1,
            }),
            render: (value) => (
                <div style={{textAlign: 'center'}}>
                    <p>{value}</p>
                    <ImgCrop rotationSlider>
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture"
                            accept="image/png, image/jpeg"
                            onPreview={handlePreview}
                            beforeUpload={handleImageFileType}
                            maxCount={1}
                        >
                            <Button type={'outline'} size={'small'} leftIcon={<UploadIcon />}></Button>
                        </Upload>
                    </ImgCrop>
                </div>
            ),
            ellipsis: true
        },
        {
            title: variations[1]?.name || 'Variation 2',
            dataIndex: 'subVariation',
            hidden: !variations[1],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (value) => (
                <InputNumber
                    prefix="$"
                    min={minPrice}
                    max={maxPrice}
                    defaultValue={value}
                    wheel={false}
                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ minWidth: '150px' }}
                    placeholder="Input"
                />
            ),
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: (value) => (
                <InputNumber max={maxStock} min={minStock} style={{ minWidth: '150px' }} defaultValue={0} />
            ),
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            render: (value) => <Input defaultValue={value} placeholder="Input" />,
        },
    ].filter((item) => !item.hidden);

    useEffect(() => {
        setVariationTableData(generateVariationData(variations));
    }, [variations]);

    const handleEnableVariation = () => {
        setVariations([{ name: '', options: [''] }]);

        setVariationTableData([
            {
                id: 0,
                mainVariation: '',
                subVariation: '',
                price: '',
                stock: '0',
                sku: '',
            },
        ]);
    };

    // Handle Variations Table
    const handleVariationsChange = (updatedVariations) => {
        setVariations(updatedVariations);
        form.setFieldValue('variations', variations);
    };

    return (
        <>
            <Content>
                <Flex justify="space-between" align="center">
                    <h2>Add a product</h2>
                    <Flex>
                        <Button type={'outline'}>Discard</Button>
                        <Button type={'primary'}>Add Product</Button>
                    </Flex>
                </Flex>
            </Content>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="horizontal"
                colon={false}
                form={form}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                initialValues={{
                    specs: [{}],
                    variations,
                }}
            >
                {/* Basic Information */}
                <Content>
                    <Flex>
                        <p className={cx('title')}>Basic Information</p>
                    </Flex>
                    <Form.Item
                        label="Product Images"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Image is missing, please make sure at least this product has one cover image.',
                            },
                        ]}
                        name="productImages"
                    >
                        <Upload {...productImagesProps} fileList={fileList}>
                            {fileList.length < maxImages && '+ Upload'}
                        </Upload>
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

                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[
                            { required: true, message: 'This field cannot be empty' },
                            { max: maxLengthProductName, message: 'The length of your product name is too long' },
                            {
                                min: minLengthProductName,
                                message: 'Your product name is too short. Please input at least 10 characters.',
                            },
                        ]}
                    >
                        <Input showCount maxLength={maxLengthProductName} />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'This field cannot be empty' }]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'men-clothes',
                                    label: 'Men Clothes',
                                },
                                {
                                    value: 'women-clothes',
                                    label: 'Women Clothes',
                                },
                                {
                                    value: 'tech',
                                    label: 'Tech',
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="description" label="Product Description">
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
                                });
                            }}
                            onChange={(event, editor) => {
                                console.log(event, editor);
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </Form.Item>
                </Content>

                {/* Specification */}
                <Content>
                    <Flex>
                        <p className={cx('title')}>Specification</p>
                    </Flex>
                    <Form.Item label=" ">
                        <Form.List name="specs">
                            {(fields, { add, remove }) => (
                                <Card size="small">
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Flex key={key} align="center" justify="flex-start" gap={10}>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'label']}
                                                    style={{ width: '100%' }}
                                                >
                                                    <Input placeholder="Label" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item {...restField} name={[name, 'property']}>
                                                    <Input placeholder="Property" />
                                                </Form.Item>
                                            </Col>

                                            {fields.length > 1 && (
                                                <Form.Item>
                                                    <Button
                                                        size={'small'}
                                                        type={'default'}
                                                        leftIcon={<Trash3 />}
                                                        onClick={() => remove(name)}
                                                    ></Button>
                                                </Form.Item>
                                            )}
                                        </Flex>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                add();
                                            }}
                                            leftIcon={<PlusLg />}
                                        >
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </Card>
                            )}
                        </Form.List>
                    </Form.Item>
                </Content>

                {/* Sales Information */}
                <Content>
                    <Flex>
                        <p className={cx('title')}>Sales Information</p>
                    </Flex>

                    {/* Variations */}
                    {variations.length === 0 ? (
                        <>
                            <Form.Item label="Variations">
                                <Button type={'outline'} leftIcon={<PlusLg />} onClick={handleEnableVariation}>
                                    Enable Variations
                                </Button>
                            </Form.Item>
                            <Form.Item label="Price">
                                <InputNumber
                                    prefix="$"
                                    min={minPrice}
                                    max={maxPrice}
                                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ minWidth: '200px' }}
                                    wheel={false}
                                />
                            </Form.Item>
                            <Form.Item label="Stock">
                                <InputNumber
                                    max={maxStock}
                                    min={minStock}
                                    style={{ minWidth: '200px' }}
                                    wheel={false}
                                />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <VariationList variations={variations} onVariationsChange={handleVariationsChange} />

                            {/* Variations Table */}
                            <Form.Item label="Variation Table">
                                <Row>
                                    <Table
                                        columns={variationTableColumns}
                                        rowKey="id"
                                        dataSource={variationTableData}
                                        pagination={false}
                                        bordered
                                    />
                                </Row>
                            </Form.Item>
                        </>
                    )}
                </Content>
            </Form>

            <Content>
                <Flex justify="space-between" align="center">
                    <h2>You're almost done!</h2>
                    <Flex>
                        <Button type={'outline'}>Discard</Button>
                        <Button type={'primary'}>Add Product</Button>
                    </Flex>
                </Flex>
            </Content>
        </>
    );
};
export default ProductForm;
