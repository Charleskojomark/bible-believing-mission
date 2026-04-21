import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'sermon',
    title: 'Sermons',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Sermon Title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'speaker', title: 'Speaker', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({
            name: 'type', title: 'Type', type: 'string',
            options: { list: [{ title: 'Video', value: 'video' }, { title: 'Audio', value: 'audio' }] },
            validation: (rule) => rule.required(),
        }),
        defineField({ name: 'videoUrl', title: 'Video / YouTube URL', type: 'url' }),
        defineField({ name: 'date', title: 'Date Preached', type: 'date' }),
        defineField({ name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true } }),
    ],
})
