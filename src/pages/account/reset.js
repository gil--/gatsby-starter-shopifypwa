import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate } from 'gatsby'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ContextConsumer from '../../layouts/context'
import GuestLayout from '../../components/account/GuestLayout'
import PasswordInput from '../../components/form/PasswordInput'
import { parseErrors } from '../../helpers/formErrors'

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

const FormSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is Required'),
    passwordVerification: Yup.string()
        .oneOf([Yup.ref('password')], 'Password and confirmation must been the same')
        .required('Password Confirmation is Required'),
})

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.firstInput = React.createRef()
    }

    handleFirstInputFocus() {
        this.firstInput.current.focus()
    }

    componentDidMount() {
        this.handleFirstInputFocus()
    }

    state = {
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

    render() {
        const pageContent = (
            <ContextConsumer>
                {({ set }) => {
                    return <>
                        <h1>Reset Your Password</h1>
                        <Mutation mutation={CUSTOMER_RESET}>
                            {(resetPassword, { loading }) => {
                                return (
                                    <Formik
                                        initialValues={{
                                            form: '',
                                            password: '',
                                            passwordVerification: '',
                                        }}
                                        validationSchema={FormSchema}
                                        onSubmit={
                                            (values, actions) => {
                                                resetPassword({
                                                    variables: {
                                                        "id": this.state.customerId,
                                                        "input": {
                                                            "resetToken": this.state.resetToken,
                                                            "password": values.password
                                                        }
                                                    }
                                                }).then((res) => {
                                                    if (res.data.customerReset.customerAccessToken) {
                                                        set({
                                                            customerAccessToken: res.data.customerReset.customerAccessToken,
                                                        })
                                                    } else {
                                                        const errors = parseErrors(res.data.customerReset.userErrors)
                                                        actions.setErrors(errors)
                                                    }
                                                })
                                            }
                                        }
                                        render={({
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            isSubmitting,
                                            values,
                                            errors,
                                            touched
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <ErrorMessage name="form" />
                                                <ul>
                                                    <li>
                                                        <label htmlFor="forgotPass">New Password</label>
                                                        <PasswordInput id="forgotPass" name="password" value={values.password} onChange={handleChange} required="" ref={this.firstInput} />
                                                        <ErrorMessage component="div" name="password" />
                                                    </li>
                                                    <li>
                                                        <label htmlFor="forgotPassVerify">Verify New Password</label>
                                                        <PasswordInput id="forgotPassVerify" name="passwordVerification" value={values.passwordVerification} onChange={handleChange} required="" />
                                                        <ErrorMessage component="div" name="passwordVerification" />
                                                    </li>
                                                </ul>
                                                {
                                                (loading)
                                                    ? <button disabled="disabled">Resetting Password...</button>
                                                    : <button disabled={
                                                        isSubmitting ||
                                                        !!(errors.password && touched.password) ||
                                                        !!(errors.passwordVerification && touched.passwordVerification)
                                                        }>Reset Password</button>
                                                }
                                            </form>
                                        )}
                                    />
                                )
                            }}
                        </Mutation>
                        <Link to={`/account/login`}>Log In</Link>
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