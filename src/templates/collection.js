import React from "react";
import { graphql } from "gatsby"
import ProductList from '../components/ProductList'

class Collection extends React.Component {
    state = { }

    render() {
        const { title, description, image, products } = this.props.data.shopifyCollection

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
    shopifyCollection(handle: {eq: $handle}) {
        handle
        title
        description
        image {
            localFile {
                base
            }
        }
        products {
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
`;
