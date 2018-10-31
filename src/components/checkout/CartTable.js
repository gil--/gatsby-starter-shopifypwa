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
                    <ul>
                        <li>SKU: {node.variant.sku}</li>
                        {
                            node.variant.selectedOptions.map(option => {
                                return <li>{option.name}: {option.value}</li>;
                            })
                        }
                    </ul>
                </td>
                <td>
                    <p>Qty: <input type="number" value={node.quantity} /></p>
                </td>
                <td>
                    <p>{node.variant.price}</p>
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
                    flexWrap: 'wrap',
                }}
                >
                    <tbody style={{
                        width: '100%'
                    }}>
                        {productList}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Subtotal</td>
                            <td>{this.props.subtotalPrice ? this.props.subtotalPrice : '0.00'}</td>
                        </tr>
                        <tr>
                            <td>Taxes</td>
                            <td>{this.props.totalTax ? this.props.totalTax : '0.00'}</td>
                        </tr>
                        <tr>
                            <td>Grand Total</td>
                            <td>{this.props.totalPrice ? this.props.totalPrice : '0.00'}</td>
                        </tr>
                    </tfoot>
                </table>
            </>
        )
    }
}

export default CartTable