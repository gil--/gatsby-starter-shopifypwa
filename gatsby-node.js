/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators

    const products = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  products.data.allShopifyProduct.edges.forEach(edge => {
      createPage({
          path: `/products/${edge.node.handle}`,
          component: path.resolve('./src/templates/product.js'),
          context: {
              id: edge.node.id,
          },
      })
  })

  const collections = await graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  collections.data.allShopifyCollection.edges.forEach(edge => {
    createPage({
      path: `/collections/${edge.node.handle}`,
      component: path.resolve('./src/templates/collection.js'),
      context: {
        id: edge.node.id,
      },
    })
  })
}