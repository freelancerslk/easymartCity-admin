import React, { Component } from 'react';
import { connect } from "react-redux";
import './Categories.css';
import { Grid, Divider, Header, Icon, Card, Container, Button, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { loadProducts, loadCategories, deleteCategory } from '../../actions/actions';
import CategoriesDetails from './categories-details/CategoriesDetails';
import { toast } from 'react-semantic-toasts';
import EditCategory from './edit-category/EditCategory';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetailsModal: false,
            deleteDialog: false,
            showEditModal: false,
            currCategory: {}
        }
    };

    componentDidMount() {
        // this.props.loadProducts();
        // this.props.loadCategories();
    };

    showModal = () => {
        this.setState({ showDetailsModal: !this.state.showDetailsModal });
    };

    closeProductDetailModal = () => this.setState({ showDetailsModal: false });

    showEditModal = (category) => {
        this.setState({ currCategory: category, showEditModal: true });
    };

    closeEditModal = () => {
        this.setState({ showEditModal: false });
    };

    deleteCategories = (category) => {
        let count = 0;
        this.props.products.map(prod => {
            if (prod.category == category.id) {
                count++;
                return;
            }
        });
        if (count > 0) {
            this.setState({ deleteDialog: true });
        } else {
            this.props.deleteCategory(category).then(() => {
                setTimeout(() => {
                    toast({
                        type: 'success',
                        icon: 'checkmark',
                        title: 'Category Deleted',
                        description: 'Category deleted successfully!',
                        time: 5000
                    });
                }, 0);
            });
        }
    };

    closeDeleteDialog = () => {
        this.setState({deleteDialog: false});
    }

    render() {
        return (
            <div className="Categories">
                <Modal open={this.state.deleteDialog} onClose={this.closeDeleteDialog} size='small' basic size='small'>
                    <Header icon='archive' content='Failed to delete category' />
                    <Modal.Content>
                        <p>
                            There are products belonging to the category you selected. Delete the products first!
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' basic inverted onClick={this.closeDeleteDialog}>
                            Okay
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Container>
                    <Grid padded>
                        <Grid.Row>
                            <Container>
                                <Button icon labelPosition='left' color='grey' floated='left' onClick={this.showModal}>
                                    <Icon name='plus' />
                                    ADD CATEGORY
                                </Button>
                            </Container>
                        </Grid.Row>
                        <Grid.Row>
                            <Container>
                                <Divider horizontal>
                                    <Header as='h4'>
                                        <Icon name='bar chart' />
                                        Categories
                                    </Header>
                                </Divider>
                                <Card.Group itemsPerRow={4}>
                                    {this.props.categories.map(category => (
                                        <Card color='blue' onClick={() => this.showEditModal(category)}>
                                            <Card.Content>
                                                <Card.Header content={category.name} />
                                                <Card.Meta content='Category' />
                                                <Card.Description content={category.description} />
                                            </Card.Content>
                                            <Card.Content extra>
                                                <Button size='mini' floated='right' color='red' onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.deleteCategories(category);
                                                }} icon>
                                                    <Icon name='trash' />
                                                </Button>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card.Group>
                            </Container>
                        </Grid.Row>
                    </Grid>
                </Container>
                <CategoriesDetails showModal={this.state.showDetailsModal} closeProductDetailModal={this.closeProductDetailModal} />
                <EditCategory category={this.state.currCategory} showModal={this.state.showEditModal} closeModal={this.closeEditModal}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.categories.loading,
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
        deleteCategory: (category) =>
            new Promise((resolve, reject) => {
                dispatch(deleteCategory(category));
                resolve();
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);