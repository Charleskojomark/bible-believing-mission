import { createClient, SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Only create a real client when a valid project ID is configured
export const client: SanityClient | null = projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion: '2023-05-03',
        useCdn: true,
    })
    : null
