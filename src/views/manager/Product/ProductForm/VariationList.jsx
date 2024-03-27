import { Card, Col, Flex, Form, Input } from 'antd';
import { useState } from 'react';
import { Trash3, XLg } from 'react-bootstrap-icons';

import Button from '~/components/Button';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const VariationList = ({ variations, onVariationsChange: setVariations }) => {
    const [variationNameDuplicate, setVariationNameDuplicate] = useState(null);
    const [variationOptionDuplicate, setVariationOptionDuplicate] = useState(null);

    const handleAddVariation = () => {
        setVariations([...variations, { name: '', options: [''] }]);
    };

    const handleRemoveVariation = (index) => {
        const updatedVariations = variations.filter((_, i) => i !== index);
        setVariations(updatedVariations);
    };

    const handleAddOption = (e, variationIndex) => {
        e.preventDefault();
        const updatedVariations = [...variations];
        updatedVariations[variationIndex].options.push('');
        setVariations(updatedVariations);
    };

    const handleRemoveOption = (variationIndex, optionIndex) => {
        const updatedVariations = [...variations];
        updatedVariations[variationIndex].options = updatedVariations[variationIndex].options.filter(
            (_, i) => i !== optionIndex,
        );
        setVariations(updatedVariations);
    };

    const handleVariationName = (e, variationIndex) => {
        const inputValue = e.target.value;
        const existingNames = new Set();

        for (const item of variations) {
            existingNames.add(item.name);
        }

        if (existingNames.has(inputValue)) {
            setVariationNameDuplicate('Names of variations should be different.');
        } else {
            setVariationNameDuplicate(null);
        }

        const updatedVariations = [...variations];
        updatedVariations[variationIndex].name = inputValue;
        setVariations(updatedVariations);
    };

    const handleVariationValue = (e, variationIndex, optionIndex) => {
        const inputValue = e.target.value;
        const existingOptions = new Set(variations[variationIndex].options);

        if (existingOptions.has(inputValue)) {
            setVariationOptionDuplicate('Options of variations should be different.');
        } else {
            setVariationOptionDuplicate(null);
        }

        const updatedVariations = [...variations];
        updatedVariations[variationIndex].options[optionIndex] = inputValue;
        setVariations(updatedVariations);
    };

    return (
        <Form.Item label="Variations">
            <div>
                {variations.map((variation, variationIndex) => (
                    <Card
                        title={`${variation.name}` || `Variation ${variationIndex + 1}`}
                        key={variationIndex}
                        extra={
                            <Button
                                type={'default'}
                                size={'small'}
                                leftIcon={<XLg />}
                                onClick={() => handleRemoveVariation(variationIndex)}
                            ></Button>
                        }
                        size="small"
                        style={{ marginBottom: '20px' }}
                    >
                        <Form.Item
                            label="Name"
                            {...layout}
                            validateStatus={variationNameDuplicate ? 'error' : ''}
                            help={variationNameDuplicate}
                        >
                            <Col span={12}>
                                <Flex style={{ marginRight: '8px' }}>
                                    <Input
                                        type="text"
                                        value={variation.name}
                                        onChange={(e) => handleVariationName(e, variationIndex)}
                                        placeholder="eg:colour, etc"
                                    />
                                    <Button type={'default'} size={'small'} disabled></Button>
                                </Flex>
                            </Col>
                        </Form.Item>

                        <Form.Item
                            label="Options"
                            {...layout}
                            validateStatus={variationOptionDuplicate ? 'error' : ''}
                            help={variationOptionDuplicate}
                        >
                            <Flex wrap="wrap">
                                {variation.options.map((option, optionIndex) => (
                                    <Col span={12} key={optionIndex}>
                                        <Flex style={{ marginRight: '8px', marginBottom: '10px' }}>
                                            <Input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleVariationValue(e, variationIndex, optionIndex)}
                                                placeholder="eg:Red, etc"
                                            />
                                            <Button
                                                type={'default'}
                                                size={'small'}
                                                leftIcon={<Trash3 />}
                                                onClick={() => handleRemoveOption(variationIndex, optionIndex)}
                                            ></Button>
                                        </Flex>
                                    </Col>
                                ))}
                            </Flex>
                        </Form.Item>

                        <Form.Item label=" " {...layout}>
                            <Button type={'outline'} onClick={(e) => handleAddOption(e, variationIndex)}>
                                Add Option
                            </Button>
                        </Form.Item>
                    </Card>
                ))}
                {variations.length < 2 && (
                    <Button type={'primary'} onClick={handleAddVariation}>
                        Add Variation
                    </Button>
                )}
            </div>
        </Form.Item>
    );
};

export default VariationList;
