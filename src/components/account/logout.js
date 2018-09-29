import React from 'react'
import { Link, navigate } from 'gatsby'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'
import ContextConsumer from '../../layouts/context'

const CUSTOMER_LOGOUT = gql`
mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        userErrors {
            field
            message
        }
        deletedAccessToken
        deletedCustomerAccessTokenId
    }
}
`

class Logout extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {({ data, set }) => {
                    return (
                    <Mutation
                        mutation={CUSTOMER_LOGOUT}
                        onError={this.error}
                        onCompleted={data => {
                            if (data.customerAccessTokenDelete.userErrors.length) return

                            set({
                                customerAccessToken: '',
                                cart: '',
                            })

                            // TODO: also clear localstorage (including cart, etc.)

                            navigate('/account/login')
                        }}
                    >
                        {(customerLogout, { loading }) => {
                            return <Link
                                to="/account/login"
                                onClick={e => {
                                    e.preventDefault()

                                    // delete the Shopify customer token
                                    customerLogout({
                                        variables: {
                                            "customerAccessToken": data.customerAccessToken.accessToken,
                                        }
                                    })
                                }}
                            >
                                Log Out
                            </Link>
                        }}
                    </Mutation>
                    )
                }}
            </ContextConsumer>
        )
    }
}

export default Logout