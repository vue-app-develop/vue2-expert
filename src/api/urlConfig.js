/**
 * Created by dongxingbin on 17/7/28.
 */

// localStorage.setItem('baseUrl','http://localhost:8082');
// localStorage.clear();

const base = 'process.env.API_ROOT'

export const baseUrl = localStorage.getItem('baseUrl') ? localStorage.getItem('baseUrl') : process.env.API_ROOT;

//knowledge
export const knowledgeList = base + '/ExpertKnowledgeService.svc/GetExpertKnowledgeItems';

// export const maintainListpage = base + '/maintain/listpage';
export const knowledgeListpage = base + '/ExpertKnowledgeService.svc/GetExpertKnowledgeItems';

export const knowledgeRemove = base + '/ExpertKnowledgeService.svc/DelExpertKnowledgeItem';

export const knowledgeBatchRemove = base + '/ExpertKnowledgeService.svc/DelExpertKnowledgeItem';

export const knowledgeEdit = base + '/ExpertKnowledgeService.svc/UpdExpertKnowledgeItem';

export const knowledgeAdd = base + '/ExpertKnowledgeService.svc/AddExpertKnowledgeItem';



