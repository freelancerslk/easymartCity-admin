import React, { Component } from 'react';
import { connect } from "react-redux";
import './SideBar.css';
import { Grid, Header, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { showDashboardView, showProductsView, showCategoriesView, showOrdersView } from '../../actions/actions';

class SideBar extends Component {

    render() {
        return (
            <div className="SideBar">
                <br></br>
                <br></br>
                <Grid padded>
                    <Grid.Row>
                        <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular centered/>
                        <Header as='h5' className="sidebar-item">Easy Mart-LK</Header>
                    </Grid.Row>
                    <Grid.Row className="grid-item" onClick={this.props.showDashboardView}>
                        <Header as='h4' className="sidebar-item">DASHBOARD</Header>
                    </Grid.Row>
                    <Grid.Row className="grid-item" onClick={this.props.showOrdersView}>
                        <Header as='h4' className="sidebar-item">ORDERS</Header>
                    </Grid.Row>
                    <Grid.Row className="grid-item" onClick={this.props.showProductsView}>
                        <Header as='h4' className="sidebar-item">PRODUCTS</Header>
                    </Grid.Row>
                    <Grid.Row className="grid-item last-border" onClick={this.props.showCategoriesView}>
                        <Header as='h4' className="sidebar-item">CATEGORIES</Header>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeView: state.activeView
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showDashboardView: () =>
            new Promise((resolve, reject) => {
                dispatch(showDashboardView());
                resolve('done');
            }),
        showProductsView: () =>
            new Promise((resolve, reject) => {
                dispatch(showProductsView());
                resolve('done');
            }),
        showCategoriesView: () =>
            new Promise((resolve, reject) => {
                dispatch(showCategoriesView());
                resolve('done');
            }),
        showOrdersView: () =>
            new Promise((resolve, reject) => {
                dispatch(showOrdersView());
                resolve('done');
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar);