import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {StarIcon} from '@sanity/icons'
import {visionTool} from '@sanity/vision'
import { apiVersion, dataset, projectId } from '@/lib/sanity.api'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'
import {orderableDocumentListDeskItem, orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'


export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'simonedenadai.com',
  projectId,
  dataset,

  plugins: [
    deskTool({
      structure: (S, context) => {
        return  S.list()
        .title('Content')
        .items([
          S.documentTypeListItem('post'),
          orderableDocumentListDeskItem({
            type: 'project',
            title: 'Projects',
            icon: StarIcon,
            id: 'orderable-projects',
            S, 
            context
          }),
          S.documentTypeListItem('author'),
          S.documentTypeListItem('category'),

        ])
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    cloudinarySchemaPlugin()
  ],

  schema: {
    types: [
      ...schemaTypes, 
      {
        name: "ordered-project",
        title: "Project",
        type: "document",
        orderings: [orderRankOrdering],
        fields: [
          orderRankField({ type: "project" }),
        ],
      },
    ]
  },
})
