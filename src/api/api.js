import axios from 'axios';
import qs from 'qs'
import * as url from './urlConfig'

const instance = axios.create({
    baseURL: 'http://10.169.42.142:8090',
    timeout: 20000,
    validateStatus:function(status){
        return status < 500;
    },
    headers: {
        // 跨域请求 这个配置不能少
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        'Accept': 'application/json'
    },
    withCredentials:true   //加了这段就可以跨域了
});

//knowledge
export const getKnowledgeList = params => {
    return axios.get(url.knowledgeList, {params: params});
};

export const getKnowledgeListPage = params => {
    return instance.get(url.maintainListpage, qs.stringify({params: params}));
};

export const removeKnowledge = params => {
    return axios.get(url.knowledgeRemove, {params: params});
};

export const batchRemoveKnowledge = params => {
    return axios.get(url.knowledgeBatchremove, {params: params});
};

export const editKnowledge = params => {
    return axios.get(url.knowledgeEdit, {params: params});
};

export const addKnowledge = params => {
    return axios.get(url.knowledgeAdd, {params: params});
};
