# gatsby-starter-shopifypwa

## Shopify PWA powered by Gatsby

This will be a POC Shopify PWA using the Storefront API & GatsbyJS.

## Install

### ENV

Copy .env.sample to .env.development and change the items to match your store. Make sure to add all .env keys and values in Netlify

### Webhooks

Setup webhooks with Netlify to auto-deploy after product creation, update, and deletion.

1. Got to https://app.netlify.com/sites/MY_NETLIFY_APP/settings/deploys
2. Scroll down to **Build Hooks** and click the *Add build hook* button.
3. Create a new Build Hook such as **Shopify Product Update**.
4. Go to `https://YOUR_STORE_NAME.myshopify.com/admin/settings/notifications` and scroll down to Webhooks. Select **Create webhook** and for Event select *Product update* for example.
5. For the URL, enter the one Netlify gave you in step 3.
6. You can test the Webhook by clicking the **Send test notification** link and you should see a new build begin in Netlify.
7. Repeat steps 1 through 6 for any additional Shopify Events that should trigger a new build.

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gil--/gatsby-starter-shopifypwa)
