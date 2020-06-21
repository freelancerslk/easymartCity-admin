import { LOAD_PRODUCTS, ADD_PRODUCT, LOAD_CATEGORIES, ADD_CATEGORY, SHOW_DASHBOARD_VIEW, SHOW_PRODUCTS_VIEW, SHOW_CATEGORIES_VIEW, SHOW_ORDERS_VIEW, EDIT_PRODUCT, DELETE_PRODUCT, LOAD_ORDERS, LOAD_USER, DELETE_CATEGORY, EDIT_ORDER, EDIT_CATEGORY, LOGIN } from "./actionTypes"
import { db } from '../config/firebase';

export function loadCategories() {
    return dispatch => {
        return db
        .collection('categories')
        .onSnapshot(snapshot => {
            const categories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatch({ type: LOAD_CATEGORIES, payload: categories })
        });
    };
}

export function loadProducts() {
    return dispatch => {
        return db
        .collection('products')
        .onSnapshot(snapshot => {
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatch({ type: LOAD_PRODUCTS, payload: products })
        });
    };
}

export function addProducts(product) {
    return dispatch => {
        return db
        .collection('products')
        .add(product)
        .then(dispatch({ type: ADD_PRODUCT, payload: product }));
    };
}

export function addCategory(category) {
    return dispatch => {
        return db
        .collection('categories')
        .add(category)
        .then(dispatch({ type: ADD_CATEGORY, payload: category }));
    };
}

export function showDashboardView() {
    return {
        type: SHOW_DASHBOARD_VIEW,
        payload: 'dashboard'
    }
}

export function showProductsView() {
    return {
        type: SHOW_PRODUCTS_VIEW,
        payload: 'products'
    }
}

export function showCategoriesView() {
    return {
        type: SHOW_CATEGORIES_VIEW,
        payload: 'categories'
    }
}

export function showOrdersView() {
    return {
        type: SHOW_ORDERS_VIEW,
        payload: 'orders'
    }
}

export function editProduct(product) {
    return dispatch => {
        return db
        .collection('products')
        .doc(product.id)
        .update(product)
        .then(dispatch({ type: EDIT_PRODUCT, payload: product }));
    };
}

export function deleteProduct(product) {
    return dispatch => {
        return db
        .collection('products')
        .doc(product.id)
        .delete()
        .then(dispatch({ type: DELETE_PRODUCT, payload: product }));
    };
}

export function loadOrders() {
    return dispatch => {
        return db
        .collection('orders')
        .onSnapshot(snapshot => {
            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatch({ type: LOAD_ORDERS, payload: orders })
        });
    };
}

export function loadUsers() {
    return dispatch => {
        return db
        .collection('users')
        .onSnapshot(snapshot => {
            const users = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            dispatch({ type: LOAD_USER, payload: users })
        });
    };
}

export function deleteCategory(category) {
    return dispatch => {
        return db
        .collection('categories')
        .doc(category.id)
        .delete()
        .then(dispatch({ type: DELETE_CATEGORY, payload: category }));
    };
}

export function editOrder(order) {
    return dispatch => {
        return db
        .collection('orders')
        .doc(order.id)
        .update(order)
        .then(dispatch({ type: EDIT_ORDER, payload: order }));
    };
}

export function editCategory(category) {
    return dispatch => {
        return db
        .collection('categories')
        .doc(category.id)
        .update(category)
        .then(dispatch({ type: EDIT_CATEGORY, payload: category }));
    };
}

export function verifyCredentials(username) {
    return dispatch => {
        return db
        .collection('admins')
        .get()
        .then(function(doc) {
            let valid_user = false;
            let user = {};
            doc.docs.map(doc => {
                if (doc.data().username == username) {
                    valid_user = true;
                    user = doc.data();
                    user.id = doc.id;
                }
            });
            if(valid_user) return user;
            return false;
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    };
}

export function login(admin) {
    return {
        type: LOGIN,
        payload: admin
    }
}

