import React from 'react';
import { Link } from "gatsby"

class ProductBox extends React.Component {
    render() {
        const {
            handle,
            title,
            images,
            priceRange,
        } = this.props.product

        let minPrice = null;

        if (priceRange) {
            const { minVariantPrice: { currencyCode, amount } } = priceRange;
            minPrice = new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
        }

        return (
            <li>
                <Link to={`/products/${handle}`}>
                    {images &&
                        <img src={images[0].originalSrc}
                            alt={images[0].altText || ''}
                            style={{
                                maxWidth: '275px',
                            }}
                        />
                    }
                    <h3>{title}</h3>
                    <div>{minPrice && `From ${minPrice}`}</div>
                </Link>
            </li>
        )
    }
}

export default ProductBox
