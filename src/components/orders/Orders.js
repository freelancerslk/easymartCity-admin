import React, { Component } from 'react';
import { connect } from "react-redux";
import './Orders.css';
import { Table, Container, Grid, Divider, Header, Icon, Button, Pagination, Input, Dropdown, Checkbox, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadProducts, loadCategories, deleteProduct, loadOrders, loadUsers } from '../../actions/actions';
import FilterProducts from '../products/filter-products/FilterProducts';
import OrderDetails from './order-details/OrderDetails';

const statuses = [
    {
        key: 'pending',
        text: 'pending',
        value: 'pending'
    },
    {
        key: 'processing',
        text: 'processing',
        value: 'processing'
    },
    {
        key: 'delivering',
        text: 'delivering',
        value: 'delivering'
    },
    {
        key: 'completed',
        text: 'completed',
        value: 'completed'
    }
];

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                ORDERS_PER_PAGE: 5,
                activePage: 1,
                begin: 0,
                end: 5
            },
            filter: {
                product: '',
                user: '',
                status: ''
            },
            showOrderView: false,
            currentOrder: {
                order: {},
                product: {},
                user: {}
            }
        }
    };

    componentDidMount() {
        this.setProductsMap(this.props);
        this.setUsersMap(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.setProductsMap(nextProps);
        this.setUsersMap(nextProps);
    };

    setUsersMap = (nextProps) => {
        let users = {};
        nextProps.users.map(user => {
            users[user.id] = {
                name: user.first_name + ' ' + user.last_name,
                obj: user
            };
        });
        console.log(users);
        this.setState({ users: users });
    };

    setProductsMap = (nextProps) => {
        let products = {};
        nextProps.products.map(product => {
            products[product.id] = {
                name: product.name,
                obj: product
            };
        });
        console.log(products);
        this.setState({ products: products });
    };

    updateProductFilter = (e, { value }) => {
        let filter = { ...this.state.filter };
        filter.product = value;
        this.setState({ filter: filter });
        switch (e.target.name) {
            case 'filter_prod':
                filter.product = value;
                break;
            case 'filter_user':
                filter.user = value;
                break;
            case 'filter_status':
                filter.status = value;
                break;
        }
        this.setState({ filter: filter });
    };

    updateUserFilter = (e, { value }) => {
        let filter = { ...this.state.filter };
        filter.user = value;
        this.setState({ filter: filter });
    };

    updateStatusFilter = (e, { value }) => {
        let filter = { ...this.state.filter };
        filter.status = value;
        this.setState({ filter: filter });
    };

    changePage = (event, data) => {
        let pagination = { ...this.state.pagination };
        pagination.begin = data.activePage * pagination.ORDERS_PER_PAGE - pagination.ORDERS_PER_PAGE;
        pagination.end = data.activePage * pagination.ORDERS_PER_PAGE;
        this.setState({ pagination: pagination });
    };

    getOptions = items => {
        let array = [];
        items.forEach((item) => {
            array.push({
                key: item.id,
                text: item.name,
                value: item.id
            });
        });
        return array;
    };

    getUsers = users => {
        let array = [];
        users.forEach((user) => {
            array.push({
                key: user.id,
                text: user.first_name + ' ' + user.last_name,
                value: user.id
            });
        });
        return array;
    };

    showOrderViewer = (order) => {
        let currOrder = {
            order: order,
            user: this.state.users[order.user].obj
        }
        this.setState({showOrderView: true, currentOrder: currOrder});
    };

    closeOrderViewer = () => {
        this.setState({showOrderView: false});
    };

    render() {
        let orderList = this.props.orders.filter(order => {
            if (this.state.filter.product.length > 0 && this.state.filter.product.indexOf(order.product) < 0) return false;
            if (this.state.filter.user.length > 0 && this.state.filter.user.indexOf(order.user) < 0) return false;
            if (this.state.filter.status.length > 0 && this.state.filter.status.indexOf(order.status) < 0) return false;
            return true;
        });

        orderList = orderList.slice(this.state.pagination.begin, this.state.pagination.end);

        return (
            <div className="Orders">
                <Grid padded>
                    <Grid.Row>
                        <Container>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='bar chart' />
                                    Orders List
                                </Header>
                            </Divider>

                            <Grid.Row>
                                <Grid divided='vertically' padded>
                                    <Grid.Row columns={2}>
                                        {/* <Grid.Column>
                                            <Dropdown placeholder='Product' name='filter_prod' fluid multiple selection options={this.getOptions(this.props.products)} onChange={this.updateProductFilter} />
                                        </Grid.Column> */}
                                        <Grid.Column>
                                            <Dropdown placeholder='User' name='filter_user' fluid multiple selection options={this.getUsers(this.props.users)} onChange={this.updateUserFilter} />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Dropdown placeholder='Status' name='filter_status' fluid multiple selection options={statuses} onChange={this.updateStatusFilter} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Row>

                            <Table celled selectable size='small' inverted>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Order ID</Table.HeaderCell>
                                        <Table.HeaderCell>User</Table.HeaderCell>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Time</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.products && this.state.users && orderList.map(order => (
                                        <Table.Row onClick={() => this.showOrderViewer(order)}>
                                            <Table.Cell collapsing>{order.id}</Table.Cell>
                                            <Table.Cell>{this.state.users[order.user] ? this.state.users[order.user].name : ""}</Table.Cell>
                                            <Table.Cell collapsing>{order.date}</Table.Cell>
                                            <Table.Cell collapsing>{order.time}</Table.Cell>
                                            <Table.Cell collapsing>{order.status}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                            <Pagination defaultActivePage={1} totalPages={Math.floor(this.props.orders.length / this.state.pagination.ORDERS_PER_PAGE) + 1} onPageChange={this.changePage} />
                        </Container>
                    </Grid.Row>
                </Grid>
                <OrderDetails showModal={this.state.showOrderView} closeModal={this.closeOrderViewer} order={this.state.currentOrder.order} products={this.state.products} user={this.state.currentOrder.user}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.orders.loading,
        products: state.products.data,
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
                resolve('done');
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
)(Orders);