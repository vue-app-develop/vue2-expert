/**
 * Created by dongxingbin on 17/7/28.
 */

// localStorage.setItem('baseUrl','http://localhost:8082');
// localStorage.clear();

const base = 'process.env.API_ROOT'

export const baseUrl = localStorage.getItem('baseUrl') ? localStorage.getItem('baseUrl') : process.env.API_ROOT;

//knowledge
export const knowledgeList = base + '/KnowledgeService.svc/GetKnowledgeItems';

// export const maintainListpage = base + '/maintain/listpage';
export const knowledgeListpage = base + '/KnowledgeService.svc/GetKnowledgeItems';

export const knowledgeRemove = base + '/KnowledgeService.svc/DelKnowledgeItem';

export const knowledgeBatchremove = base + '/KnowledgeService.svc/DelKnowledgeItem';

export const knowledgeEdit = base + '/KnowledgeService.svc/UpdKnowledgeItem';

export const knowledgeAdd = base + '/KnowledgeService.svc/AddKnowledgeItem';



