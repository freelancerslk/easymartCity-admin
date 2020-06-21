import React, { Component } from 'react';
import { connect } from "react-redux";
import './CategoriesDetails.css';
import { Modal, Grid, Input, Button, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { loadCategories, addCategory } from '../../../actions/actions';
import { toast } from 'react-semantic-toasts';

class CategoriesDetails extends Component {

    fileInputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            category: {
                name: "",
                image: "",
                description: ""
            }
        }
    };

    componentDidMount() {
        this.props.loadCategories();
    };

    updateData = e => {
        let category = { ...this.state.category }
        switch (e.target.name) {
            case 'image':
                this.toBase64(e.target.files[0]).then(base64 => {
                    category = { ...this.state.category }
                    category.image = base64;
                    this.setState({ category: category });
                });
                break;
            case 'category_name':
                category.name = e.target.value;
                this.setState({ category: category });
                break;
            case 'category_description':
                category.description = e.target.value;
                this.setState({ category: category });
                break;
        }
    };

    selectCategory = (e, { value }) => {
        let category = { ...this.state.category }
        category.category = value;
        this.setState({ category: category });
    };

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    verifyValues = () => {
        if (this.state.category.name == '' || this.state.category.name == undefined) {
            return false;
        }

        // if (this.state.category.description == '' || this.state.category.description == undefined) {
        //     return false;
        // }

        // if (this.state.category.image == '' || this.state.category.image == undefined) {
        //     return false;
        // }

        return true;
    };

    saveCategory = () => {
        if (this.verifyValues()) {
            console.log(JSON.stringify(this.state.category));
            this.props.addCategory(this.state.category).then(() => {
                setTimeout(() => {
                    toast({
                        type: 'success',
                        icon: 'checkmark',
                        title: 'Category Added',
                        description: 'Category added successfully!',
                        time: 5000
                    });
                }, 0);
            });
            this.props.closeProductDetailModal();
        }
    };

    render() {

        return (
            <div className="CategoriesDetails">
                <Modal open={this.props.showModal} onClose={this.props.closeProductDetailModal} size='small' closeIcon>
                    <Modal.Header>New Category</Modal.Header>
                    <Modal.Content>
                        <Grid doubling>
                            <Grid.Row columns={2}>
                                <Grid.Column width={10}>
                                    <Input
                                        fluid
                                        label={{ basic: false, content: "Name" }}
                                        labelPosition="left"
                                        name="category_name"
                                        onChange={this.updateData}
                                    />
                                </Grid.Column>
                                <Grid.Column width={6}>
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
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <Input
                                        label={{ basic: false, content: "Description" }}
                                        labelPosition="left"
                                        fluid
                                        name="category_description"
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
                        <Button color='green' onClick={this.saveCategory}>
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
        addCategory: (category) =>
            new Promise((resolve, reject) => {
                dispatch(addCategory(category));
                resolve();
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesDetails);