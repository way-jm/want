import React, {useState} from "react";
import {Layout, Menu} from 'antd';
import {withRouter,Link} from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    createFromIconfontCN
} from '@ant-design/icons';
import styles from './BasicLayout.module.less';
import {MenuInterface} from "../menu.config";
import menuConfig from "../menu.config";
import ContentHeader from "../components/ContentHeader";
import HeaderOptions from "../components/HeaderOptions";

const Item = Menu.Item;
const {SubMenu} = Menu;


const {Header, Sider, Content} = Layout;

const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1761619_5y6o3a2aeou.js', // 在 iconfont.cn 上生成
});
const BasicLayout: React.FC = (props: any) => {
    const menuRender = (menu: MenuInterface, index: number | string) => {
        if (menu.children) {
            return <SubMenu key={index} title={
                <span>
                    <MyIcon type={menu.icon}/>
                      <span>{menu.name}</span>
                    </span>
            }>
                {
                    menu.children.map((item, z) => menuRender(item, `${index}-${z}`))
                }
            </SubMenu>;
        }
        return (
            <Item key={index}>
                <Link to={menu.path}>
                    {menu.icon?<MyIcon type={menu.icon}/>:null}
                    <span>{menu.name}</span>
                </Link>
            </Item>
        );
    };
    const [collapsed, setCollapsed] = useState(false);
    const {pathname} = props.location;
    return (
        <div className={styles.basicContainer}>
            <Layout className={styles.sideMenu}>
                <Sider trigger={null} collapsible collapsed={collapsed} width={256}  style={{
                    overflow: 'auto',
                    height: '100vh',
                }}>
                    <div className={styles.logo}>Want</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[]}>
                        {
                            menuConfig.map((menu, index) => {
                                return menuRender(menu, index);
                            })
                        }
                    </Menu>
                </Sider>
                <Layout className={styles.siteLayout}>
                    <Header className={styles.siteHeader} style={{padding: 0}}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: () => {
                                setCollapsed(!collapsed);
                            },
                        })}
                        <HeaderOptions/>
                    </Header>
                    <Content
                        className={styles.siteLayoutBackground}
                    >
                        {pathname === '/' ? null : <ContentHeader/>}
                        <div className={pathname === '/'?styles.indexContent:styles.menuContent}>
                            {props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>);
};

export default withRouter(BasicLayout);
