import React, { Component } from 'react';
import { connect } from "react-redux";
import './Products.css';
import { Table, Container, Grid, Divider, Header, Icon, Button, Pagination, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadProducts, loadCategories, deleteProduct } from '../../actions/actions';
import FilterProducts from './filter-products/FilterProducts';
import ProductDetails from './product-details/ProductDetails';
import ProductViewer from './product-viewer/ProductViewer';
import EditProduct from './edit-product/EditProduct';
import { toast } from 'react-semantic-toasts';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                show: false,
                categories: [],
                noStock: false
            },
            showDetailsModal: false,
            productViewerModal: false,
            showEditModal: false,
            viewingProduct: {},
            categories: {},
            editingProduct: {},
            pagination: {
                PRODUCTS_PER_PAGE: 5,
                activePage: 1,
                begin: 0,
                end: 5
            },
            searchQuery: ''
        }
    };

    componentDidMount() {
        // this.props.loadProducts();
        // this.props.loadCategories();
    };//

    componentWillReceiveProps(nextProps) {
        let categories = {};
        nextProps.categories.map(category => {
            categories[category.id] = category.name;
        });
        console.log(categories);
        this.setState({ categories: categories });
    };

    toggleFilter = () => {
        let filter = { ...this.state.filter };
        if (filter.show) {
            filter.categories = [];
            filter.noStock = false;
        }
        filter.show = !this.state.filter.show;
        this.setState({ filter: filter });
    };

    addProduct = () => {
        this.setState({ showDetailsModal: !this.state.showDetailsModal });
    };

    closeProductDetailModal = () => this.setState({ showDetailsModal: false });

    showEditModal = () => {
        this.setState({ showEditModal: !this.state.showEditModal });
    };

    closeEditModal = () => this.setState({ showEditModal: false });

    showProductViewer = (product) => {
        this.setState({ productViewerModal: !this.state.productViewerModal, viewingProduct: product });
    };

    closeProductViewer = () => this.setState({ productViewerModal: false });

    updateCatFilter = (e, { value }) => {
        let filter = { ...this.state.filter };
        filter.categories = value;
        this.setState({ filter: filter });
    };

    updateStockFilter = e => {
        let filter = { ...this.state.filter };
        filter.noStock = !this.state.filter.noStock;
        this.setState({ filter: filter });
    };

    editProduct = (e, product) => {
        e.stopPropagation();
        this.setState({
            editingProduct: product
        }, () => {
            this.showEditModal();
        });
    };

    deleteProduct = (e, product) => {
        e.stopPropagation();
        this.props.deleteProduct(product).then(() => {
            setTimeout(() => {
                toast({
                    type: 'success',
                    icon: 'checkmark',
                    title: 'Product Deleted',
                    description: 'Product deleted successfully!',
                    time: 5000
                });
            }, 0);
        });
    };

    changePage = (event, data) => {
        let pagination = { ...this.state.pagination };
        pagination.begin = data.activePage * pagination.PRODUCTS_PER_PAGE - pagination.PRODUCTS_PER_PAGE;
        pagination.end = data.activePage * pagination.PRODUCTS_PER_PAGE;
        this.setState({ pagination: pagination });
    };

    changeSearchQuery = e => {
        if (e.target.name == 'search_query') {
            this.setState({ searchQuery: e.target.value });
        }
    };

    render() {
        let productList = this.props.products.filter(prod => {
            if (this.state.searchQuery !== '' && prod.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) == -1) return false;
            if (this.state.filter.categories.length > 0 && this.state.filter.categories.indexOf(prod.category) < 0) return false;
            if (this.state.filter.noStock && prod.stockCount > 0) return false;
            return true;
        });

        productList = productList.slice(this.state.pagination.begin, this.state.pagination.end);
        return (
            <div className="Products">
                <Grid padded>
                    <Grid.Row>
                        <Container>
                            <Button icon labelPosition='left' color='teal' floated='left' onClick={this.addProduct}>
                                <Icon name='plus' />
                                ADD PRODUCT
                            </Button>
                        </Container>
                    </Grid.Row>
                    <Grid.Row>
                        <Container>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='bar chart' />
                                    Products List
                                </Header>
                            </Divider>
                            <Grid divided='vertically' inverted padded>
                                <Grid.Row columns={2}>
                                    <Grid.Column width={14}>
                                        <Input icon='search' name='search_query' fluid placeholder='Search...' onChange={this.changeSearchQuery} />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button icon labelPosition='left' color='yellow' onClick={this.toggleFilter}>
                                            <Icon name='filter' />
                                            Filter
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            {this.state.filter.show ? (
                                <Grid.Row columns={1}>
                                    <Grid.Column width={14}>
                                        <FilterProducts filter={this.state.filter} categories={this.props.categories} updateCatFilter={this.updateCatFilter} updateStockFilter={this.updateStockFilter}/>
                                    </Grid.Column>
                                </Grid.Row>
                            ) : null}

                            <Table celled selectable size='small' inverted>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Product</Table.HeaderCell>
                                        <Table.HeaderCell>Category</Table.HeaderCell>
                                        <Table.HeaderCell collapsing>Unit Price</Table.HeaderCell>
                                        <Table.HeaderCell>Stock</Table.HeaderCell>
                                        <Table.HeaderCell>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {productList.map(product => (
                                        <Table.Row onClick={() => this.showProductViewer(product)}>
                                            <Table.Cell>{product.name}</Table.Cell>
                                            <Table.Cell>{this.state.categories[product.category] ? this.state.categories[product.category] : ""}</Table.Cell>
                                            <Table.Cell collapsing textAlign='right'>{product.price}</Table.Cell>
                                            <Table.Cell collapsing textAlign='right'>{product.stockCount}</Table.Cell>
                                            <Table.Cell collapsing>
                                                <Button size='mini' icon color='green' onClick={e => {
                                                    this.editProduct(e, product);
                                                }}><Icon name='edit' /></Button>
                                                <Button size='mini' icon color='red' onClick={e => {
                                                    this.deleteProduct(e, product);
                                                }}><Icon name='delete' /></Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                            <Pagination defaultActivePage={1} totalPages={Math.floor(this.props.products.length / this.state.pagination.PRODUCTS_PER_PAGE) + 1} onPageChange={this.changePage} />
                        </Container>
                    </Grid.Row>
                </Grid>
                <ProductViewer product={this.state.viewingProduct} categories={this.state.categories} showModal={this.state.productViewerModal} closeModal={this.closeProductViewer} />
                <ProductDetails showModal={this.state.showDetailsModal} closeProductDetailModal={this.closeProductDetailModal} />
                <EditProduct product={this.state.editingProduct} showModal={this.state.showEditModal} closeModal={this.closeEditModal} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.products.loading,
        products: state.products.data,
        categories: state.categories.data
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
        deleteProduct: (product) =>
            new Promise((resolve, reject) => {
                dispatch(deleteProduct(product));
                resolve();
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);