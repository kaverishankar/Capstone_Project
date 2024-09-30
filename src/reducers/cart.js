
const initialState = {
    products: [],
}

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "cart_add":
            return {
                ...state,
                products: [...state.products, action.product],
            }
        case "cart_remove":
            return {
                ...state,
                products: state.products.toSpliced(action.index, 1),
            }
        case "cart_clear":
            return {
                products: [],
            };
        default:
            return state;
    }
}

export default cartReducer;