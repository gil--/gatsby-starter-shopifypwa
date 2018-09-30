import React from 'react'
import AccountLayout from '../../components/account/layout'
import ContextConsumer from '../../layouts/context'
import gql from "graphql-tag"
import { Query } from "react-apollo"

const CUSTOMER_INFO = gql`
query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        firstName
        lastName
        email
        phone
        defaultAddress {
            firstName
            lastName
            address1
            address2
            city
            provinceCode
            zip
            country
        }
        createdAt
        acceptsMarketing
        orders(first: 1, reverse: true) {
            edges {
                node {
                    id
                    name
                    orderNumber
                    statusUrl
                    totalPrice
                    customerUrl
                }
            }
        }
    }
}
`

class Account extends React.Component {
    render() {
        return (
            <AccountLayout>
                <h1>Account Dashboard</h1>
                <ContextConsumer>
                    {({ data }) => {
                        return (
                        <Query
                            query={CUSTOMER_INFO}
                            variables={{ customerAccessToken: data.customerAccessToken.accessToken }}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <div>Loading Account Information...</div>
                                if (error) return <div>Error :(</div>

                                const { firstName, lastName, email, phone } = data.customer;

                                return (
                                    <>
                                        Welcome back {firstName} {lastName}!

                                        <h2>Account Info</h2>
                                        <div>
                                            <h3>Email</h3>
                                            {email}
                                        </div>
                                        <div>
                                            <h3>Phone</h3>
                                            {phone}
                                        </div>
                                    </>
                                )
                            }}
                        </Query>
                        )
                    }}
                </ContextConsumer>
            </AccountLayout>
        )
    }
}

export default Account
