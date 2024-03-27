import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { Card, Col, Flex, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Upload, message } from 'antd';
import { PlusLg, Trash3 } from 'react-bootstrap-icons';

import { useEffect, useRef, useState } from 'react';
import Button from '~/components/Button';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

import classNames from 'classnames/bind';
import CategoryService from '~/services/buyer/CategoryService';
import ProductService from '~/services/manager/ProductService';
import styles from './ProductForm.module.scss';
import VariationList from './VariationList';
import VariationTable from './VariationTable';
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
    const productService = ProductService();
    const categoryService = CategoryService();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService
            .getCategories()
            .then((res) => {
                setCategories(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    // Handle Submit Behavior
    const [form] = Form.useForm();

    const [descriptionData, setDescriptionData] = useState('');

    const submitBtn = useRef();

    const handleSubmit = (e) => {
        const productImages = form.getFieldValue('productImages');
        if (productImages && productImages.fileList) {
            const postProductImages = productImages.fileList.map((image) => image.thumbUrl);
            form.setFieldValue('productImages', postProductImages);
        }

        let productItems = variationTableData.map((item, index) => {
            return {
                ...item,
                image: productItemImages[index][0].thumbUrl,
                variation: `${variations[0].name}: ${item?.mainVariation}${
                    item.subVariation ? `; ${variations[1].name}: ${item.subVariation}` : ''
                }`,
            };
        });

        if (form.getFieldValue('price') && form.getFieldValue('stock')) {
            productItems.push({
                price: form.getFieldValue('price'),
                stock: form.getFieldValue('stock'),
            });
        }

        const submitSpecification = {};
        form.getFieldValue('specification').forEach((item) => {
            if (item.label) {
                submitSpecification[item.label] = item.property;
            }
        });

        const category = {};
        category['code'] = form.getFieldValue('category');

        const submitValue = {
            ...form.getFieldsValue(),
            category,
            productItems,
            description: descriptionData,
            specification: JSON.stringify(submitSpecification),
        };
        console.log(submitValue);

        productService
            .addProduct(submitValue)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const cancelDiscard = () => {
        console.log('Cancel');
    };

    const confirmDiscard = () => {
        console.log('Discard');
    };

    // Handle Images
    const [fileList, setFileList] = useState([]);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleProductImage = (info) => {
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
        action: 'http://localhost:3000/api/v1/upload',
        onChange: handleProductImage,
        onPreview: handlePreview,
        beforeUpload: handleImageFileType,
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
                    key: index,
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
                        key: idx1 * variation2.options.length + idx2,
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

    useEffect(() => {
        setVariationTableData(generateVariationData(variations));
    }, [variations]);

    const handleEnableVariation = (e) => {
        e.preventDefault();

        setVariations([{ name: '', options: [''] }]);

        setVariationTableData([
            {
                key: 0,
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
    };
    const handleVariationTableDataChange = (newData) => {
        setVariationTableData(newData);
    };

    const [productItemImages, setProductItemImages] = useState([]);

    return (
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
            initialValues={{
                specification: [{}],
                variations,
            }}
        >
            <Content>
                <Flex justify="space-between" align="center">
                    <h2>Add a product</h2>
                    <Flex>
                        <Popconfirm
                            title="Discard the task"
                            description="Are you sure to discard this product?"
                            onConfirm={confirmDiscard}
                            onCancel={cancelDiscard}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type={'outline'}
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                Discard
                            </Button>
                        </Popconfirm>

                        <Button type={'primary'} refs={submitBtn} onClick={handleSubmit}>
                            Add Product
                        </Button>
                    </Flex>
                </Flex>
            </Content>

            {/* Basic Information */}
            <Content>
                <Flex>
                    <p className={cx('title')}>Basic Information</p>
                </Flex>
                <Form.Item
                    label="Product Images"
                    rules={[
                        {
                            required: false,
                            message: 'Image is missing, please make sure at least this product has one cover image.',
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
                        { required: false, message: 'This field cannot be empty' },
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
                    rules={[{ required: false, message: 'This field cannot be empty' }]}
                >
                    <Select fieldNames={{ label: 'name', value: 'code' }} options={categories} />
                </Form.Item>

                <Form.Item name="description" label="Product Description">
                    <CKEditor
                        editor={ClassicEditor}
                        data={descriptionData}
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
                            });
                        }}
                        onChange={(event, editor) => {
                            setDescriptionData(editor.getData());
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
                    <Form.List name="specification">
                        {(fields, { add, remove }) => (
                            <Card size="small">
                                {fields.map(({ key, name, ...restField }) => (
                                    <Flex key={key} align="center" justify="flex-start" gap={10}>
                                        <Col span={6}>
                                            <Form.Item {...restField} name={[name, 'label']} style={{ width: '100%' }}>
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
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: false,
                                    message: 'This field cannot be empty',
                                },
                            ]}
                        >
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
                        <Form.Item
                            label="Stock"
                            name="stock"
                            rules={[
                                {
                                    required: false,
                                    message: 'This field cannot be empty',
                                },
                            ]}
                        >
                            <InputNumber max={maxStock} min={minStock} style={{ minWidth: '200px' }} wheel={false} />
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <VariationList variations={variations} onVariationsChange={handleVariationsChange} />

                        {/* Variations Table */}
                        <Form.Item label="Variation Table">
                            <Row>
                                <VariationTable
                                    variationTableData={variationTableData}
                                    variations={variations}
                                    handlePreview
                                    handleImageFileType
                                    onVariationsTableChange={handleVariationTableDataChange}
                                    setProductItemImages={setProductItemImages}
                                />
                            </Row>
                        </Form.Item>
                    </>
                )}
            </Content>
            <Content>
                <Flex justify="space-between" align="center">
                    <h2>You're almost done!</h2>
                    <Flex>
                        <Button type={'outline'}>Discard</Button>
                        <Button type={'primary'} refs={submitBtn} onClick={handleSubmit}>
                            Add Product
                        </Button>
                    </Flex>
                </Flex>
            </Content>
        </Form>
    );
};
export default ProductForm;
