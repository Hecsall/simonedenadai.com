import { groq } from 'next-sanity'


const postTileFields = groq`
    _id,
    title,
    publishedAt,
    cloudinaryimage,
    "slug": slug.current,
    "authorName": author->name,
    "categories": categories[]->title,
`


const postFields = groq`
    _id,
    title,
    publishedAt,
    cloudinaryimage,
    "slug": slug.current,
    "authorName": author->name,
    "categories": categories[]->title,
    "seoKeywords": seoKeywords[],
    body
`


const projectFields = groq`
    _id,
    title,
    personal,
    body,
    url,
    cloudinaryimage,
    "categories": categories[]->title
`

export const allPostsQuery = groq`
    // *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    *[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
        ${postTileFields}
    }
`

export const allProjectsQuery = groq`
    // *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    *[_type == "project"] | order(orderRank) {
        ${projectFields}
    }
`

export const postSlugsQuery = groq`
    *[_type == "post" && defined(slug.current)][].slug.current
`


export const postAndMorePostsQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`