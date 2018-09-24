import React from 'react'
import { graphql, Link } from 'gatsby'

class Products extends React.Component {
    render() {
        //const products = get(this, 'props.data.allContentfulPost.edges').map(post => post.node)
        const products = this.props.data.shopify.shop.products

        return (
            <div>
                <h1>All Products</h1>
                <ul>
                    {products.edges.map((productEdge, i) => {
                        const product = productEdge.node
                        return <li key={i}><Link to={`/products/${product.handle}`}>{product.title}</Link></li>
                    })}
                </ul>
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
                        title
                        handle
                    }
                }
            }
        }
    }
}
`
