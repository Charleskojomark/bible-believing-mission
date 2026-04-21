import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Events',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Event Title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'date', title: 'Event Date (e.g. OCT 22)', type: 'string' }),
        defineField({ name: 'time', title: 'Event Time', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'image', title: 'Event Banner', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'isWeeklyService', title: 'Is this a weekly service?', type: 'boolean' }),
        defineField({ name: 'serviceType', title: 'Service Format', type: 'string' }),
    ],
})
