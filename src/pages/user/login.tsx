import React, {useState} from 'react';
import {Form, Input, Button} from 'antd';
import {connect} from "react-redux";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './login.less';
import {bindActionCreators} from "redux";
import * as actions from "../user/store";

const Login: React.FC = (props: any) => {
    const [loading,setLoading] = useState(false);
    const {actions: {login},history} = props;
    const onFinish = (values ) => {
       setLoading(true);
       login({...values},history).then(res=>{
          setLoading(false);
          if(res) props.history.push('/')
       });
    };
    return <div className='loginContainer'>
        <div className='background'>
            <div id='stars'/>
            <div id='stars2'/>
            <div id='stars3'/>
        </div>
        <div className='content'>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                size={"large"}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: '请输入用户名!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="want"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: '请输入与密码!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="123456"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} style={{backgroundColor:'#1b2735'}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>;
};

export default connect((state: { userStore, }) => ({
        userStore: state.userStore
    }),
    dispatch => ({
        actions: bindActionCreators({...actions}, dispatch)
    }))(Login);
