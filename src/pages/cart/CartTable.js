import React from 'react'
import RemoveProduct from './RemoveProduct'

class CartTable extends React.Component {
    render() {
        if (!this.props.products) {
            return <p>Your cart is currently empty.</p>
        }

        let productList = this.props.products.edges.map(({ node }) => (
            <tr key={node.id.toString()}>
                <td>
                    <h3>{node.title}</h3>
                    <p>SKU: {node.variant.sku}</p>
                </td>
                <td>
                    <p>Qty: <input type="number" value={node.quantity} /></p>
                </td>
                <td>
                    <RemoveProduct id={node.id} />
                </td>
            </tr>
        ))

        return (
            <>
                <table style={{
                    display: 'flex',
                    listStyle: 'none',
                    marginLeft: '0',
                    flexWrap: 'wrap',
                }}
                >
                <tbody>
                    {productList}
                </tbody>
                </table>
            </>
        )
    }
}

export default CartTable