<template>
    <section>
        <!--工具条-->
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <el-form :inline="true" :model="filters" class="demo-form-inline">
                <el-row>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4">
                        <el-form-item label="设备类">
                            <el-select v-model="filters.equipmentCategory" multiple placeholder="请选择">
                                <el-option
                                        v-for="item in equipmentCategories"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="4" :lg="4">
                        <el-form-item label="关键词">
                            <el-input v-model="filters.keyWord" placeholder="关键词" style="width: 180px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="16" :sm="16" :md="16" :lg="16">
                        <el-form-item>
                            <el-button type="primary" v-on:click="getKnowledge" icon="search">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-form>

        <div class="panel">
            <div class="panel-title">
                <span v-text="panelTitle"></span>
                <div class="fr">
                    <el-button @click.stop="on_refresh" size="small">
                        <i class="fa fa-refresh"></i>
                    </el-button>
                    <el-button type="primary" @click="handleAdd" icon="plus" size="small">新增</el-button>
                </div>
            </div>
            <div class="panel-body">
                <!--列表-->
                <el-table :data="knowledge" highlight-current-row v-loading="listLoading"
                          @selection-change="selsChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="60">
                    </el-table-column>
                    <el-table-column prop="knowledgeTitle" label="知识名称">
                    </el-table-column>
                    <el-table-column prop="problem" label="问题现象">
                    </el-table-column>
                    <el-table-column prop="solution" label="解决方式">
                    </el-table-column>
                    <el-table-column prop="equipmentCategory" label="所属设备类">
                    </el-table-column>
                    <el-table-column prop="cTime" label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" class="fl">批量删除
                    </el-button>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page.sync="listQuery.curPage" :page-sizes="[10,20,30, 50]"
                                   :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                                   :total="total" class="fr">
                    </el-pagination>
                </el-col>
            </div>
        </div>

        <!--编辑界面-->
        <el-dialog title="编辑告警知识" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="名称" prop="knowledgeTitle" style="width: 450px;">
                    <el-input v-model="editForm.knowledgeTitle" placeholder="请输入名称" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题现象" prop="problem" style="width: 450px;">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入问题现象"
                            v-model="editForm.problem">
                    </el-input>
                </el-form-item>
                <el-form-item label="解决方式" prop="solution" style="width: 450px;">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入解决方式"
                            v-model="editForm.solution">
                    </el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="keyWord" style="width: 450px;">
                    <el-input v-model="editForm.keyWord" placeholder="请输入关键词" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增告警知识" v-model="addFormVisible" :close-on-click-modal="false" size="small">
            <el-form ref="addForm" :model="addForm" label-width="100px" :rules="addFormRules">
                <el-form-item label="名称" prop="knowledgeTitle" style="width: 450px;">
                    <el-input v-model="addForm.knowledgeTitle" placeholder="请输入名称" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题现象" prop="problem" style="width: 450px;">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入问题现象"
                            v-model="addForm.problem">
                    </el-input>
                </el-form-item>
                <el-form-item label="解决方式" prop="solution" style="width: 450px;">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入解决方式"
                            v-model="addForm.solution">
                    </el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="keyWord" style="width: 450px;">
                    <el-input v-model="addForm.keyWord" placeholder="请输入关键词" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="附件" prop="attachment" style="width: 500px;">
                    <form action="http://www.b.com/io.php" method="POST" enctype="multipart/form-data" target="upload">
                        <input type="file" name="upload_file"/>
                        <input type="text" name="tmpurl" value="http://www.a.com/tmp.html" style="display:none"/>
                        <input type="submit" value="开始上传"/>
                    </form>
                    <iframe name="upload" style="display:none"></iframe>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import * as base from '../../api/urlConfig'
    //import NProgress from 'nprogress'
    import {
        getKnowledgeListPage,
        removeKnowledge,
        batchRemoveKnowledge,
        editKnowledge,
        addKnowledge
    } from '../../api/api';

    export default {
        data() {
            return {
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1'// 按钮的背景颜色
                },
                filters: {
                    equipmentCategory: '',
                    keyWord: '',
                },
                panelTitle: '告警知识列表',
                equipmentCategories: [{
                    value: '1',
                    label: '1天'
                }, {
                    value: '2',
                    label: '2天'
                },],
                knowledge: [],
                total: 0,
                listLoading: false,
                sels: [],//列表选中列

                form: {
                    knowledgeId: '',
                    knowledgeTitle: '',
                    keyWord: '',
                    problem: '',
                    solution: '',
                    equipmentCategory: '',
                    baseTypeId: '',
                    isVerified: '',
                    VerifyTime: '',
                    VerifyUser: '',
                    isInvalid: '',
                    applyCount: ''
                },

                listQuery: {
                    curPage: 1,
                    limit: 20,
                    pageSize: 10,
                    equipmentCategory: undefined,
                    keyWord: undefined,
                    strOrder: undefined
                },

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    knowledgeTitle: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    problem: [
                        {required: true, message: '请输入问题描述', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    knowledgeTitle: '',
                    keyWord: '',
                    problem: '',
                    solution: '',
                    equipmentCategory: '',
                    baseTypeId: '',
                    createUser: '',
                    accessoryKey: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    knowledgeTitle: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    problem: [
                        {required: true, message: '请输入问题描述', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    knowledgeTitle: '',
                    keyWord: '',
                    problem: '',
                    solution: '',
                    equipmentCategory: '',
                    baseTypeId: '',
                    createUser: '',
                    accessoryKey: ''
                }

            }
        },
        methods: {
            //操作分页
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getKnowledge();
            },
            handleCurrentChange(val) {
                this.listQuery.curPage = val;
                this.getKnowledge();
            },
            //刷新
            on_refresh(){
                this.getKnowledge();
            },
            //获取告警知识列表
            getKnowledge() {
                let _this = this;
                _this.knowledge = [];

                let para = {
                    pageNo: _this.listQuery.curPage,
                    pageSize: _this.listQuery.pageSize,
                    strOrder: 'CreateTime DESC',
                    equipmentCategory: _this.filters.equipmentCategory,
                    keyWord: _this.filters.strContent
                };
                _this.listLoading = true;

                jQuery.ajax({
                    async: true,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'jsoncallback',
                    data: para,
                    timeout: 5000,
                    url: base.baseUrl + "/KnowledgeService.svc/getKnowledge",
                    success: function (res) {
                        let index1 = res.indexOf("]");
                        let knowledge = JSON.parse(res.substr(0, index1 + 1));
                        let totalStr = res.substr(index1 + 2, res.length - 1);
                        let index2 = totalStr.indexOf(":");
                        totalStr = totalStr.substr(index2 + 2, totalStr.length - index2 - 3)
                        _this.total = parseInt(totalStr);

                        if (knowledge.length > 0) {
                            for (let know of knowledge) {
                                let item = {
                                    knowledgeId: '',
                                    knowledgeTitle: '',
                                    keyWord: '',
                                    problem: '',
                                    solution: '',
                                    equipmentCategory: '',
                                    baseTypeId: '',
                                    isVerified: '',
                                    VerifyTime: '',
                                    VerifyUser: '',
                                    isInvalid: '',
                                    applyCount: ''
                                };
                                item.knowledgeId = know.knowledgeId;
                                item.knowledgeTitle = know.knowledgeTitle;
                                item.keyWord = know.keyWord;
                                item.problem = know.problem;
                                item.solution = know.solution;
                                item.equipmentCategory = know.equipmentCategory;
                                item.knowledgeTitle = know.knowledgeTitle;
                                item.isVerified = know.isVerified;
                                item.VerifyTime = know.VerifyTime;
                                item.VerifyUser = know.VerifyUser;
                                item.isInvalid = know.isInvalid;
                                item.applyCount = know.applyCount;

                                _this.knowledge.push(item);
                            }
                        }
                    }
                });
                setTimeout(() => {
                    this.listLoading = false;
                }, 1000);
            },
            deleteSuccess: function (res, status) {
                let data = JSON.parse(res);

                if (data.result === true) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '删除失败',
                        type: 'success'
                    });
                }
                this.listLoading = false;
                this.getKnowledge();
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {knowledgeId: row.knowledgeId};
                    $.ajax({
                        async: true,
                        type: 'GET',
                        jsonp: 'jsoncallback',
                        data: para,
                        url: base.baseUrl + "/KnowledgeService.svc/DelKnowledgeItem",
                        success: this.deleteSuccess,
                        dataType: 'jsonp'
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    knowledgeTitle: '',
                    keyWord: '',
                    problem: '',
                    solution: '',
                    equipmentCategory: '',
                    baseTypeId: '',
                    createUser: '',
                    accessoryKey: ''
                };
            },
            editSuccess: function (res, status) {
                let data = JSON.parse(res);

                if (data.result === true) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '修改失败',
                        type: 'success'
                    });
                }
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.editLoading = false;
                this.getKnowledge();
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            $.ajax({
                                async: true,
                                type: 'GET',
                                jsonp: 'jsoncallback',
                                data: para,
                                url: base.baseUrl + "/KnowledgeService.svc/UpdKnowledgeItem",
                                success: this.editSuccess,
                                dataType: 'jsonp'
                            });
                        });
                    }
                });
            },
            addSuccess: function (res, status) {
                let data = JSON.parse(res);

                if (data.result === true) {
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '新增失败',
                        type: 'success'
                    });
                }
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.addLoading = false;
                this.getKnowledge();
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            $.ajax({
                                async: true,
                                type: 'GET',
                                jsonp: 'jsoncallback',
                                data: para,
                                url: base.baseUrl + "/KnowledgeService.svc/AddKnowledgeItem",
                                success: this.addSuccess,
                                dataType: 'jsonp'
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.strKnowledgeId).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {strKnowledgeId: ids};
                    $.ajax({
                        async: true,
                        type: 'GET',
                        jsonp: 'jsoncallback',
                        data: para,
                        url: base.baseUrl + "/KnowledgeService.svc/DelKnowledgeItem",
                        success: this.deleteSuccess,
                        dataType: 'jsonp'
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getKnowledge();
        }
    }

</script>

<style scoped>

    .toolbar {
        background-color: #f8f8f8 !important;
    }

</style>