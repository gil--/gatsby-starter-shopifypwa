import React from 'react'
import Link from 'gatsby-link'

class CollectionTemplate extends React.Component {
    render() {
        const collection = this.props.data.shopifyCollection

        return <div>
            <h1>{collection.title}</h1>
            <h2>{collection.descriptionHtml}</h2>

            {collection.products.map((product, i) => {
                return <li><Link to={`/products/${product.handle}`}>{product.title}</Link></li>
            })}
          </div>
    }
}

export default CollectionTemplate

export const pageQuery = graphql`
    query collectionQuery($id: String!) {
        shopifyCollection(id: { eq: $id }) {
            id
            title
            descriptionHtml
            products {
                title
                handle
                images {
                    originalSrc
                }
            }
        }
    }
`
