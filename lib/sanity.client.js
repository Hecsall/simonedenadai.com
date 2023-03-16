import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, token } from '@/lib/sanity.api'
import {
    allPostsQuery,
    allProjectsQuery,
    postAndMorePostsQuery,
    postSlugsQuery,
} from '@/lib/sanity.queries'


export const client = projectId ? createClient({ projectId, dataset, apiVersion, useCdn, token: token || undefined }) : null


export async function getAllPosts() {
    if (client) {
      return (await client.fetch(allPostsQuery)) || []
    }
    return []
}

export async function getAllProjects() {
    if (client) {
      return (await client.fetch(allProjectsQuery)) || []
    }
    return []
}

export async function getAllPostsSlugs() {
    if (client) {
      const slugs = (await client.fetch(postSlugsQuery)) || []
      return slugs.map((slug) => `/blog/${slug}`)
    }
    return []
}

export async function getPostAndMorePosts(slug) {
    if (projectId) {
        return await client.fetch(postAndMorePostsQuery, { slug })
    }
    return { post: null, morePosts: [] }
}
  