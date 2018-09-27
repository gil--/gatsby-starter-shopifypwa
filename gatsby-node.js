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
    let allProducts = []
    const productLimitPerQuery = 250;

    const getMoreProducts = async function (currentCursor) {
        const productsCache = await graphql(`
            query getAllProducts($previousProduct: String!, $limit: Int!) {
                shopify {
                    shop {
                        products(first: $limit, after: $previousProduct) {
                            edges {
                                cursor
                                node {
                                    handle
                                }
                            }
                            pageInfo {
                                hasNextPage
                            }
                        }
                    }
                }
            }
            `,
            {
                "previousProduct": currentCursor,
                "limit": productLimitPerQuery,
            }
        )

        // add returned paginated products to all products
        allProducts = allProducts.concat(productsCache.data.shopify.shop.products.edges)

        if (productsCache.data.shopify.shop.products.pageInfo.hasNextPage) {
            await getMoreProducts(currentCursor = productsCache.data.shopify.shop.products.edges[productsCache.data.shopify.shop.products.edges.length - 1].cursor)
        }
    }

    const productsCache = await graphql(`
        query getAllProducts($limit: Int!) {
            shopify {
                shop {
                    products(first: $limit) {
                        edges {
                            cursor
                            node {
                                handle
                            }
                        }
                        pageInfo {
                            hasNextPage
                        }
                    }
                }
            }
        }
        `,
        {
            "limit": productLimitPerQuery,
        }
    )

    // add returned paginated products to all products
    allProducts = allProducts.concat(productsCache.data.shopify.shop.products.edges)

    // if there's more products, grab next 250 products
    if (productsCache.data.shopify.shop.products.pageInfo.hasNextPage) {
        await getMoreProducts(currentCursor = productsCache.data.shopify.shop.products.edges[productsCache.data.shopify.shop.products.edges.length - 1].cursor)
    }

    allProducts && allProducts.forEach(product => {
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
        shopify {
            shop {
                collections(first: 250) {
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

    allCollections && allCollections.data.shopify.shop.collections.edges.forEach(edge => {
        createPage({
            path: `/collections/${edge.node.handle}`,
            component: path.resolve('./src/templates/collection.js'),
            context: {
                handle: edge.node.handle,
            },
        })
    })
}