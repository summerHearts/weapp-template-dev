'use strict';

import {
    Promise
} from '../libs/es6-promise'

const REQ_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

let http = {}

http.get = (url, data = {}, header = {
    'content-type': 'application/json'
}) => {
    return http_request(url, REQ_METHOD.GET, data, header)
}

http.post = (url, data = {}, header = {
    'content-type': 'application/json'
}) => {
    return http_request(url, REQ_METHOD.POST, data, header)
}

http.put = (url, data = {}, header = {
    'content-type': 'application/json'
}) => {
    return http_request(url, REQ_METHOD.PUT, data, header)
}

http.delete = (url, data = {}, header = {
    'content-type': 'application/json'
}) => {
    return http_request(url, REQ_METHOD.DELETE, data, header)
}

function http_request(
    url,
    method = REQ_METHOD.GET,
    data = {},
    header = {
        'content-type': 'application/json'
    }) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: JSON.stringify(data),
            header: header,
            method: method,
            success: res => reject(res),
            fail: res => reject(res),
            complete: res => {},
        })
    })
}


export default {
    http: http
}