import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link } from 'gatsby'
import GuestLayout from '../../components/account/GuestLayout'
import { Formik, ErrorMessage } from 'formik';

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
                <Mutation
                    mutation={CUSTOMER_CREATE}
                    onCompleted={data => {
                        if (data.customerCreate.customerUserErrors.length) {
                            return
                        }
                    }}
                    onError={errors => {
                        console.log(errors)
                        // errors.forEach(error => {
                        //     console.log(error)
                        // })
                    }}
                >
                    {(customerCreate, { data, loading, errors }) => {
                        // let formErrors = []

                        // if (data && data.customerCreate && data.customerCreate.customerUserErrors) {
                        //     data.customerCreate.customerUserErrors.forEach(error => {
                        //         formInputErrors[error.field[1]] = error.message
                        //     })
                        // }

                        if (errors) {
                            console.log(errors)
                            // errors.forEach(error => {
                            //     formErrors.push(error.message);
                            // })
                        }

                        return (
                            <Formik
                                initialValues={{
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
                                            console.log(res)

                                            if (res.data.customerCreate.customer) {

                                            } else {
                                                let formInputErrors = {}
                                                // extract to function. insert res.data.customerCreate.customerUserErrors and return object
                                                // actions.setErrors(formInputErrors(res.data.customerCreate.customerUserErrors))
                                                res.data.customerCreate.customerUserErrors.forEach(error => {
                                                    if (error.field) {
                                                        formInputErrors[error.field[1]] = error.message
                                                    }
                                                })
                                                actions.setErrors(formInputErrors)
                                            }
                                        })
                                    }
                                }
                                render={({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                    <form onSubmit={handleSubmit}>
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
                                            ? (<button disabled="disabled">Creating Account</button>)
                                            : <button>Sign Up</button>
                                        }
                                    </form>
                                )}
                            />
                        )
                    }}
                </Mutation>
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