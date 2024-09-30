
const initialState = {
    userInfo: null,
    authenticated: false,
    apiToken: null,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case "account_authenticated":
            return {
                ...state,
                userInfo: action.userInfo,
                authenticated: true,
            };
        case "account_logout":
            return {
                ...state,
                userInfo: null,
                authenticated: false,
            };

        default: return state;
    }
}

export default accountReducer;