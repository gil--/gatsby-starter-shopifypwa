import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link } from 'gatsby'
import GuestLayout from '../../components/account/GuestLayout'

const CUSTOMER_CREATE = gql`
mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
        userErrors {
            field
            message
        }
        customer {
            id
        }
    }
}
`

class Register extends React.Component {
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

    render() {
        const pageContent = (
            <>
                <h1>Sign Up</h1>
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
                        mutation={CUSTOMER_CREATE}
                        onError={this.error}
                        onCompleted={data => {
                            if (data.customerCreate.userErrors.length) {
                                return
                            }

                            this.setState({
                                email: '',
                                password: '',
                            })

                            console.log(data)
                        }}
                    >
                        {(customerCreate, { loading }) => {
                            if (loading) return <button disabled="disabled">Creating Account</button>

                            return (
                                <button
                                    onClick={e => {
                                        e.preventDefault()

                                        if (!this.state.email || !this.state.password) {
                                            return
                                        }

                                        customerCreate({
                                            variables: {
                                                input: {
                                                    "email": this.state.email,
                                                    "password": this.state.password,
                                                }
                                            }
                                        })
                                    }}
                                >Sign Up</button>
                            )
                        }}
                    </Mutation>
                </form>
                <Link to={`account/login`}>Login</Link>
            </>
        )

        return (
            <GuestLayout>
                {pageContent}
            </GuestLayout>
        )
    }
}

export default Register