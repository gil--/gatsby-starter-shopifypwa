require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Bodega Cloud',
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-apollo-shopify',
      options: {
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `json`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `settings`,
        path: `./src/settings/`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'Shopify',
        fieldName: 'shopify',
        url: `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com/api/graphql`,
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        },
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Bodega Cloud',
        short_name: 'Bodega',
        start_url: '/',
        background_color: '#50B83C',
        theme_color: '#50B83C',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
}
