import React from 'react'
import gql from 'graphql-tag'
import { Mutation, compose } from 'react-apollo'
import ContextConsumer from '../layouts/context'
import { ReturnFieldsCheckout } from '../helpers/gqlFragments'
import { getSetting } from '../helpers/settings';
import { StaticQuery, graphql } from 'gatsby';

const ADD_TO_CART = gql`
    mutation AddToCart ($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkoutUserErrors {
                message
                field
            }
            checkout {
                ...ReturnFieldsCheckout
            }
        }
    }
    ${ReturnFieldsCheckout}
`

const ADD_TO_EXISTING_CART = gql`
    mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
        checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
            userErrors {
                field
                message
            }
            checkout {
                ...ReturnFieldsCheckout
            }
        }
    }
    ${ReturnFieldsCheckout}
`

const ASSOCIATE_CUSTOMER_CHECKOUT = gql`
    mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
        checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            userErrors {
                field
                message
            }
            checkout {
                ...ReturnFieldsCheckout
            }
            customer {
                id
            }
        }
    }
    ${ReturnFieldsCheckout}
`

class AddToCart extends React.Component {
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query settings {
                        allFile (filter: {
                            name: { eq: "products" }
                            sourceInstanceName: { eq : "settings" }
                        }) {
                            edges {
                                node {
                                    childJson {
                                        canAdd
                                    }
                                }
                            }
                        }
                    }
                `}
                render={data => {
                    const canAddtoCart = getSetting(data, 'canAdd');
                    if (!canAddtoCart) {
                        return null;
                    }

                    return (
                        <ContextConsumer>
                            {({ set, store }) => {
                                return (
                                <Mutation
                                    mutation={ASSOCIATE_CUSTOMER_CHECKOUT}
                                >
                                    {(associateCustomer) => <Mutation
                                        mutation={(store.checkout && store.checkout.id) ? ADD_TO_EXISTING_CART : ADD_TO_CART}
                                        onError={this.error}
                                        onCompleted={res => {
                                            let { checkout } = res.checkoutLineItemsAdd || res.checkoutCreate
                                            if (checkout.webUrl !== undefined) {
                                                set({
                                                    checkout: checkout,
                                                    cartCount: store.cartCount + parseInt(this.props.quantity),
                                                })
                                            }
                                        }
                                    }>
                                    {(addToCart, {loading}) => {
                                        if (loading) return <button type="button" disabled="disabled">Adding to Cart</button>

                                        return (
                                            <button
                                                type="button"
                                                onClick={e => {
                                                    e.preventDefault()

                                                    let mutationInput = {
                                                        lineItems: [
                                                            { quantity: parseInt(this.props.quantity), variantId: this.props.variantId },
                                                        ]
                                                    }

                                                    if (store.checkout && store.checkout.id) {
                                                        mutationInput.checkoutId = store.checkout.id

                                                        addToCart({
                                                            variables: mutationInput
                                                        }).then(res => {
                                                            if (!res.data.checkoutLineItemsAdd.userErrors.length
                                                                && store.customerAccessToken) {
                                                                associateCustomer({
                                                                    variables: {
                                                                        checkoutId: res.data.checkoutLineItemsAdd.checkout.id,
                                                                        customerAccessToken: store.customerAccessToken.accessToken,
                                                                    }
                                                                })
                                                            }
                                                        })

                                                    } else {
                                                        addToCart({
                                                            variables: {
                                                                input: {
                                                                    lineItems: [
                                                                        { quantity: parseInt(this.props.quantity), variantId: this.props.variantId },
                                                                    ]
                                                                }
                                                            }
                                                        })
                                                    }

                                                }}
                                            >Add to Cart</button>
                                        )
                                    }
                                }
                                </Mutation>
                                }
                                </Mutation>
                                )
                            }}
                        </ContextConsumer>
                )}}
            />
        )
    }
}

export default AddToCart