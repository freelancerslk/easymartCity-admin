import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import './Login.css';
import 'semantic-ui-css/semantic.min.css'
import { loadProducts, loadCategories, deleteProduct, verifyCredentials, login } from '../../actions/actions';
import { toast } from 'react-semantic-toasts';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    updateCredentials = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    verfiyLogin = () => {
        this.props.verifyCredentials(this.state.username).then(result => {
            console.log(result);
            if (result) {
                if (this.state.password == result.password) {
                    setTimeout(() => {
                        toast({
                            type: 'success',
                            icon: 'user',
                            title: 'Authentication Successful!',
                            description: 'Welcome !',
                            time: 5000
                        });
                    }, 0);
                    this.props.login(result);
                } else {
                    setTimeout(() => {
                        toast({
                            type: 'error',
                            icon: 'user times',
                            title: 'Authentication failed!',
                            description: 'Please enter a correct password!',
                            time: 5000
                        });
                    }, 0);
                }
            } else {
                setTimeout(() => {
                    toast({
                        type: 'error',
                        icon: 'user times',
                        title: 'Authentication failed!',
                        description: 'Please enter valid username and password!',
                        time: 5000
                    });
                }, 0);
            }
        })
    }

    render() {
        if(this.props.loginStatus) {
            setTimeout(() => {
                toast({
                    type: 'success',
                    icon: 'user',
                    title: 'Authentication Successful!',
                    description: 'Welcome !',
                    time: 5000
                });
            }, 0);
            return <Redirect to='/' />;
        }
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        {/* <Image src='/logo.png' />  */}
                        Admin Panel
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                name="username"
                                onChange={this.updateCredentials}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name="password"
                                onChange={this.updateCredentials}
                            />

                            <Button color='teal' fluid size='large' onClick={() => this.verfiyLogin()}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.loginStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        verifyCredentials: (username) =>
            new Promise((resolve, reject) => {
                resolve(dispatch(verifyCredentials(username)));
            }),
        login: (user) =>
            new Promise((resolve, reject) => {
                resolve(dispatch(login(user)));
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);