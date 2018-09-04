<style lang="less">
    @import './Login.less';
</style>

<template>
    <div id="main">
        <div class="login">
            <div class="login-form">
                <div class="login-logo">
                    <span>欢迎</span>
                </div>
                <Form inline ref="loginFormRef" :model="formData" :rules="rule">
                    <FormItem prop="user" class="form-item">
                        <Input type="text" icon="person" v-model="formData.user" @on-enter="loginSubmit"
                               placeholder="登录账号"/>
                    </FormItem>
                    <FormItem prop="password" class="form-item">
                        <Input type="password" icon="ios-locked" v-model="formData.password" @on-enter="loginSubmit"
                               placeholder="账户密码"/>
                    </FormItem>
                    <FormItem class="form-item" style="margin-bottom:5px;">
                    </FormItem>
                    <FormItem class="form-item">
                        <Button class="loginBtn" type="primary" :loading="loading" @click="loginSubmit">
                            登 录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    import Cookies from "js-cookie";
    import {setStore} from '../utils/storage'

    export default {
        data() {
            return {
                loading: false,
                formData: {
                    user: '',
                    password: ''
                },
                rule: {
                    user: [
                        {required: true, message: '请填写登录账户', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 2,
                            message: '登录账户最少为2个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '请填写账户密码', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            max: 30,
                            message: '账户密码必须为6~30字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            loginSubmit() {
                this.loading = true
                let _this = this
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) {
                        this.loading = false
                        this.$Message.error({
                            content: '请正确填写登录账户和密码！',
                            duration: 2,
                            closable: true
                        })

                        return
                    }

                    let res = {
                        status: 200,
                        data: {
                            code: 200,
                            user: {
                                id: 1,
                                username: 'admin',
                                realName: '管理员',
                                age: 18
                            }
                        }
                    }

                    if (res.status !== 200) {
                        _this.$Message.error({
                            content: '网络通讯异常',
                            duration: 2,
                            closable: true
                        })
                        _this.loading = false
                        return false
                    }

                    if (res.data && res.data.code !== 200) {
                        let msg = res.data.msg || '失败'
                        this.$Message.error({content: msg, duration: 2, closable: true})
                        this.loading = false
                        return false
                    }

                    this.$store.commit('setUserInfo', res.user)
                    setStore("accessToken", res.token);
                    Cookies.set("userInfo", res.data.user);

                    this.$router.push({
                        name: 'home'
                    });
                })
            }
        }
    }
</script>
