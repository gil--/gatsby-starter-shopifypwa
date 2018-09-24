/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const allProducts = await graphql(`
    {
        shopify {
            shop {
                products(first: 250) {
                    edges {
                        node {
                            handle
                        }
                    }
                }
            }
        }
    }
    `)

    allProducts.data.shopify.shop.products.edges.forEach(edge => {
        createPage({
            path: `/products/${edge.node.handle}`,
            component: path.resolve('./src/templates/product.js'),
            context: {
                handle: edge.node.handle,
            },
        })
    })

//     const collections = await graphql(`
//     {
//       allShopifyCollection {
//         edges {
//           node {
//             id
//             handle
//           }
//         }
//       }
//     }
//   `)

//     collections.data.allShopifyCollection.edges.forEach(edge => {
//         createPage({
//             path: `/collections/${edge.node.handle}`,
//             component: path.resolve('./src/templates/collection.js'),
//             context: {
//                 id: edge.node.id,
//             },
//         })
//     })
}