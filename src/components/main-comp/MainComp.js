import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import './MainComp.css';
import { Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Products from '../products/Products';
import Dashboard from '../dashboard/Dashboard';
import Categories from '../categories/Categories';
import Orders from '../orders/Orders';
import { loadProducts, loadCategories, loadOrders, loadUsers } from '../../actions/actions';

class MainComp extends Component {
    componentWillMount() {
        this.props.loadProducts();
        this.props.loadCategories();
        this.props.loadOrders();
        this.props.loadUsers();
    }

    render() {
        if (!this.props.loginStatus) {
            return <Redirect to='/login' />;
        }

        switch (this.props.activeView) {
            case 'dashboard':
                return (
                    <Container fluid><Dashboard /></Container>
                );
            case 'products':
                return (
                    <Container><Products /></Container>
                );
            case 'categories':
                return (
                    <Container><Categories /></Container>
                );
            case 'orders':
                return (
                    <Container><Orders /></Container>
                );
            default:
                return (
                    <Container fluid><Dashboard /></Container>
                );
        }
    }
}

const mapStateToProps = state => {
    return {
        activeView: state.activeView,
        loginStatus: state.loginStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCategories: () =>
            new Promise((resolve, reject) => {
                dispatch(loadCategories());
                resolve('done');
            }),
        loadProducts: () =>
            new Promise((resolve, reject) => {
                dispatch(loadProducts());
                resolve();
            }),
        loadOrders: () =>
            new Promise((resolve, reject) => {
                dispatch(loadOrders());
                resolve('done');
            }),
        loadUsers: () =>
            new Promise((resolve, reject) => {
                dispatch(loadUsers());
                resolve('done');
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComp);