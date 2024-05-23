import { Card, Col, Flex, Form, Input } from 'antd';
import { Trash3, XLg } from 'react-bootstrap-icons';

import Button from '~/components/Button';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const VariationList = ({ variations, onVariationsChange: setVariations }) => {
    const handleAddVariation = () => {
        setVariations([...variations, { name: '', options: [''] }]);
    };

    const handleRemoveVariation = (index) => {
        const updatedVariations = variations.filter((_, i) => i !== index);
        setVariations(updatedVariations);
    };

    const handleAddOption = (variationIndex) => {
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

    return (
        <Form.Item label="Variations">
            <div>
                {variations.map((variation, variationIndex) => (
                    <Card
                        title={`Variation ${variation.name}`}
                        key={variationIndex}
                        extra={
                            <Button
                                type={'default'}
                                size={'small'}
                                leftIcon={<XLg />}
                                onClick={() => handleRemoveVariation(variationIndex)}
                            ></Button>
                        }
                        size='small'
                        style={{ marginBottom: '20px' }}
                    >
                        <Form.Item label="Name" {...layout}>
                            <Col span={12}>
                                <Flex style={{ marginRight: '8px' }}>
                                    <Input
                                        type="text"
                                        value={variation.name}
                                        onChange={(e) => {
                                            const updatedVariations = [...variations];
                                            updatedVariations[variationIndex].name = e.target.value;
                                            setVariations(updatedVariations);
                                        }}
                                        placeholder="eg:colour, etc"
                                    />
                                    <Button type={'default'} size={'small'} disabled></Button>
                                </Flex>
                            </Col>
                        </Form.Item>

                        <Form.Item label="Options" {...layout}>
                            <Flex wrap="wrap">
                                {variation.options.map((option, optionIndex) => (
                                    <Col span={12} key={optionIndex}>
                                        <Flex style={{ marginRight: '8px', marginBottom: '10px' }}>
                                            <Input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const updatedVariations = [...variations];
                                                    updatedVariations[variationIndex].options[optionIndex] =
                                                        e.target.value;
                                                    setVariations(updatedVariations);
                                                }}
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
                            <Button type={'outline'} onClick={() => handleAddOption(variationIndex)}>
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
