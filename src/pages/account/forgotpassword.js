import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate } from 'gatsby'
import GuestLayout from '../../components/account/GuestLayout'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { parseErrors } from '../../helpers/formErrors'
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

const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
})

class ForgotPassword extends React.Component {
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

    render() {
        const pageContent = (
            <>
                <h1>Forgot Your Password</h1>
                <Mutation mutation={CUSTOMER_RESET}>
                    {(forgotPassword, { loading }) => {
                        return (
                            <Formik
                                initialValues={{
                                    form: '',
                                    email: '',
                                }}
                                validationSchema={FormSchema}
                                onSubmit={
                                    (values, actions) => {
                                        if (!values.email) {
                                            return
                                        }

                                        forgotPassword({
                                            variables: {
                                                "email": values.email,
                                            }
                                        }).then((res) => {
                                            if (!res.data.customerRecover.userErrors.length) {
                                                navigate('/account/login')
                                            } else {
                                                const errors = parseErrors(res.data.customerRecover.userErrors)
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
                                                <label htmlFor="forgotEmail">Email</label>
                                                <input id="forgotEmail" type="email" name="email" value={values.email} onChange={handleChange} required="" ref={this.firstInput} />
                                                <ErrorMessage component="div" name="email" />
                                            </li>
                                        </ul>
                                        {
                                            (loading)
                                                ? <button disabled="disabled">Requesting Reset...</button>
                                                : <button disabled={
                                                isSubmitting ||
                                                !!(errors.email && touched.email)
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
        )

        return (
            <GuestLayout>
                {pageContent}
            </GuestLayout>
        )
    }
}

export default ForgotPassword