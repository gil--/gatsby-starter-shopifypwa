import React from 'react';
import ProductBox from './ProductBox'

class ProductList extends React.Component {
    render() {
        let productList = this.props.products.edges.map(({ node }) =>
            (<ProductBox key={node.id.toString()} product={node} />)
        )

        return (
            <>
                <ul>
                    {productList}
                </ul>
            </>
        )
    }
}

export default ProductList