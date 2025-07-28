import { createStorefrontApiClient } from '@shopify/storefront-api-client';

import { env } from '$env/dynamic/public';

// Get environment variables (in SvelteKit, use env from $env/dynamic/public for client-side access)
const SHOPIFY_STORE_DOMAIN = env.PUBLIC_SHOPIFY_STORE_DOMAIN || '1pud0w-yx.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '87be33d5546d5dfb3d27b1f4e90fe3bd';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Customer creation mutation for newsletter signup
export const CREATE_CUSTOMER_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        acceptsMarketing
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Function to create a customer and subscribe them to marketing
export async function subscribeToNewsletter(email) {
  try {
    const { data } = await shopifyClient.request(CREATE_CUSTOMER_MUTATION, {
      variables: {
        input: {
          email,
          password: Math.random().toString(36).slice(-12), // Generate random password
          acceptsMarketing: true
        }
      }
    });

    if (data.customerCreate.customerUserErrors.length > 0) {
      // Handle specific errors (like email already exists)
      const errors = data.customerCreate.customerUserErrors;
      if (errors.some(error => error.code === 'TAKEN')) {
        // Email already exists, we can try to update marketing acceptance
        return { success: true, message: 'Email already subscribed' };
      }
      throw new Error(errors.map(error => error.message).join(', '));
    }

    return { 
      success: true, 
      customer: data.customerCreate.customer,
      message: 'Successfully subscribed to newsletter'
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to subscribe to newsletter'
    };
  }
}

// Future ecommerce functions can be added here:

// Get products
export async function getProducts(first = 10) {
  const PRODUCTS_QUERY = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await shopifyClient.request(PRODUCTS_QUERY, {
      variables: { first }
    });
    return data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Get product by handle
export async function getProductByHandle(handle) {
  const PRODUCT_QUERY = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await shopifyClient.request(PRODUCT_QUERY, {
      variables: { handle }
    });
    return data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}