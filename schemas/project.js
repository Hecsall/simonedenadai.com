import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'string',
      hidden: true
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'personal',
      title: 'Is Personal',
      type: 'boolean',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: "cloudinaryimage",
      type: "cloudinary.asset",
      title: "Cloudinary Image",
      description: "Asset served from Cloudinary",
      validation: Rule => Rule.required(),
    }),
  ],
})
