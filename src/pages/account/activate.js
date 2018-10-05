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

const CUSTOMER_ACTIVATE = gql`
mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
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

class Activate extends React.Component {
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
        activationToken: '',
    }

    componentDidMount() {
        const params = new URLSearchParams(document.location.search.substring(1))
        const customerId = window.btoa(`gid://shopify/Customer/${params.get('id')}`)
        const activationToken = params.get('token')

        this.setState({
            customerId,
            activationToken,
        })
    }

    render() {
        const pageContent = (
            <ContextConsumer>
                {({ set }) => {
                    return <>
                        <h1>Activate Your Account</h1>
                        <p>Create your password to activate your account.</p>
                        <Mutation mutation={CUSTOMER_ACTIVATE}>
                            {(activateAccount, { loading }) => {
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
                                                activateAccount({
                                                    variables: {
                                                        "id": this.state.customerId,
                                                        "input": {
                                                            "activationToken": this.state.activationToken,
                                                            "password": values.password
                                                        }
                                                    }
                                                }).then((res) => {
                                                    if (res.data.customerActivate.customerAccessToken) {
                                                        set({
                                                            customerAccessToken: res.data.customerActivate.customerAccessToken,
                                                        })
                                                    } else {
                                                        const errors = parseErrors(res.data.customerActivate.userErrors)
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
                                                        <label htmlFor="password">Password</label>
                                                        <PasswordInput id="password" name="password" value={values.password} onChange={handleChange} required="" ref={this.firstInput} />
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
                                                    ? <button disabled="disabled">Activating account...</button>
                                                    : <button disabled={
                                                        isSubmitting ||
                                                        !!(errors.password && touched.password) ||
                                                        !!(errors.passwordVerification && touched.passwordVerification)
                                                        }>Activate Account</button>
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
            (!this.state.customerId || !this.state.activationToken) ?
            <p>Malformed customer activation url.</p>
                : <GuestLayout>
                    {pageContent}
                </GuestLayout>
        )
    }
}

export default Activate