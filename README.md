# Bodega Cloud

A Gatsby Shopify starter

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Edit gatsby-starter-shopify](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/98rxxwxj1w)

## Bodega Cloud powered by Gatsby, Netlify, & Shopify

This will be a POC Shopify PWA using the Storefront API & GatsbyJS.

## High Level Project Goals

### Speed

Should be as fast but ideally, faster than a normal Shopify experience - especially for slower connection due to service worker.

### Highly Customizable Theme and Settings

There should be a number of ways to customize the theme without touching the code such as colors, typography, and settings (show breadcrumbs?, etc.)

### Accessible

Out-of-box, the site should be WCAG 2.0 accessible. This means aria tags where needed, AA color contrast, and keyboard accessible navigation with focus styling. This includes things like the gallery.

### Code Complete with regular Shopify themes

Should strive to offer the same features as a normal Shopify theme such as easy homepage section content, all the normal content types. See [this list of issues](https://github.com/gil--/gatsby-starter-shopifypwa/issues/4) which might prevent code complete.

## Install

### ENV

Copy .env.sample to .env.development and change the items to match your store. Make sure to add all .env keys and values in Netlify

### Emails

#### Customer Active

When sending a customer an active email (invite email), the template utilizes a url pattern that does not currently work with Shopify PWA. To simplify setup, change the following items in the *Customer account invite* email notification template (**Settings > Notifications > Customer Account > Customer account invite** or https://YOUR_STORE_NAME.myshopify.com/admin/email_templates/customer_account_activate/edit):

```diff
-<td class="button__cell"><a href="{{ customer.account_activation_url }}" class="button__text">Activate your account</a></td>
+{% assign url_parts = customer.account_activation_url  | split: '/' %}
+<td class="button__cell"><a href="{{shop.url}}/account/activate?id={{url_parts[5]}}&token={{url_parts[6]}}" class="button__text">Activate your account</a></td>
```

#### Password Reset

Shopify Password Resets urls do not currently work with the Storefront API and are also presented in a sturcture that requires custom Server-Side Routing. To simplify setup, change the following items in the *Customer account password reset* email notification template (**Settings > Notifications > Customer Account > Customer account password reset** or https://YOUR_STORE_NAME.myshopify.com/admin/email_templates/customer_account_reset/edit):

```diff
-<td class="button__cell"><a href="{{customer.reset_password_url}}" class="button__text">Reset your password</a></td>
+{% assign url_parts = customer.reset_password_url  | split: '/' %}
+<td class="button__cell"><a href="{{shop.url}}/account/reset?id={{url_parts[5]}}&token={{url_parts[6]}}" class="button__text">Reset your password</a></td>
```

We're basically splitting the reset password url into URL parameters which will make it MUCH easier for Gatsby to understand.

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

### Instructions

1. Have your Shopify store name (If it's https://shopifypwa.myshopify.com, the store name would be **shopifypwa**) and [access token ready](https://www.shopify.com/partners/blog/17056443-how-to-generate-a-shopify-api-token). Enter those as the environment variables after clicking the deploy button above.
2. Enable Netlify Identity in order to enable the Admin CMS. Go to `https://app.netlify.com/sites/YOURAPPNAME/identity` and click **Enable Identity**.

## Features (WIP)

The following are planned features. Many of these are not planned for the initial release.

- ✅ Works Offline (Service Workers)
- ✅ Registration & Logic
- ✅ Shopify Product Pages
- ✅ Shopify Collection Pages
- [ ] Native-Like Homepage Sections
- [ ] Page Builder (Easily Build CMS Pages & Category Landing Pages)
- [ ] Theme Customizer (Colors, Typography, Basic Theme Features On/Off)
- [ ] Excellent SEO
- [ ] Rich-Media Cards (Twitter, Facebook)
- [ ] OOB Analytics Support (GA Ecommerce, GTM)
- [ ] WCAG AA Accessible
- [ ] PWA Functionality (Offline, Notifications, Manifest)
- [ ] Advanced Search (3rd Party Integration)
- [ ] WebPayments API Support? Shopify Dynamic Checkout?
- [ ] AR Product Support
- [ ] Advance Related Products
- [ ] 3rd Party Reviews Support
- [ ] 3rd Party Chat Support
- [ ] Mega Menu
- [ ] Login/Registration (My Orders)
- [ ] Order Status Lookup
- [ ] FAQ Page Template (w/ Typeahead search)
