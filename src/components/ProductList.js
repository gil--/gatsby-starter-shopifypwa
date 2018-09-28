import React from 'react';
import ProductBox from './ProductBox'

class ProductList extends React.Component {
    render() {
        let productList = this.props.products.edges.map(({ node }) =>
            (<ProductBox key={node.id.toString()} product={node} />)
        )

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