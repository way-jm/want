import React,{useState} from 'react';
import {Modal, Form, Row, Button, Divider, Upload,message,Empty} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {imgBaseUrl,upLoadPath} from "../common/js/global.config";
import {getToken} from "../common/js/cache";
import getFields from "../common/js/getFields";
import {getBase64} from "../common/js/common";


interface updateFormProps {
    columns,
    isUpdate: number,
    detail?,
    modalVisible: boolean;
    onCancel: () => void;
    rules?: [],
    onOK: (values: any) => void;
}

const UpdateForm: React.FC<updateFormProps> = (props) => {
    let {modalVisible, onCancel, columns, onOK, detail, isUpdate} = props;
    const [form] = Form.useForm();
    const createInitValues = () => {
        const initValue = {};
        if (detail) return detail;
        return initValue;
    };
    const onFinish = values => {
        onOK({...values,wjglList:imgFile});
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    columns = columns.filter(column => {
        return column.valueType !== 'option'&&!column.hideInTable;
    });

    // -------------这里是上传组件的演示，请在global.config.ts中修改自己的上传地址-------------
    // const [imgFile,setImgFile] = useState(detail.wjglList);
    const [imgFile,setImgFile] = useState([
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587980241923&di=12f5e8d51905fdfcdf218a03aac93469&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D3616242789%2C1098670747%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D900%26h%3D1350',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587980257400&di=6f609f19d5f00d6bae357b22937afe67&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290'
    ]);
    const [previewPath,setPreviewPath] = useState(null);
    const handleChange = ({ file, fileList })=>{
        console.log(fileList);
        if(file.status === 'done' || file.status === 'removed'){
            // this.props.changeState('changed',true);
            //添加图片
            let length = fileList.length;
            let temp =[];
            if(length>=1){
                for (let i=0;i<length;i++){
                    if(fileList[i].response){
                        temp.push(fileList[i].response.data.path)
                    }else{
                        temp.push(fileList[i].uid)
                    }
                }
            }
            setImgFile(temp)
        }else if(file.status==='error'){
            message.error('请换成小可爱你自己的上传路径哦！');
        }
    };
    const transImg = (imgArr = []) => {
        let temp = [];
        imgArr.forEach((item) => {
            temp.push({url: imgBaseUrl + item, uid: item});
        });
        return temp;
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
         setPreviewPath(file.url || file.preview)
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">上传</div>
        </div>
    );

    return (
        <Modal
            title={isUpdate === 1 ? '查看' : '编辑'}
            visible={modalVisible}
            width={700}
            destroyOnClose
            onCancel={() => onCancel()}
            footer={[
                <Button key="back" onClick={() => onCancel()}>
                    取消
                </Button>,
                isUpdate === 2
                    ? <Button key="submit" type="primary" onClick={() => form.submit()}>
                        确定
                    </Button> : null
            ]}
        >
            <Form
                name="create"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={createInitValues() as any}
            >
                <Row gutter={24}>{getFields(columns)}</Row>
                <Divider/>
                <div style={{height: '30px'}}>上传图片(大小不超过2M)</div>
                <div className='clearfix'>
                    <Upload
                        className='upload-list-inline'
                        action={upLoadPath}
                        headers={{Authorization:  'Bearer ' + getToken()}}
                        withCredentials={true}
                        listType="picture-card"
                        accept="image/*"
                        onPreview={handlePreview}
                        defaultFileList={transImg(imgFile)}
                        disabled={isUpdate === 1}
                        onChange={handleChange}
                    >
                        {imgFile && (imgFile.length >= 8 || isUpdate===1? null : uploadButton)}
                    </Upload>
                    {imgFile&&imgFile.length === 0 && isUpdate===1? <Empty/> : null}
                </div>
            </Form>
            <Modal visible={previewPath} footer={null} onCancel={()=>setPreviewPath(null)}>
                <img alt="example" style={{ width: '100%' }} src={previewPath} />
            </Modal>
        </Modal>
    );
};

export default UpdateForm;
