import React from 'react'
import { Link } from 'gatsby'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ContextConsumer from '../../layouts/context'
import CartTable from '../../components/checkout/CartTable'
import { ReturnFieldsCheckout } from '../../helpers/gqlFragments'

const CART_ITEMS = gql`
    query checkoutQuery($id: ID!) {
        node(id: $id) {
            ... on Checkout {
                ...ReturnFieldsCheckout
            }
        }
    }
    ${ReturnFieldsCheckout}
`

const emptyCart = (<>
    <p>Your cart is currently empty.</p>
    <Link to={`/`}>Continue Shopping</Link>
</>)

const checkoutUrl = (storeProvider) => {
    let url = storeProvider.checkout.webUrl

    if (storeProvider.customerAccessToken) {
        url += `?customer_access_token=${storeProvider.customerAccessToken.accessToken}`
    }

    return url;
}

const Cart = () => (
    <>
        <h1>Your Cart</h1>
        <ContextConsumer>
            {({ store }) => {
                if (!store.checkout || store.cartCount === 0) {
                    return emptyCart
                }

                return (
                    <>
                        <CartTable
                            products={store.checkout.lineItems}
                            subtotalPrice={store.checkout.subtotalPrice}
                            totalTax={store.checkout.totalTax}
                            totalPrice={store.checkout.totalPrice}
                        />
                        <Link to={`/`}>Continue Shopping</Link>
                        <br/>
                        <a href={checkoutUrl(store)}>Go to Checkout</a>
                    </>
                )
            }}
        </ContextConsumer>
    </>
)

export default Cart
