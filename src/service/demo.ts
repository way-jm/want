import request from '../common/js/httpRequest'

export async function getUserInfo() {
    return  request('/api/qys/1', {
        method: 'GET',
    });
}
