import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate } from 'gatsby'
import GuestLayout from '../../components/account/GuestLayout'
import { Formik, ErrorMessage } from 'formik';
import { parseErrors } from '../../helpers/formErrors'

const CUSTOMER_CREATE = gql`
mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
        customer {
            id
        }
        customerUserErrors {
            code
            field
            message
        }
    }
}
`

class Register extends React.Component {
    render() {
        const pageContent = (
            <>
                <h1>Sign Up</h1>
                <Mutation mutation={CUSTOMER_CREATE}
                    onError={errors => {
                        console.log(errors)
                        // errors.forEach(error => {
                        //     console.log(error)
                        // })
                    }}
                >
                    {(customerCreate, { data, loading, errors }) => {
                        if (errors) {
                            console.log(errors)
                            // errors.forEach(error => {
                            //     formErrors.push(error.message);
                            // })
                        }

                        return (
                            <Formik
                                initialValues={{
                                    form: '',
                                    email: '',
                                    password: '',
                                }}

                                onSubmit={
                                    (values, actions) => {
                                        if (!values.email || !values.password) {
                                            return
                                        }

                                        customerCreate({
                                            variables: {
                                                input: {
                                                    "email": values.email,
                                                    "password": values.password,
                                                }
                                            }
                                        }).then((res) => {
                                            if (res.data.customerCreate.customer) {
                                                // TODO: Push new Toaster Notification SUCCESS Registration
                                                navigate(`/account/login`)
                                            } else {
                                                const errors = parseErrors(res.data.customerRecover.userErrors)
                                                actions.setErrors(errors)
                                            }
                                        })
                                    }
                                }
                                render={({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                    <form onSubmit={handleSubmit}>
                                        <ErrorMessage name="form" />
                                        <ul>
                                            <li>
                                                <label htmlFor="loginEmail">Email</label>
                                                <input id="loginEmail" type="email" name="email" value={values.email} onChange={handleChange} placeholder="email@gmail.com" required="" />
                                                <ErrorMessage name="email" />
                                            </li>
                                            <li>
                                                <label htmlFor="loginPassword">Password</label>
                                                <input id="loginPassword" type="password" name="password" value={values.password} onChange={handleChange} required="" />
                                                <ErrorMessage name="password" />
                                            </li>
                                        </ul>
                                        {
                                            (loading)
                                            ? <button disabled="disabled">Creating Account...</button>
                                            : <button>Sign Up</button>
                                        }
                                    </form>
                                )}
                            />
                        )
                    }}
                </Mutation>
                <Link to={`/account/login`}>Login</Link>
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