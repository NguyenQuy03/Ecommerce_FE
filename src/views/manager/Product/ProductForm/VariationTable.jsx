import { Input, InputNumber, Table, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useCallback, useState, useEffect } from 'react';
import { Upload as UploadIcon } from 'react-bootstrap-icons';
import Button from '~/components/Button';

const minStock = 0;
const maxStock = 10000000;

const maxPrice = 100000;
const minPrice = 0.1;

const VariationTable = ({
    variationTableData,
    variations,
    handlePreview,
    handleImageFileType,
    onVariationsTableChange: setVariationTableData,
    setProductItemImages,
}) => {
    // Update the handleProductItemImages function
    const handleProductItemImages = useCallback(
        (info, record) => {
            if (info.file.status === 'done') {
                let newFileList = info.fileList.map((file) => {
                    if (file.response) {
                        file.url = file.response.url;
                    }
                    return file;
                });

                setProductItemImages((prev) => {
                    let updatedProductItemImages = [...prev];
                    const index = updatedProductItemImages.findIndex((_, i) => i === record.key);
                    if (index !== -1) {
                        updatedProductItemImages[index] = newFileList;
                    } else {
                        updatedProductItemImages = [...prev, newFileList];
                    }
                    return updatedProductItemImages;
                });
            }
        },
        [setProductItemImages],
    );

    const handleSave = useCallback(
        (row, column, newValue) => {
            const newData = variationTableData.map((item) => {
                if (item.key === row.key) {
                    return { ...item, [column]: newValue };
                }
                return item;
            });
            setVariationTableData(newData);
        },
        [variationTableData, setVariationTableData],
    );

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const variationTableColumns = [
            {
                title: variations[0]?.name || 'Variation 1',
                width: 200,
                dataIndex: 'mainVariation',
                render: (value, record) => (
                    <div style={{ textAlign: 'center' }}>
                        <p>{value}</p>
                        <ImgCrop rotationSlider>
                            <Upload
                                action="http://localhost:3000/api/v1/upload"
                                listType="picture"
                                accept="image/png, image/jpeg"
                                onPreview={handlePreview}
                                beforeUpload={handleImageFileType}
                                maxCount={1}
                                onChange={(info) => handleProductItemImages(info, record)}
                            >
                                <Button type={'outline'} size={'small'} leftIcon={<UploadIcon />}></Button>
                            </Upload>
                        </ImgCrop>
                    </div>
                ),
                ellipsis: true,
            },
            {
                title: variations[1]?.name || 'Variation 2',
                dataIndex: 'subVariation',
                hidden: !variations[1],
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: (value, record) => (
                    <InputNumber
                        prefix="$"
                        min={minPrice}
                        max={maxPrice}
                        value={value}
                        wheel={false}
                        formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ minWidth: '150px' }}
                        placeholder="Input"
                        onChange={(newValue) => {
                            handleSave(record, 'price', newValue);
                        }}
                    />
                ),
            },
            {
                title: 'Stock',
                dataIndex: 'stock',
                render: (value, record) => (
                    <InputNumber
                        max={maxStock}
                        min={minStock}
                        style={{ minWidth: '150px' }}
                        value={value}
                        onChange={(newValue) => {
                            handleSave(record, 'stock', newValue);
                        }}
                    />
                ),
            },
            {
                title: 'SKU',
                dataIndex: 'sku',
                render: (value, record) => (
                    <Input
                        value={value}
                        placeholder="Input"
                        onChange={(e) => {
                            handleSave(record, 'sku', e.target.value);
                        }}
                    />
                ),
            },
        ];

        const updatedColumns = variationTableColumns.map((col) => {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataindex: col.dataIndex,
                    title: col.title,
                }),
            };
        });

        setColumns(updatedColumns);
    }, [variationTableData]);

    return (
        <Table
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={variationTableData}
            columns={columns}
            pagination={false}
        />
    );
};
export default VariationTable;
