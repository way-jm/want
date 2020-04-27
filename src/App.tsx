import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import  Router from './router'
function App() {
  return <ConfigProvider locale={zhCN}><Router/></ConfigProvider>;
}

export default App;
