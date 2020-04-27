import React, {useState} from 'react';
import {Divider, Button, message} from "antd";
import './Company.less';
import MainTable from "../../components/MainTable";
import {getDataDict} from "../../common/js/cache";
import {getCompanyList, getCompanyDetail, editCompany} from "../../service/enterprise";
import UpdateForm from "../../components/UpdateForm";

const children = getDataDict()['dict:children']||{};
const {CHANGE_TYPE=[], IS_DIRTY=[]} = children;

const Company: React.FC = () => {
    const [modalShow, setModalShow] = useState(false);
    const [detail, setDetail] = useState({});
    const [reload, setReload] = useState(false);
    // 1为查看，2为编辑
    const [update, setUpdate] = useState(1);


    const columns = [
        {
            title: '企业编号',
            dataIndex: 'id',
            hideInSearch: true,
            rules: [
                {
                    required: true,
                    message: '企业编号',
                },
            ],
        },
        {
            title: '企业名称',
            dataIndex: 'name',
            rules: [
                {
                    required: true,
                    message: '企业名称',
                },
            ],
        },
        {
            title: '是否可爱呢',
            hideInSearch: true,
            dataIndex: 'dirty',
            name: 'is_dirty',
            valueEnum: IS_DIRTY,
        },
        {
            title: '企业规模',
            dataIndex: 'change',
            name: 'change_type',
            valueEnum: CHANGE_TYPE,
        },
        {
            title: '创业时间',
            hideInSearch: true,
            needInCreate: true,
            dataIndex: 'completeTime',
            render: (_, record) => new Date().getTime(),
            rules: [
                {
                    required: true,
                    message: '完成时间',
                },
            ],
        },
        {
            title: '负责人',
            hideInSearch: true,
            needInCreate: true,
            dataIndex: 'dutyPerson',
            render: (_, record) => 'Tom Bob',
            rules: [
                {
                    required: true,
                    message: '负责人',
                },
            ],
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => updateData(record, 2)}>修改</Button>
                    <Divider type="vertical"/>
                    <Button type="link" onClick={() => updateData(record, 1)}>查看</Button>
                </>
            ),
        },

    ];

    //拉取该条的详情
    const updateData = async (record, type) => {
        const {id} = record;
        const detail = await getCompanyDetail(id);
        if (detail.code === 0) {
            setDetail({...detail.data});
            setUpdate(type);
            setModalShow(true);
        }
    };
    //点击确认修改
    const onOK = async (values) => {
        const res = await editCompany({...values});
        if (res.code === 0) {
            message.success('修改成功');
            setReload(!reload);
        } else {
            message.error('修改失败');
        }
        setModalShow(false);
    };
    return <div id='company'>
        <MainTable
            columns={columns}
            createNew={() => setModalShow(true)}
            rowKey='id'
            reload={reload}
            request={getCompanyList}
        >
        </MainTable>
        {
            modalShow ? <UpdateForm
                columns={columns}
                detail={detail}
                isUpdate={update}
                modalVisible={modalShow}
                onOK={(e) => {
                    onOK(e);
                }}
                onCancel={() => setModalShow(false)}
            >
                >
            </UpdateForm> : null
        }
    </div>;
};

export default Company;
