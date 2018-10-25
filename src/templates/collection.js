import React from "react";
import { graphql } from "gatsby"
import ProductList from '../components/ProductList'

class Collection extends React.Component {
    state = { }

    render() {
        const { title, description, image, products } = this.props.data.shopify.shop.collectionByHandle

        return (
            <>
                <h1>{title}</h1>
                {image && <img src={image.originalSrc} alt={image.altText || ''} />}
                <div>{description}</div>
                <ProductList products={products} />
            </>
        )
    }
}

export default Collection

export const query = graphql`
query ($handle: String!) {
    shopify {
        shop {
            collectionByHandle(handle: $handle) {
                handle
                title
                description
                image {
                    originalSrc
                    altText
                }
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
                }
            }
        }
    }
}
`;
