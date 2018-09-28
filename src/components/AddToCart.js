import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo'

const ADD_TO_CART = gql`
    mutation AddToCart ($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            userErrors {
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

class AddToCart extends React.Component {
    render() {
        return (
            <>
                <Mutation
                    mutation={ADD_TO_CART}
                    onError={this.error}
                    onCompleted={data => {
                        if (data.checkoutCreate.checkout.webUrl !== undefined) {
                            window.location = data.checkoutCreate.checkout.webUrl
                        }
                    }
                }>
                    {(addToCart) => (
                        <button
                            type="button"
                            onClick={e => {
                                e.preventDefault()
                                addToCart({
                                    variables: {
                                        input: {
                                            lineItems: [
                                                { quantity: parseInt(this.props.quantity), variantId: this.props.variantId },
                                            ]
                                        }
                                    }
                                })
                            }}
                        >Buy Now</button>
                )}
                </Mutation>
            </>
        )
    }
}

export default AddToCart