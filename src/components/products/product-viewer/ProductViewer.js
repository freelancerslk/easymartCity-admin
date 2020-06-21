import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProductViewer.css';
import { Modal, Image, Card, Header, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadProducts, addProducts, loadCategories } from '../../../actions/actions';

class ProductViewer extends Component {

    render() {

        const product = this.props.product;

        return (
            <div className="ProductViewer">
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size='tiny' closeIcon>
                    {/* <Modal.Header>{product.name}</Modal.Header> */}
                    <Modal.Content>
                        <Card fluid>
                            <Image src={product.image} size='small' centered />
                            <Card.Content>
                                <Grid>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={4}>
                                            <Header as='h4'>Name:</Header>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            {product.name}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={4}>
                                            <Header as='h4'>Category:</Header>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            {this.props.categories[product.category] ? this.props.categories[product.category] : ""}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={4}>
                                            <Header as='h4'>Price:</Header>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            Rs. {product.price}
                                        </Grid.Column>
                                    </Grid.Row>
                                    {product.discount ? <Grid.Row columns={2}>
                                        <Grid.Column width={4}>
                                            <Header as='h4'>Discount:</Header>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            Rs. {product.discount}
                                        </Grid.Column>
                                    </Grid.Row> : null}
                                    <Grid.Row columns={2}>
                                        <Grid.Column width={4}>
                                            <Header as='h4'>Stock:</Header>
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            {product.stockCount}(units)
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Card.Content>
                        </Card>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default ProductViewer;