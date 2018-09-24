import React from "react";
import { StaticQuery, graphql, Link } from "gatsby"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const GET_PRODUCT = gql`
query($handle: String!) {
    shop {
        products(first:1, query: $handle) {
            edges {
                node {
                    variants(first: 1) {
                        edges {
                            node {
                                availableForSale
                            }
                        }
                    }
                }
            }
        }
    }
}
`

class Product extends React.Component {
    render() {
        const product = this.props.data.shopify.shop.productByHandle

        return (
            <div>
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
                <Query
                  query={GET_PRODUCT}
                  variables={{ handle: product.handle }}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>Error :(</div>

                        return (
                            <>
                                <h3>Stock Status: {data && data.shop.products && data.shop.products.edges[0].node.variants && data.shop.products.edges[0].node.variants.edges[0].node.availableForSale.toString()}</h3>
                            </>
                        )
                    }}
                </Query>
                {product.images && product.images.edges.map((image, i) => {
                    return <img key={i} src={image.node.originalSrc} alt="" />
                })}
                <label>
                    Quantity
                    <input min="1" type="number" defaultValue="1"></input>
                </label>
                <button type="button">Buy Now</button>
            </div>
        )
    }
}

export default Product

export const query = graphql`
query($handle: String!) {
    shopify {
        shop {
            productByHandle(handle: $handle) {
                title
                description
                handle
            }
        }
    }
}
`;
