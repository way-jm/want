import {Col, Form, Input, Select} from "antd";
import React from "react";
const FItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const getFields = (columns) => {
    const children = [];
    for (let i = 0; i < columns.length; i++) {
        children.push(
            <Col sm={24} md={12} lg={12} xl={12} xxl={12} key={i}>
                <FItem
                    {...formItemLayout}
                    name={columns[i].name||columns[i].dataIndex}
                    label={`${columns[i].title}`}
                    rules={columns[i]['rules']}
                >
                    {columns[i].valueEnum
                        ? <Select>
                            {
                                columns[i].valueEnum.map(item => {
                                    return <Option
                                        value={columns[i].kv ? item[columns[i].kv] : item['value']}
                                        key={columns[i].kv ? item[columns[i].kv] : item['value']}>
                                        {columns[i].kn ? item[columns[i].kn] : item['label']}
                                    </Option>;
                                })
                            }
                        </Select>
                        : <Input placeholder={`${columns[i].title}`}/>}

                </FItem>
            </Col>,
        );
    }
    return children;
};

export default getFields;
