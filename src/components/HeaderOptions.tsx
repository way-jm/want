import React from 'react';
import {Menu, Dropdown, Avatar, Badge, Tooltip, notification} from 'antd';
import {SwapOutlined, BellOutlined} from '@ant-design/icons';
import {removeToken} from '../common/js/cache';
import './headerOptions.less';

const MItem = Menu.Item;

const HeaderOptions: React.FC = () => {
    // 退出登录
    const exit: () => void = () => {
        removeToken();
        notification.info({
            message: `已退出登录`,
        });
        setTimeout(() => {
            window.location.href = '/user/login';
        }, 500);
    };
    const menu = (
        <Menu>
            <MItem onClick={exit}><span>退出登录</span></MItem>
        </Menu>
    );
    return <div className="right">
        <Tooltip placement="bottom" title="进入展示系统">
              <span className="account action">
              <Badge count={0} style={{boxShadow: 'none'}}>
                <SwapOutlined style={{fontSize: '20px', verticalAlign: 'middle'}}/>
             </Badge>
         </span>
        </Tooltip>
        <span className="account action" onClick={() => {

        }}>
            <Badge style={{boxShadow: 'none'}}>
               <BellOutlined style={{fontSize: '20px', verticalAlign: 'middle'}}/>
            </Badge>
      </span>
        <Dropdown overlay={menu} trigger={['click']}>
            <span className="account action">
              <Avatar
                  size="small"
                  className="avatar"
                  src={require('../assets/avatar.png')}
                  alt="avatar"
              />
                  <span className='name'>want</span>
            </span>
        </Dropdown>
    </div>;
};

export default HeaderOptions;
