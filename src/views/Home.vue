<template>
    <el-row class="container">
        <el-col :span="24" class="main">
            <section class="content-container">
                <el-col :span="24" class="header">
                </el-col>
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    import Screenfull from '../components/Screenfull';
    import * as base from '../api/urlConfig'
    import {
        getMaintainListPage,
        removeMaintain,
        batchRemoveMaintain,
        getRemindInfoListPage,
        confirmRemind,
        removeRemind
    } from '../api/api';

    export default {
        components: {
            Screenfull
        },
        data() {
            return {
                sysName: '专家系统',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: ''
            }
        },
        methods: {
        },
        mounted() {
            var loginUser =
                {
//                    avatar: 'https://avatars1.githubusercontent.com/u/16631463?v=4&s=460',
                name: 'Alex'
            };
            localStorage.setItem('user', JSON.stringify(loginUser));
//            localStorage.clear();
            var user = localStorage.getItem('loginUser') ? localStorage.getItem('loginUser') : localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }
        },
        beforeMount() {
        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        height: 100%;
        .header {
            height: 2px;
            line-height: 2px;
            background: #eeeeee;
            border-left: 1px solid white;
            border-bottom: 6px solid #c0c1e1;
        }
        .main {
            display: flex;
            position: absolute;
            top: 0px;
            bottom: 0px;
            overflow: hidden;
            .content-container {
                // background: #f1f2f7;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 230px;
                overflow-y: scroll;
                //padding: 20px;
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }

    @media screen and (max-width: 1200px) {
        //
    }
</style>