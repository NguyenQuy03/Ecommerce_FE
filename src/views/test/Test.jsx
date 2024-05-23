// import { Button, Input, Table, Row, Col } from 'antd';
// import { useState, useEffect } from 'react';

// const App = () => {
//     const variations = [
//         {
//             name: 'colour',
//             options: ['Red', 'Blue', 'Purple'],
//         },
//         {
//             name: 'size',
//             options: ['S', 'M', 'L'],
//         },
//     ];
//     const variation1 = variations[0];
//     const variation2 = variations[1];

//     const [mainVariation, setMainVariation] = useState('');

//     const [dataSource, setDataSource] = useState([
//         {
//             key: '0',
//             price: 'Edward King 0',
//             stock: '32',
//             sku: 'London, Park Lane no. 0',
//         },
//         {
//             key: '1',
//             price: 'Edward King 1',
//             stock: '32',
//             sku: 'London, Park Lane no. 1',
//         },
//     ]);

//     useEffect(() => {
//         setMainVariation(variation1.name);
//         variation1.options.forEach((item, index) => {

//             setMainVariationData((prevData) => [
//                 ...prevData,
//                 {
//                     key: item + index,
//                     value: item,
//                 }
//             ]);
//         })
//     }, []);

//     const [mainVariationData, setMainVariationData] = useState([]);

//     const [count, setCount] = useState(2);

//     const defaultColumns = [
//         {
//             title: mainVariation || 'Variation1',
//             dataIndex: 'price',
//             width: '30%',
//             editable: true,
//         },
//         {
//             title: 'Stock',
//             dataIndex: 'stock',
//         },
//         {
//             title: 'SKU',
//             dataIndex: 'sku',
//         },
//     ];

//     const mainVariationColumns = [
//         {
//             title: mainVariation || 'Variation1',
//             dataIndex: 'value',
//             width: '100%',
//         },
//     ];

//     const handleAdd = () => {
//         const newData = {
//             key: count,
//             price: `Edward King ${count}`,
//             stock: '32',
//             sku: `London, Park Lane no. ${count}`,
//         };
//         setDataSource([...dataSource, newData]);
//         setCount(count + 1);
//     };

//     const handleInputChange = (e) => {
//         setMainVariation(e.target.value);
//     };

//     return (
//         <div>
//             <Input value={mainVariation} onChange={handleInputChange} />
//             <Button
//                 onClick={handleAdd}
//                 type="primary"
//                 style={{
//                     marginBottom: 16,
//                 }}
//             >
//                 Add a row
//             </Button>

//             <Row>
//                 <Col span={4}>
//                     <Table columns={mainVariationColumns} dataSource={mainVariationData} />
//                 </Col>
//                 <Col span={20}>
//                     <Table bordered dataSource={dataSource} columns={defaultColumns} />
//                 </Col>
//             </Row>
//         </div>
//     );
// };
// export default App;
import { Table, Input, InputNumber } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';

const variations = [
    {
        name: 'colour',
        options: ['Red', 'Blue', 'Purple'],
    },
    {
        name: 'size',
        options: ['S', 'M', 'L'],
    },
];

const fixedColumns = [
    {
        title: variations[0]?.name,
        width: 120,
        dataIndex: 'mainVariation',
        onCell: (record) => ({
            rowSpan: variations[1]
                ? record.id % variations[1].options.length === 0
                    ? variations[1].options.length
                    : 0
                : 1,
        }),
    },
    {
        title: variations[1]?.name,
        dataIndex: 'subVariation',
        hidden: !variations[1],
    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (value) => <InputNumber prefix="$" defaultValue={value} wheel={false} placeholder="Input" />,
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        render: (value) => <InputNumber defaultValue={value} wheel={false} placeholder="Input" />,
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        render: (value) => <Input defaultValue={value} placeholder="Input" />,
    },
].filter((item) => !item.hidden);

const generateVariationData = (variations) => {
    const data = [];
    let variationsCopy = [...variations];
    let variation1 = variationsCopy.shift();
    let variation2 = variationsCopy.shift();

    if (!variation2) {
        variation1.options.forEach((item, index) => {
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

const App = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(generateVariationData(variations));
    }, [variations]);

    return (
        <div>
            <Table columns={fixedColumns} rowKey="id" dataSource={tableData} pagination={false} bordered />
        </div>
    );
};
export default App;
