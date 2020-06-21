import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProductDetails.css';
import { Modal, Grid, Input, Dropdown, Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadProducts, addProducts, loadCategories } from '../../../actions/actions';
import { toast } from 'react-semantic-toasts';

class ProductDetails extends Component {

    fileInputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            product: {
                name: "",
                category: "",
                price: 0,
                stockCount: 0,
                image: "",
                discount: 0
            },
            categories: this.props.categories
        }
    };

    getOptions = categories => {
        let array = [];
        categories.forEach((category) => {
            array.push({
                key: category.id,
                text: category.name,
                value: category.id
            });
        });
        return array;
    };

    componentDidMount() {
        this.props.loadCategories();
        this.props.loadProducts();
    };

    updateData = e => {
        let product = { ...this.state.product }
        switch (e.target.name) {
            case 'image':
                this.toBase64(e.target.files[0]).then(base64 => {
                    product = { ...this.state.product }
                    product.image = base64;
                    this.setState({ product: product });
                });
                break;
            case 'product_name':
                product.name = e.target.value;
                this.setState({ product: product });
                break;
            case 'product_price':
                product.price = e.target.value;
                this.setState({ product: product });
                break;
            case 'product_stockCount':
                product.stockCount = e.target.value;
                this.setState({ product: product });
                break;
            case 'product_discount':
                product.discount = e.target.value;
                this.setState({ product: product });
                break;
        }
    };

    selectCategory = (e, { value }) => {
        let product = { ...this.state.product }
        product.category = value;
        this.setState({ product: product });
    };

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    verifyValues = () => {
        if (this.state.product.name == '' || this.state.product.name == undefined) {
            return false;
        }

        if (this.state.product.category == '' || this.state.product.category == undefined) {
            return false;
        }

        if (this.state.product.price <= 0 || this.state.product.price == undefined) {
            return false;
        }

        if (this.state.product.stockCount <= 0 || this.state.product.stockCount == undefined) {
            return false;
        }

        if (this.state.product.image == '' || this.state.product.image == undefined) {
            return false;
        }

        return true;
    };

    saveProduct = () => {
        if (this.verifyValues()) {
            console.log(JSON.stringify(this.state.product));
            this.props.addProducts(this.state.product).then(() => {
                setTimeout(() => {
                    toast({
                        type: 'success',
                        icon: 'checkmark',
                        title: 'Product Added',
                        description: 'New product added successfully!',
                        time: 5000
                    });
                }, 0);
            });
        }
    };

    render() {

        return (
            <div className="ProductDetails">
                <Modal open={this.props.showModal} onClose={this.props.closeProductDetailModal} size='small' closeIcon>
                    <Modal.Header>New Product</Modal.Header>
                    <Modal.Content>
                        <Grid doubling padded>
                            <Grid.Row columns={2}>
                                <Grid.Column width={12}>
                                    <Input
                                        fluid
                                        label={{ basic: false, content: "Name" }}
                                        labelPosition="left"
                                        name="product_name"
                                        onChange={this.updateData}
                                    />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Dropdown
                                        button
                                        className='icon'
                                        floating
                                        labeled
                                        icon='world'
                                        options={this.getOptions(this.props.categories)}
                                        text='Category'
                                        onChange={this.selectCategory}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Button
                                        content="Choose Image"
                                        labelPosition="left"
                                        icon="file image"
                                        fluid
                                        onClick={() => this.fileInputRef.current.click()}
                                    />
                                    <input
                                        ref={this.fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        name="image"
                                        hidden
                                        onChange={this.updateData}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Input
                                        label={{ basic: false, content: "Price" }}
                                        labelPosition="left"
                                        type="number"
                                        name="product_price"
                                        onChange={this.updateData}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Input
                                        label={{ basic: false, content: "Stock Count" }}
                                        labelPosition="left"
                                        type="number"
                                        name="product_stockCount"
                                        onChange={this.updateData}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <Input
                                        label={{ basic: false, content: "Discount" }}
                                        labelPosition="left"
                                        type="number"
                                        name="product_discount"
                                        onChange={this.updateData}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.props.closeProductDetailModal}>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button color='green' onClick={this.saveProduct}>
                            <Icon name='save' /> Save
                        </Button>
                    </Modal.Actions>
                </Modal>
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
                resolve();
            }),
        loadProducts: () =>
            new Promise((resolve, reject) => {
                dispatch(loadProducts());
                resolve();
            }),
        addProducts: (product) =>
            new Promise((resolve, reject) => {
                dispatch(addProducts(product));
                resolve();
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetails);