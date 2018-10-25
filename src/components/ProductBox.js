import React from 'react';
import { Link } from "gatsby"

class ProductBox extends React.Component {
    render() {
        const {
            handle,
            title,
            images,
            priceRange: { minVariantPrice: { currencyCode, amount } }
        } = this.props.product

        const minPrice = new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)

        return (
            <li>
                <Link to={`/products/${handle}`}>
                    {images.edges.length &&
                        <img src={images.edges[0].node.originalSrc}
                            alt={images.edges[0].node.altText || ''}
                            style={{
                                maxWidth: '275px',
                            }}
                        />
                    }
                    {/* images.edges.length && images.edges.length > 1 &&
                        <img src={images.edges[1].node.originalSrc}
                            alt={images.edges[1].node.altText}
                            style={{
                                maxWidth: '275px',
                            }}
                        /> */
                    }
                    <h3>{title}</h3>
                    <div>{`From ${minPrice}`}</div>
                </Link>
            </li>
        )
    }
}

export default ProductBox
