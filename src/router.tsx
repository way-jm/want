import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Spin} from 'antd';
import BasicLayout from "./layout/BasicLayout";
import menuConfig from "./menu.config";
import {MenuInterface} from "./menu.config";
import Login from "./pages/user/login";

const RouterComponents: React.FC = () => {
    const componentRender: any = (menu: MenuInterface) => {
        if (menu.children) {
            return menu.children.map(item => componentRender(item));
        }
        return (
            <Route
                exact
                path={menu.path}
                key={menu.component}
                component={lazy(() => import(`./pages/${menu.component}`))}
            />
        );
    };
    return (
        <Router>
            <Suspense
                fallback={<div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '420px',
                    height: '100%'
                }}>
                    <Spin size={"large"}/>
                </div>}>
                <Switch>
                    <Route path="/user/login" component={Login}/>
                    <Route path="/" render={() =>
                        <BasicLayout>
                            <Switch>
                                {
                                    menuConfig.map((menu) => {
                                        return componentRender(menu);
                                    })
                                }
                            </Switch>
                        </BasicLayout>
                    }/>

                </Switch>
            </Suspense>
        </Router>
    );
};

export default RouterComponents;
