import React from 'react'
import Link from 'gatsby-link'

class Products extends React.Component {
  render() {
    //const products = get(this, 'props.data.allContentfulPost.edges').map(post => post.node)
    const products = this.props.data.allShopifyProduct

    console.log(products);

    return (
      <div>
        <h1>All Products</h1>
        <ul>
          {products.edges.map((productEdge, i) => {
            const product = productEdge.node
            return <li key={i}><Link to={`/products/${product.handle}`}>{product.title}</Link></li>
          })}
        </ul>
        <Link to="/">Go back to the homepage</Link>
      </div>
    )
  }
}

export default Products

export const pageQuery = graphql`
  query productsQuery {
    allShopifyProduct(limit: 12) {
      edges {
        node {
          id
          shopifyId
          title
          vendor
          tags
          description
          descriptionHtml
          handle
          images {
            id
            originalSrc
            altText
          }
          extras {
            minPrice
            maxPrice
          }
          productType
          options {
            name
            id
          }
          variants {
            price
            id
            shopifyId
            title
            sku
            availableForSale
            image {
              id
              originalSrc
            }
          }
        }
      }
    }
  }
`
