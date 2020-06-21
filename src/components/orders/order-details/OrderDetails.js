import React, { Component } from 'react';
import { connect } from "react-redux";
import './OrderDetails.css';
import { Modal, Image, Table, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { editOrder } from '../../../actions/actions';
import { toast } from 'react-semantic-toasts';

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

class OrderDetails extends Component {

    updateStatus = (e, { value }) => {
        let order = this.props.order;
        order.status = value;
        this.props.editOrder(order).then(() => {
            setTimeout(() => {
                toast({
                    type: 'success',
                    icon: 'checkmark',
                    title: 'Status Updated',
                    description: 'Order status updated successfully!',
                    time: 5000
                });
            }, 0);
        });
    }

    render() {
        const order = this.props.order;
        const items = order.items;
        const user = this.props.user;
        const products = this.props.products;
        return (
            <div className="OrderDetails">
                <Modal open={this.props.showModal} onClose={this.props.closeModal} size='small' closeIcon>
                    <Modal.Content>
                        <Table basic='very'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Order #</Table.HeaderCell>
                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{order.id}</Table.Cell>
                                    <Table.Cell>
                                        <Dropdown defaultValue={order.status} options={statuses} onChange={this.updateStatus}>
                                            {/* <Dropdown.Menu options={statuses}>
                                                <Dropdown.Item options={statuses}/>
                                                <Dropdown.Item text='Active'/>
                                                <Dropdown.Item text='Completed'/>
                                            </Dropdown.Menu> */}
                                        </Dropdown>
                                    </Table.Cell>
                                    <Table.Cell>{order.date}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='2'>Item</Table.HeaderCell>
                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell>Total</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {items && items.map(item => {
                                    let product = products[item.product].obj;
                                    JSON.stringify(product);
                                    return (
                                        <Table.Row>
                                            <Table.Cell><Image src={product.image} size='small' /></Table.Cell>
                                            <Table.Cell>{product.name}</Table.Cell>
                                            <Table.Cell textAlign='center'>{item.qty}</Table.Cell>
                                            <Table.Cell>Rs. {item.qty * (product.discount ? product.discount : product.price)}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <Table definition>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Customer</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>Name</Table.Cell>
                                    <Table.Cell>{user.first_name + ' ' + user.last_name}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>Address</Table.Cell>
                                    <Table.Cell>{order.address}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>City</Table.Cell>
                                    <Table.Cell>{user.city}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>Zip Code</Table.Cell>
                                    <Table.Cell>{user.zipcode}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>Province</Table.Cell>
                                    <Table.Cell>{user.province}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>Mobile Number</Table.Cell>
                                    <Table.Cell>{user.telephone}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editOrder: (order) =>
            new Promise((resolve, reject) => {
                dispatch(editOrder(order));
                resolve('done');
            }),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(OrderDetails);