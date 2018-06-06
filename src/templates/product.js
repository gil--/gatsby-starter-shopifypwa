import React from "react";

class ProductTemplate extends React.Component {
    render() {
        const product = this.props.data.shopifyProduct;

        return (
            <div>
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
            </div>
        );
    }
}

export default ProductTemplate;

export const pageQuery = graphql`
    query productQuery($id: String!) {
        shopifyProduct(id: { eq: $id }) {
            id
            title
            vendor
            tags
            description
            productType
        }
    }
`

