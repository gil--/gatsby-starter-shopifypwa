import React from "react";
import Link from "gatsby-link";

class ProductTemplate extends React.Component {
  render() {
    const product = this.props.data.shopifyProduct;

    return (
      <div>
        {/* TODO: Move to Component */}
        {true ? (
          <ol itemscope itemtype="http://schema.org/BreadcrumbList">
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="http://schema.org/ListItem"
            >
              <Link to="/" itemprop="item">
                <span itemprop="name">Home</span>
              </Link>
              <meta itemprop="position" content="1" />
            </li>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="http://schema.org/ListItem"
            >
              <span itemprop="name">{product.title}</span>
              <meta itemprop="position" content="2" />
            </li>
          </ol>
        ) : (
            ""
          )}
        <h1>{product.title}</h1>
        <h2>{product.description}</h2>
        {product.images.map((image, i) => {
          return <img key={i} src={image.originalSrc} alt="" />;
        })}
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
            descriptionHtml
            images {
                id
                originalSrc
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
`;
