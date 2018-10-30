import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import ContextConsumer from '../layouts/context'

const ADD_TO_CART = gql`
    mutation AddToCart ($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkoutUserErrors {
                message
                field
            }
            checkout {
                id
                webUrl
                lineItems(first: 5) {
                    edges {
                        node {
                            title
                            quantity
                        }
                    }
                }
            }
        }
    }
`

const ADD_TO_EXISTING_CART = gql`
mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
        userErrors {
            field
            message
        }
        checkout {
            id
            webUrl
            lineItems(first: 5) {
                edges {
                    node {
                        title
                        quantity
                    }
                }
            }
        }
    }
}
`

class AddToCart extends React.Component {
    render() {
        return (
            <ContextConsumer>
                {({ set, store }) => {
                    return <Mutation
                        mutation={store.checkout.id ? ADD_TO_EXISTING_CART : ADD_TO_CART}
                        onError={this.error}
                        onCompleted={res => {
                            console.log(res)
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

                                        if (store.checkout.id) {
                                            mutationInput.checkoutId = store.checkout.id

                                            addToCart({
                                                variables: mutationInput
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
                }}
            </ContextConsumer>
        )
    }
}

export default AddToCart