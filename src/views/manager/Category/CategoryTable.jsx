import React from 'react';
import { Space, Table, Tooltip } from 'antd';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';
import Button from '~/components/Button';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a href={text}>{text}</a>,
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Tooltip title="Update" mouseEnterDelay={0.3}>
                    <Button type={'outline'} size={'small'} leftIcon={<PencilSquare />} />
                </Tooltip>
                <Tooltip title="Delete" mouseEnterDelay={0.3}>
                    <Button type={'primary'} size={'small'} leftIcon={<XSquare />} />
                </Tooltip>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        code: 32,
        thumbnail: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        code: 42,
        thumbnail: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        code: 32,
        thumbnail: 'Sydney No. 1 Lake Park',
    },
];
const CategoryTable = () => (
    <Content>
        <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={{
                total: 85,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                defaultPageSize: 20,
                defaultCurrent: 1,
            }}
        />
    </Content>
);
export default CategoryTable;
