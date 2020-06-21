import React, { Component } from 'react';
import { connect } from "react-redux";
import './Dashboard.css';
import { Container, Grid, Statistic, Divider, Loader, Segment, Dimmer } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadProducts, loadCategories, loadOrders, loadUsers } from '../../actions/actions';

class Dashboard extends Component {

    componentWillMount() {
        // this.props.loadProducts();
        // this.props.loadCategories();
        // this.props.loadOrders();
        // this.props.loadUsers();
    }

    getActiveOrders() {
        let activeOrders = [];
        this.props.orders.map(order => {
            if(order.status == 'active') activeOrders.push(order); 
        });
        return activeOrders;
    }

    getPendingOrders() {
        let pendingOrders = [];
        this.props.orders.map(order => {
            if(order.status == 'pending') pendingOrders.push(order); 
        });
        return pendingOrders;
    }

    render() {
        return (
            <div>
                <Container fluid className="Dashboard">
                    <Grid columns={3} divided padded style={{ height: '100vh' }} inverted stackable>
                        <Grid.Row color='black'></Grid.Row>
                        <Grid.Row color='black'>
                            <Grid.Column color='black'>
                                <Statistic size='huge' color='red' inverted>
                                    <Statistic.Value>{this.getPendingOrders().length}</Statistic.Value>
                                    <Statistic.Label>Pending Orders</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column color='black'>
                                <Statistic size='huge' color='yellow' inverted>
                                    <Statistic.Value>{this.getActiveOrders().length}</Statistic.Value>
                                    <Statistic.Label>Active Orders</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column color='black'>
                                <Statistic size='huge' color='green' inverted>
                                    <Statistic.Value>{this.props.orders.length}</Statistic.Value>
                                    <Statistic.Label>Total Orders</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row color='black'></Grid.Row>
                        <Grid.Row color='black'>
                            <Grid.Column color='black'>
                                <Statistic size='huge' color='blue' inverted>
                                    <Statistic.Value>{this.props.products.length}</Statistic.Value>
                                    <Statistic.Label>Products</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column color='black'>
                                <Statistic size='huge' color='teal' inverted>
                                    <Statistic.Value>{this.props.categories.length}</Statistic.Value>
                                    <Statistic.Label>Categories</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column color='black'>
                                <Statistic size='huge' color='teal' inverted>
                                    <Statistic.Value>{this.props.users.length}</Statistic.Value>
                                    <Statistic.Label>Users</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row color='black'></Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.categories.loading,
        products: state.products.data,
        categories: state.categories.data,
        orders: state.orders.data,
        users: state.users.data
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
)(Dashboard);