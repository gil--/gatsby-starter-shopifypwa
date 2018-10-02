import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate } from 'gatsby'
import ContextConsumer from '../../layouts/context'
import GuestLayout from '../../components/account/GuestLayout'
import PropTypes from 'prop-types';

const CUSTOMER_RESET = gql`
mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
        userErrors {
            field
            message
        }
    }
}

`

class ForgotPassword extends React.Component {
    state = {
        email: '',
    }

    handleEmailChange = e => {
        e.preventDefault()

        this.setState({
            email: e.target.value,
        });
    }

    render() {
        const pageContent = (
            <ContextConsumer>
                {({ set }) => {
                    return <>
                        <h1>Forgot Your Password</h1>
                        <form>
                            <ul>
                                <li>
                                    <label htmlFor="forgotEmail">Email</label>
                                    <input id="forgotEmail" type="email" value={this.state.email} onChange={this.handleEmailChange} required="" />
                                </li>
                            </ul>
                            <Mutation
                                mutation={CUSTOMER_RESET}
                                onCompleted={data => {
                                    if (data.customerRecover.userErrors.length || data.customerAccessTokenCreate.customerUserErrors.length) {
                                        return
                                    }

                                    navigate('/account/login')
                                }}
                            >
                                {(forgotPassword, { loading }) => {
                                    if (loading) return <button disabled="disabled">Submitting Request...</button>

                                    return (
                                        <button
                                            onClick={e => {
                                                e.preventDefault()

                                                if (!this.state.email) {
                                                    return
                                                }

                                                forgotPassword({
                                                    variables: {
                                                        "email": this.state.email,
                                                    }
                                                })
                                            }}
                                        >Reset Password</button>
                                    )
                                }}
                            </Mutation>
                        </form>
                        <Link to={`account/login`}>Log In</Link>
                    </>
                }}
            </ContextConsumer>
        )

        return (
            <GuestLayout>
                {pageContent}
            </GuestLayout>
        )
    }
}

export default ForgotPassword