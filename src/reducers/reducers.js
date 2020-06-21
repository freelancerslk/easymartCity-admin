import { LOAD_PRODUCTS, PRODUCTS_LOAD_START, ADD_PRODUCT, CATEGORIES_LOAD_START, LOAD_CATEGORIES, ADD_CATEGORY, SHOW_DASHBOARD_VIEW, SHOW_PRODUCTS_VIEW, SHOW_CATEGORIES_VIEW, SHOW_ORDERS_VIEW, EDIT_PRODUCT, DELETE_PRODUCT, ORDERS_LOAD_START, LOAD_ORDERS, USERS_LOAD_START, LOAD_USER, DELETE_CATEGORY, EDIT_ORDER, EDIT_CATEGORY, LOGIN } from "../actions/actionTypes";

const initialState = {
    products: {
        data: [],
        loading: false
    },
    categories: {
        data: [],
        loading: false
    },
    orders: {
        data: [],
        loading: false
    },
    users: {
        data: [],
        loading: false
    },
    currentUser: {},
    loginStatus: false,
    activeView: ''
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES_LOAD_START:
            return Object.assign({}, state, { categories: { data: [], loading: true } });
        case LOAD_CATEGORIES:
            return Object.assign({}, state, { categories: { data: action.payload, loading: false } });
        case PRODUCTS_LOAD_START:
            return Object.assign({}, state, { products: { data: [], loading: true } });
        case LOAD_PRODUCTS:
            return Object.assign({}, state, { products: { data: action.payload, loading: false } });
        case ORDERS_LOAD_START:
            return Object.assign({}, state, { orders: { data: [], loading: true } });
        case LOAD_ORDERS:
            return Object.assign({}, state, { orders: { data: action.payload, loading: false } });
        case USERS_LOAD_START:
            return Object.assign({}, state, { users: { data: [], loading: true } });
        case LOAD_USER:
            return Object.assign({}, state, { users: { data: action.payload, loading: false } });
        case ADD_PRODUCT:
            return Object.assign({}, state, { products: { data: state.products.data.concat(action.payload), loading: false } });
        case ADD_CATEGORY:
            return Object.assign({}, state, { categories: { data: state.categories.data.concat(action.payload), loading: false } });
        case SHOW_DASHBOARD_VIEW:
            return Object.assign({}, state, { activeView: action.payload });
        case SHOW_PRODUCTS_VIEW:
            return Object.assign({}, state, { activeView: action.payload });
        case SHOW_CATEGORIES_VIEW:
            return Object.assign({}, state, { activeView: action.payload });
        case SHOW_ORDERS_VIEW:
            return Object.assign({}, state, { activeView: action.payload });
        case EDIT_PRODUCT:
            state.products.data.map((product, index) => {
                if (product.id == action.payload.id) {
                    let products = state.products.data;
                    products[index] = action.payload;
                    return Object.assign({}, state, { products: { data: products, loading: false } });
                }
            })
        case DELETE_PRODUCT:
            state.products.data.map((product, index) => {
                if (product.id == action.payload.id) {
                    let products = state.products.data;
                    products.splice(index, 1);
                    return Object.assign({}, state, { products: { data: products, loading: false } });
                }
            })
        case DELETE_CATEGORY:
            state.categories.data.map((category, index) => {
                if (category.id == action.payload.id) {
                    let categories = state.categories.data;
                    categories.splice(index, 1);
                    return Object.assign({}, state, { categories: { data: categories, loading: false } });
                }
            })
        case EDIT_ORDER:
            state.orders.data.map((order, index) => {
                if (order.id == action.payload.id) {
                    let orders = state.orders.data;
                    orders[index] = action.payload;
                    return Object.assign({}, state, { orders: { data: orders, loading: false } });
                }
            })
        case EDIT_CATEGORY:
            state.categories.data.map((category, index) => {
                if (category.id == action.payload.id) {
                    let categories = state.categories.data;
                    categories[index] = action.payload;
                    return Object.assign({}, state, { categories: { data: categories, loading: false } });
                }
            })
        case LOGIN:
            return Object.assign({}, state, { currentUser: action.payload, loginStatus: true });
        default:
            return state;
    }
};