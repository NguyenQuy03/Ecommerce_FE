import { Space, Table, Tooltip, Popconfirm, notification } from 'antd';
import { useEffect, useState } from 'react';
import { PencilSquare, XSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { Content } from '~/layouts/ManagerLayouts/LayoutComponents';

import CategoryServiceOfBuyer from '~/services/buyer/CategoryService';
import CategoryService from '~/services/manager/CategoryService';

const CategoryTable = () => {
    const categoryServiceOfBuyer = CategoryServiceOfBuyer();
    const categoryService = CategoryService();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const handleNavigate = (index) => {
        navigate('/manager/category', { state: categories[index] });
    }

    const [api, notify] = notification.useNotification();
    const openNotificationWithIcon = (type, title, desc) => {
        api[type]({
            message: title,
            description: desc,
        });
    };

    const confirm = (record) => {
        categoryService
            .deleteCategory({ id: record.id })
            .then((response) => {
                openNotificationWithIcon('success', response.data);
                const newData = categories.filter(i => i.id !== record.id)
                setCategories(newData);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const cancel = (e) => {
        console.log(e);
    };

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
            render: (url) => <img src={url} alt="Category Thumbnail" style={{ maxWidth: '60px' }} />,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Space size="middle">
                    <Tooltip title="Update" mouseEnterDelay={0.3}>
                        <Button type={'outline'} size={'small'} leftIcon={<PencilSquare />} onClick={() => handleNavigate(index)}/>
                    </Tooltip>
                    <Tooltip title="Delete" mouseEnterDelay={0.3}>
                        <Popconfirm
                            title="Delete the category"
                            description="Are you sure to delete this category?"
                            onConfirm={() => confirm(record)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type={'primary'} size={'small'} leftIcon={<XSquare />} />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        categoryServiceOfBuyer
            .getCategories()
            .then((response) => {
                setCategories(response);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    return (
        <Content>
            {notify}
            <Table
                columns={columns}
                dataSource={categories}
                bordered
                pagination={{
                    total: categories.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    defaultPageSize: 20,
                    defaultCurrent: 1,
                }}
                rowKey="id"
            />
        </Content>
    );
};
export default CategoryTable;
