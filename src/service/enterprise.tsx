import request from '../common/js/httpRequest';

// 企业分页
export async function getCompanyList(params) {
    return request('/api/qys/page', {
        method: 'GET',
        params: params
    });
}

// 企业详情
export async function getCompanyDetail(id) {
    return request(`/api/qys/${id}`, {
        method: 'GET'
    });
}

// 企业编辑
export async function editCompany(detail) {
    return request(`/api/qys/${detail.id}`, {
        method: 'put',
        data:detail
    });
}
