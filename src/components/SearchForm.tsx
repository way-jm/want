import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Row, Select} from "antd";
import {DownOutlined} from '@ant-design/icons';

const FItem = Form.Item;
const Option = Select.Option;

interface tablePropsType {
    columns: {
        title,
        name?,
        hideInSearch?,
        valueType?,
        valueEnum?,
        dataIndex?,
    }[],
    rowKey?: string
    onSubmit: (e: object) => void
}

const colSizeConfig = {
    lg: 8,
    md: 12,
    xxl: 6,
    xl: 8,
    sm: 12,
    xs: 24
};
const widthToSize = (width) => {
    if (width > 1600) return colSizeConfig.xxl;
    if (width > 1200) return colSizeConfig.xl;
    if (width > 992) return colSizeConfig.lg;
    if (width > 768) return colSizeConfig.md;
    if (width > 576) return colSizeConfig.sm;
    return colSizeConfig.xs;
};

const getOffset = function getOffset(length, colSize?) {
    const span = colSize ? colSize : 8;
    const cols = 24 / span;
    return (cols - 1 - length % cols) * span;
};


const SearchForm: React.FC<tablePropsType> = (props) => {
        const [form] = Form.useForm();
        let {columns, onSubmit} = props;
        columns = columns.filter(colum => {
            return !colum.hideInSearch && colum.valueType !== 'option';
        });
        const [colSize, setColSize] = useState(0);
        const [expand, setExpand] = useState(false);
        const [itemLength, setItemLength] = useState(columns.length);

        const onFinish = values => {
            console.log('Success:', values);
            onSubmit(values);
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        useEffect(() => {
            // 设置col的长度
            setColSize(widthToSize(window.innerWidth));

            // 设置item的个数
            const childLength = 24 / colSize - 1;
            const count = expand ? columns.length : (childLength>columns.length?columns.length:childLength);
            setItemLength(count);

            //窗口发生变化的时候
            const handleResize = () => {
                const colSize = widthToSize(window.innerWidth);
                setColSize(colSize);
            };
            window.addEventListener('resize', handleResize);
            return function windowSizeListener() {
                window.removeEventListener('resize', handleResize);
            };
        }, [colSize, expand, columns]);
        const getFields = () => {
            // 算出一行可以排列几个
            const childLength = 24 / widthToSize(window.innerWidth) - 1;

            const count = expand ? columns.length : (childLength>columns.length?columns.length:childLength);
            const children = [];
            for (let i = 0; i < count; i++) {
                children.push(
                    <Col sm={12} md={12} lg={8} xl={8} xxl={6} key={i}>
                        <Form.Item
                            name={columns[i].name || columns[i].dataIndex}
                            label={`${columns[i].title}`}
                        >
                            {columns[i].valueEnum
                                ? <Select>
                                    {
                                        columns[i].valueEnum.map(item => {
                                            return<Option
                                                value={ item['value']}
                                                key={ item['value']}>
                                                {item['label']}
                                            </Option>;
                                        })
                                    }
                                </Select>
                                : <Input placeholder={`${columns[i].title}`}/>}

                        </Form.Item>
                    </Col>,
                );
            }
            return children;
        };

        return <div className='table-search'>
            <Form
                form={form}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row className='ant-row-start'>
                    {getFields()}
                    <Col sm={12} md={12} lg={8} xl={8} xxl={6} offset={getOffset(itemLength, colSize)}
                         className='table-search-option'>
                        <FItem>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button htmlType="submit" style={{marginLeft: '8px'}} onClick={() => {
                                form.resetFields();
                            }}>
                                重置
                            </Button>
                            {
                                columns.length <= 24 / colSize - 1 ?
                                    null :
                                    <Button type="link" onClick={() => setExpand(!expand)}>
                                        {expand ? '收起' : '展开'}
                                        <DownOutlined style={{transform: expand ? 'rotate(180deg)' : ''}}/>
                                    </Button>
                            }
                        </FItem>
                    </Col>
                </Row>
            </Form>
        </div>;
    }
;

export default SearchForm;
