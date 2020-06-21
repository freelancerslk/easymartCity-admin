import React, { Component } from 'react';
import './FilterProducts.css';
import { Container, Dropdown, Checkbox, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class FilterProducts extends Component {

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

    render() {

        return (
            <div className="FilterProducts">
                <Container>
                    <Grid divided='vertically' padded>
                        <Grid.Row columns={2}>
                            <Grid.Column width={10}>
                                <Dropdown placeholder='Category' name='filter_cat' fluid multiple selection options={this.getOptions(this.props.categories)} onChange={this.props.updateCatFilter} defaultValue={this.props.filter.categories} />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Checkbox label='Out of stock products only' name='filter_stock' onChange={this.props.updateStockFilter} defaultChecked={this.props.filter.noStock}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default FilterProducts;