import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Static Pages Content',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
        defineField({ name: 'heading', title: 'Main Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
        defineField({ name: 'content', title: 'Main Content', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'secondaryContent', title: 'Secondary Content', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'image', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    ],
})
