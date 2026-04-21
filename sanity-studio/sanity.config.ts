import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './schema'

export default defineConfig({
    basePath: '/',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your_project_id_here',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    schema,
    plugins: [
        structureTool(),
        visionTool({ defaultApiVersion: '2023-05-03' }),
    ],
})
