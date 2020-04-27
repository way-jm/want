import React from 'react';
import {Breadcrumb} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import './contentHeader.less';
import menuConfig from "../menu.config";

const BItem = Breadcrumb.Item;

const ContentHeader: React.FC = (props: any) => {
    // 只支持二级路由
    const getRouteInfo: () => { name: string }[] = () => {
        const {location: {pathname}} = props;
        if (!pathname || pathname === '/') return [{name: '首页'}];
        const pathArr = pathname.substr(1,).split('/');
        if (pathArr.length === 1) {
            const route = menuConfig.filter((item) => {
                return item.path === pathname;
            });
            return route;
        } else if (pathArr.length === 2) {
            let route = [];
            menuConfig.forEach(item => {
                if (item.path.substr(1,) === pathArr[0] && item.children) {
                    route = [{name: item.name}];
                    const target = item.children.filter(jtem => {
                        return jtem.path === pathname;
                    });
                    route = route.concat(target);

                }
            });
            return route;
        }
        return [{name: '首页'}];
    };

    const res = getRouteInfo();
    return <div className="contentHeader">
        <Breadcrumb>
            <BItem>
                <Link to="/">首页</Link>
            </BItem>
            {res.map(item => {
                return <BItem key={item.name}>{item.name}</BItem>;
            })}

        </Breadcrumb>
        <p>{res[res.length - 1].name}</p>
    </div>;
};


export default withRouter(ContentHeader);
