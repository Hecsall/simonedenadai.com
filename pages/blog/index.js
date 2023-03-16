import Head from 'next/head'

import styles from '@/styles/Blog.module.scss'
import Layout from '@/components/Layout'
import PostTile from '@/components/PostTile'
import {getAllPosts} from '@/lib/sanity.client'


export default function Blog({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Simone's personal blog" />
      </Head>

      <div className={styles.greenGradient}></div>
      <div className={styles.blueGradient}></div>

      <div className='menu-spacer'></div>

      <div className='container'>
        <div className={`row align-content-center`}>
          <div className={`col col-12 ${styles.hero}`}>
            <h1 className='mb-5'>Blog</h1>
          </div>
        </div>


        <div className={`row align-content-center`}>

          {posts.length > 0 ? (
            <>
              {posts.length > 0 && posts.map((post) => {
                if (post.slug) {
                  if (posts.indexOf(post) == 0 || posts.indexOf(post) == 1) {
                    // Latest 2 posts
                    return <PostTile key={post._id} post={post} latest={true} latestIndex={posts.indexOf(post)} />
                  } else {
                    // All other posts
                    return <PostTile key={post._id} post={post} />
                  }             
                }
              })}
            </>
          ) : (
            <>
              <div className='h5'>
                Nothing to see here, for now.
              </div>
            </>
          )}

        </div>


      </div>
    </Layout>
  )
}


export async function getStaticProps() {
  const [posts = []] = await Promise.all([
    getAllPosts(),
  ])

  return {
    props: {
      posts
    }
  }
}
