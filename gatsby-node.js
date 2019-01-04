/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    /**********************
        PRODUCTS
    ***********************/
    const allProducts = await graphql(`
    {
        allShopifyProduct {
            edges {
                node {
                    handle
                }
            }
        }
    }
    `)

    allProducts && allProducts.data.allShopifyProduct.edges.forEach(product => {
        createPage({
            path: `/products/${product.node.handle}`,
            component: path.resolve('./src/templates/product.js'),
            context: {
                handle: product.node.handle,
            },
        })
    })

    /**********************
        COLLECTIONS
    ***********************/
    const allCollections = await graphql(`
    {
        allShopifyCollection {
            edges {
                node {
                    handle
                }
            }
        }
    }
  `)

    allCollections && allCollections.data.allShopifyCollection.edges.forEach(collection => {
        createPage({
            path: `/collections/${collection.node.handle}`,
            component: path.resolve('./src/templates/collection.js'),
            context: {
                handle: collection.node.handle,
            },
        })
    })
}