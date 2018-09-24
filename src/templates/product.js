import React from "react";
import { StaticQuery, graphql, Link } from "gatsby"


class Product extends React.Component {
    render() {
        const product = this.props.data.shopify.shop.productByHandle

        return (
            <div>
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
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
            }
        }
    }
}
`;
