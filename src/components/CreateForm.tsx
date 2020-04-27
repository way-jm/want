import React from 'react';
import {Modal, Form, Row} from 'antd';
import getFields from "../common/js/getFields";



interface CreateFormProps {
    columns,
    modalVisible: boolean;
    onCancel: () => void;
    rules?: [],
    onOK: (values: any) => void;
}


const CreateForm: React.FC<CreateFormProps> = (props) => {
    let {modalVisible, onCancel, columns, onOK} = props;
    const onFinish = values => {
        onOK(values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const createInitValues = () => {
        const initValue = {};
        columns.forEach((column) => {
            if (column.valueEnum) {
                initValue[column.name || column.dataIndex] = column.kv ? column.valueEnum[0][column.kv] : column.valueEnum[0]['value'];
            }
        });
        return initValue;
    };
    const [form] = Form.useForm();
    columns = columns.filter(column => {
        return !column.hideInTable && column.valueType !== 'option';
    });

    return (
        <Modal
            destroyOnClose
            title="新建"
            visible={modalVisible}
            onCancel={() => onCancel()}
            width={700}
            okText="确认"
            cancelText="取消"
            onOk={() => form.submit()}
        >
            <Form
                name="create"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={createInitValues() as any}
            >
                <Row gutter={24}>{getFields(columns)}</Row>
            </Form>
        </Modal>
    );
};

export default CreateForm;
