import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate } from 'gatsby'
import ContextConsumer from '../../layouts/context'
import AuthenticationWrapper from '../../components/account/AuthenticationWrapper'

const CUSTOMER_LOGIN = gql`
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
        userErrors {
            field
            message
        }
        customerAccessToken {
            accessToken
            expiresAt
        }
        customerUserErrors {
            field
            message
        }
    }
}
`

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }

    handleEmailChange = e => {
        e.preventDefault()

        this.setState({
            email: e.target.value,
        });
    }

    handlePasswordChange = e => {
        e.preventDefault()

        this.setState({
            password: e.target.value,
        });
    }

    render () {
        const pageContent = (
            <ContextConsumer>
                {({ set }) => {
                    return <>
                        <h1>Log In</h1>
                        <form>
                            <ul>
                                <li>
                                    <label htmlFor="loginEmail">Email</label>
                                    <input id="loginEmail" type="email" value={this.state.email} onChange={this.handleEmailChange} required="" />
                                </li>
                                <li>
                                    <label htmlFor="loginPassword">Password</label>
                                    <input id="loginPassword" type="password" value={this.state.password} onChange={this.handlePasswordChange} required="" />
                                </li>
                            </ul>
                            <Mutation
                                mutation={CUSTOMER_LOGIN}
                                onError={this.error}
                                onCompleted={data => {
                                    if (data.customerAccessTokenCreate.userErrors.length || data.customerAccessTokenCreate.customerUserErrors.length) {
                                        return
                                    }

                                    this.setState({
                                        email: '',
                                        password: '',
                                    })

                                    set({
                                        customerAccessToken: data.customerAccessTokenCreate.customerAccessToken,
                                    })

                                    navigate('/account')
                                }}
                            >
                                {(customerLogin, { loading }) => {
                                    if (loading) return <button disabled="disabled">Logging In</button>

                                    return (
                                        <button
                                            onClick={e => {
                                                e.preventDefault()

                                                if (!this.state.email || !this.state.password) {
                                                    return
                                                }

                                                customerLogin({
                                                    variables: {
                                                        input: {
                                                            "email": this.state.email,
                                                            "password": this.state.password,
                                                        }
                                                    }
                                                })
                                            }}
                                        >Log In</button>
                                    )
                                }}
                            </Mutation>
                        </form>
                        <Link to={`account/register`}>Sign Up</Link>
                    </>
                }}
            </ContextConsumer>
        )

        return (
            <AuthenticationWrapper
                navigate={`/account`}
                false={pageContent}
            />
        )
    }
}

export default Login