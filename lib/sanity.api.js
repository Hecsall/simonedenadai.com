export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const token = process.env.NODE_ENV === 'production' ? undefined : process.env.SANITY_TOKEN

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = process.env.SANITY_API_VERSION || '2023-02-22'
export const useCdn = process.env.SANITY_REVALIDATE_SECRET ? false : process.env.NODE_ENV === 'production'
