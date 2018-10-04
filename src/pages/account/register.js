import React from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import { Link, navigate } from 'gatsby'
import GuestLayout from '../../components/account/GuestLayout'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { parseErrors } from '../../helpers/formErrors'
import PasswordInput from '../../components/form/PasswordInput'

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

const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is Required'),
    password: Yup.string()
        .required('Password is Required'),
})

class Register extends React.Component {
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
                                validationSchema={FormSchema}
                                onSubmit={
                                    (values, actions) => {
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
                                                const errors = parseErrors(res.data.customerCreate.customerUserErrors)
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
                                                <label htmlFor="loginEmail">Email</label>
                                                <input id="loginEmail" type="email" name="email" value={values.email} onChange={handleChange} placeholder="email@gmail.com" required="" ref={this.firstInput} />
                                                <ErrorMessage component="div" name="email" />
                                            </li>
                                            <li>
                                                <label htmlFor="loginPassword">Password</label>
                                                <PasswordInput id="loginPassword" name="password" value={values.password} onChange={handleChange} required="" />
                                                <ErrorMessage component="div" name="password" />
                                            </li>
                                        </ul>
                                        {
                                            (loading)
                                            ? <button disabled="disabled">Creating Account...</button>
                                            : <button disabled={
                                                isSubmitting ||
                                                !!(errors.email && touched.email) ||
                                                !!(errors.password && touched.password)
                                                }>Sign Up</button>
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