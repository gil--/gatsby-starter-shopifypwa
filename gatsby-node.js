/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators

    const pages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            descriptionHtml
            handle
            title
          }
        }
      }
    }
  `)

    pages.data.allShopifyProduct.edges.forEach(edge => {
        console.log(edge.node.id);
        console.log(edge.node.title)
        createPage({
            path: `/${edge.node.handle}`,
            component: path.resolve('./src/templates/product.js'),
            context: {
                id: edge.node.id,
            },
        })
    })
}