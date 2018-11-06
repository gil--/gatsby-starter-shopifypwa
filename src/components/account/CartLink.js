import React from 'react'
import { Link } from 'gatsby'
import ContextConsumer from '../../layouts/context'

const CartLink = () => (
    <ContextConsumer>
        {({ set, store }) => {
            return (
                <>
                    &nbsp;
                    <Link
                        to="/cart"
                        onClick={() => {
                            set({
                                isCartOpen: true,
                            })
                        }}
                    >Cart ({store.cartCount})</Link>
                </>
            )
        }}
    </ContextConsumer>
)

export default CartLink