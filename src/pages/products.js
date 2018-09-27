import React from 'react'
import { graphql, Link } from 'gatsby'
import ProductList from '../components/ProductList'
class Products extends React.Component {
    render() {
        const products = this.props.data.shopify.shop.products

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
    shopify {
        shop {
            products(first: 20) {
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
                        images(first: 2) {
                            edges {
                                node {
                                    originalSrc
                                    altText
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }
}
`
