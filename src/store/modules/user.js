const user = {
    state: {
        info: null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.info = userInfo
        }
    }
};

export default user;
