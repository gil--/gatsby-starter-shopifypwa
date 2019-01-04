import React from 'react'
import { graphql, Link } from 'gatsby'
import ProductList from '../components/ProductList'
class Products extends React.Component {
    render() {
        const products = this.props.data.allShopifyProduct

        return (
            <div>
                <h1>All Products</h1>
                <ProductList products={products}
                    style={{
                        display: 'grid',
                    }}
                />
            </div>
        )
    }
}

export default Products

export const query = graphql`
    query productsQuery {
        allShopifyProduct {
            edges {
                node {
                    id
                    handle
                    title
                    priceRange {
                        minVariantPrice {
                            currencyCode
                            amount
                        }
                    }
                    images {
                        originalSrc
                    }
                }
            }
        }
    }
`
