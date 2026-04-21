import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'founder',
    title: 'Founder Profile',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'title', title: 'Title / Alias', type: 'string' }),
        defineField({ name: 'bio', title: 'Biography', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'quote', title: 'Featured Quote', type: 'string' }),
        defineField({ name: 'image', title: 'Portrait Image', type: 'image', options: { hotspot: true } }),
    ],
})
