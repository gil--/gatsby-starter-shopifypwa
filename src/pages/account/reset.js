import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate, replace } from 'gatsby'
import ContextConsumer from '../../layouts/context'
import GuestLayout from '../../components/account/GuestLayout'

const CUSTOMER_RESET = gql`
mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
        userErrors {
            field
            message
        }
        customer {
            id
        }
        customerAccessToken {
            accessToken
            expiresAt
        }
    }
}
`

class ResetPassword extends React.Component {
    state = {
        password: '',
        passwordVerification: '',
        customerId: '',
        resetToken: '',
    }

    componentDidMount() {
        const params = new URLSearchParams(document.location.search.substring(1))
        const customerId = window.btoa(`gid://shopify/Customer/${params.get('id')}`)
        const resetToken = params.get('token')

        this.setState({
            customerId: customerId,
            resetToken: resetToken,
        })
    }

    handleInputChange = e => {
        e.preventDefault()

        this.setState({
            password: e.target.value,
        })
    }

    render() {
        const pageContent = (
            <ContextConsumer>
                {({ set }) => {
                    return <>
                        <h1>Reset Your Password</h1>
                        <form>
                            <ul>
                                <li>
                                    <label htmlFor="forgotPass">New Password</label>
                                    <input id="forgotPass" type="password" value={this.state.password} name="password" onChange={this.handleInputChange} required="" />
                                </li>
                                <li>
                                    <label htmlFor="forgotPassVerify">Verify New Password</label>
                                    <input id="forgotPassVerify" type="password" value={this.state.passwordVerification} name="passwordVerification" onChange={this.handleInputChange} required="" />
                                </li>
                            </ul>
                            <Mutation
                                mutation={CUSTOMER_RESET}
                                onCompleted={data => {
                                    if (data.customerReset.userErrors.length) {
                                        return
                                    }

                                    this.setState({
                                        password: '',
                                        passwordVerification: '',
                                        customerId: '',
                                        resetToken: '',
                                    })

                                    set({
                                        customerAccessToken: data.customerReset.customerAccessToken,
                                    })

                                    navigate('/account')
                                }}
                            >
                                {(resetPassword, { loading }) => {
                                    if (loading) return <button disabled="disabled">Changing Password...</button>

                                    return (
                                        <button
                                            onClick={e => {
                                                e.preventDefault()

                                                if (!this.state.password ||
                                                    !this.state.passwordVerification ||
                                                    this.state.password != this.state.passwordVerification) {
                                                    // TODO: return FORM error
                                                    return
                                                }

                                                resetPassword({
                                                    variables: {
                                                        "id": this.state.customerId,
                                                        "input": {
                                                            "resetToken": this.state.resetToken,
                                                            "password": this.state.password
                                                        }
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
            (!this.state.customerId || !this.state.resetToken) ?
            <p>Malformed password reset url.</p>
                : <GuestLayout>
                    {pageContent}
                </GuestLayout>
        )
    }
}

export default ResetPassword