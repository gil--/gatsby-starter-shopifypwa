import React from "react";
import Link from "gatsby-link";

export default ({data, shopifyClient}) => {
  const product = data.shopifyProduct

  return (
    <div>
      {/* TODO: Move to Component */}
      {true ? (
        <ol itemScope itemType="http://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <Link to="/" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <span itemProp="name">{product.title}</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      ) : (
        ''
      )}
      <h1>{product.title}</h1>
      <h2>{product.description}</h2>
      {product.images.map((image, i) => {
        return <img key={i} src={image.originalSrc} alt="" />
      })}
      <label>
        Quantity
        <input min="1" type="number" defaultValue="1"></input>
      </label>
      <button
        onClick={() => handleAddToCart(product, shopifyClient)}
      >
        Buy Now
      </button>
    </div>
  )
}

function handleAddToCart(product, shopifyClient) {
  shopifyClient.checkout
    .create()
    .then(checkout => {
      const lineItemsToAdd = [
        { variantId: product.variants[0].shopifyId, quantity: parseInt(1, 10) },
      ]

      shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd)
        .then(checkout => {
          const { webUrl } = checkout
          window.location = webUrl
        })
        .catch((e) => {
          console.log('Checkout failed...')
        })
    })
}

export const pageQuery = graphql`
    query productQuery($id: String!) {
        shopifyProduct(id: { eq: $id }) {
            id
            shopifyId
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
`;
