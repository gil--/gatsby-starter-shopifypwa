import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate, replace } from 'gatsby'
import ContextConsumer from '../../layouts/context'
import AuthenticationWrapper from '../../components/account/AuthenticationWrapper'

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

    handlePasswordChange = e => {
        e.preventDefault()

        this.setState({
            password: e.target.value,
        })
    }

    handlePasswordVerificationChange = e => {
        e.preventDefault()

        this.setState({
            passwordVerification: e.target.value,
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
                                    <input id="forgotPass" type="password" value={this.state.password} onChange={this.handlePasswordChange} required="" />
                                </li>
                                <li>
                                    <label htmlFor="forgotPassVerify">Verify New Password</label>
                                    <input id="forgotPassVerify" type="password" value={this.state.passwordVerification} onChange={this.handlePasswordVerificationChange} required="" />
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
            : <AuthenticationWrapper>
                {({ isAuthenticated }) => (
                    (!isAuthenticated)
                        ? replace(`/account`)
                        : pageContent
                )}
            </AuthenticationWrapper>
        )
    }
}

export default ResetPassword