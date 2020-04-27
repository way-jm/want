import React from "react";
import './index.less'

const Index: React.FC = () => {
    return <div id='index'>
        <div className='background'>
            <div id='stars'/>
            <div id='stars2'/>
            <div id='stars3'/>
            <div id='title'>
                <span>Want中后台脚手架</span><br/>
                <span>更灵活、更轻便</span>
            </div>
        </div>
    </div>;
};

export default Index;
