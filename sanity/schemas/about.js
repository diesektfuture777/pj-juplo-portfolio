// sanity/schemas/about.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  // Singleton — only one about document
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The bold opening statement on the about page.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item becomes a separate paragraph.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
