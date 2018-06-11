import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Client from 'shopify-buy'

import Header from '../components/header'
import './index.css'

const shopifyClient = Client.buildClient({
  domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
})

const Layout = ({ children, data, ...props }) => (
  <div>
    <Helmet
      title="Shopify PWA"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle="Shopify PWA" />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {React.cloneElement(children({ ...props, shopifyClient }))}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
