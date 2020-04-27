"use strict";
exports.__esModule = true;
// @ts-ignore
var express = require("express");
var app = express();
app.get('/hello', function (req, res) {
    res.send('hello worlds2');
});
app.post('/auth/oauth/token', function (req, res) {
    var _a = req.query, password = _a.password, username = _a.username;
    if (password === '123456' && username === 'want') {
        res.send({
            code: 0,
            message: '请求成功',
            data: {
                access_token: 'want-' + new Date().getTime()
            }
        });
        return;
    }
    else {
        res.send({
            code: 1,
            message: '用户名或密码错误'
        });
    }
});
app.get('/api/users/info', function (req, res) {
    res.send({
        code: 0,
        message: '请求成功',
        data: {
            userInfo: {
                uid: '001',
                username: 'want',
                realName: 'want'
            }
        }
    });
});
app.get('/api/datadict', function (req, res) {
    res.send({
        code: 0,
        message: '请求成功',
        data: {
            "dict:children": {
                CHANGE_TYPE: [
                    { label: "好大", value: 1 },
                    { label: "很大", value: 2 },
                    { label: "超级大", value: 3 },
                    { label: "大大的", value: 4 },
                ],
                IS_DIRTY: [
                    { label: "是", value: 1 },
                    { label: "否", value: 2 },
                ]
            }
        }
    });
});
var list = [
    { id: 1, name: '百度', change_type: 1, is_dirty: 1, change: '好大', dirty: '是' },
    { id: 2, name: '阿里', change_type: 2, is_dirty: 2, change: '很大', dirty: '否' },
    { id: 3, name: 'google', change_type: 3, is_dirty: 1, change: '超级大', dirty: '是' },
    { id: 4, name: '小米', change_type: 4, is_dirty: 1, change: '大大的', dirty: '是' },
    { id: 5, name: '腾讯', change_type: 1, is_dirty: 1, change: '好大', dirty: '是' },
    { id: 6, name: 'Facebook', change_type: 1, is_dirty: 2, change: '好大', dirty: '否' },
    { id: 7, name: 'amazon', change_type: 3, is_dirty: 1, change: '超级大', dirty: '是' },
    { id: 8, name: 'softBank', change_type: 3, is_dirty: 1, change: '超级大', dirty: '是' },
    { id: 9, name: 'NTT', change_type: 2, is_dirty: 2, change: '很大', dirty: '否' },
    { id: 10, name: 'microsoft', change_type: 1, is_dirty: 2, change: '好大', dirty: '否' },
    { id: 11, name: 'kingSoft', change_type: 4, is_dirty: 1, change: '大大的', dirty: '是' },
    { id: 12, name: 'oracle', change_type: 2, is_dirty: 2, change: '很大', dirty: '否' },
    { id: 13, name: 'deepIn', change_type: 4, is_dirty: 1, change: '大大的', dirty: '是' },
];
app.get('/api/qys/page', function (req, res) {
    var _a = req.query, _b = _a.pageNum, pageNum = _b === void 0 ? 1 : _b, _c = _a.pageSize, pageSize = _c === void 0 ? 10 : _c, _d = _a.name, name = _d === void 0 ? '' : _d, _e = _a.change_type, change_type = _e === void 0 ? -1 : _e;
    var filterRes = list.filter(function (item) {
        return (item.change_type.toString() === change_type.toString() || change_type === -1) &&
            (item.name.toString() === name.toString() || !name);
    });
    var total = 0;
    if (filterRes.length > 0) {
        total = filterRes.length;
        // @ts-ignore
        var start = (pageNum - 1) * pageSize;
        // @ts-ignore
        var end = start + pageSize;
        filterRes = filterRes.slice(start, end);
    }
    res.send({
        code: 0,
        message: '请求成功',
        data: { total: total, rows: filterRes }
    });
});
app.get('/api/qys/:id', function (req, res) {
    var id = req.params.id;
    var r = list.filter(function (item) {
        return item.id.toString() === id;
    })[0];
    res.send({
        code: 0,
        message: '请求成功',
        data: r
    });
});
app.put('/api/qys/:id', function (req, res) {
    res.send({
        code: 0,
        message: '请求成功',
        data: []
    });
});
app.listen(9000, function () {
    console.log('server is running');
});
