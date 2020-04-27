import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actions from './store';

interface DemoProp {
    actions: {getDemoData,test},
    dataStore: { demo }
}

const Demo: React.FC<DemoProp> = (props) => {
    const {actions: {getDemoData, test}} = props;
    const changeDemo = (paras: {}) => {
        getDemoData(paras);
    };
    const changeDemo2 = () => {
        test();
    };
    return <div>{props.dataStore.demo}
        <p>Want is so beauty</p>
        <p>坚持做感动人心，价格厚道的产品</p>
        <button onClick={() => changeDemo({demo: 5})}>改变redux的值</button>
        <button onClick={() => changeDemo2()}>异步修改redux的值</button>
    </div>;
};


export default connect((state: { demoStore: any, }) => ({
        dataStore: state.demoStore
    }),
    dispatch => ({
        actions: bindActionCreators({...actions}, dispatch)
    }))(Demo);
