import React from 'react';
import ProductBox from './ProductBox'

class ProductList extends React.Component {
    render() {
        if (!this.props.products) {
            return (
                <p>No products found.</p>
            )
        }

        let productList = this.props.products.map((product, key) => {
            if (product.edge) {
                product = product.edge;
            }

            return (
                <ProductBox key={product.id && product.id.toString() || key} product={product} />
            )
        })

        return (
            <>
                <ul style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
                        gridGap: '10px',
                        listStyle: 'none',
                    }}
                >
                    {productList}
                </ul>
            </>
        )
    }
}

export default ProductList