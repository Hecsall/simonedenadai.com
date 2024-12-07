import Head from 'next/head'
import ErrorPage from 'next/error'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {PortableText, toPlainText} from '@portabletext/react'
import slugify from 'slugify'

import Layout from '@/components/Layout'
import styles from '@/styles/BlogPost.module.scss'
import {getPostAndMorePosts, getAllPostsSlugs} from '@/lib/sanity.client'
import CodeBlock from '@/components/CodeBlock'
import { PostDate } from '@/components/PostDate'
import PostTile from '@/components/PostTile'
import generateSocialImage from '@/lib/generateSocialImage'
import LinkIcon from '@/public/link-icon.svg'


const ptComponents = {
  types: {
    cloudinaryimage: ({ value }) => {
      if(!value?.secure_url) {
        return null
      }
      return (
        <div className="full-image-container mb-3">
          <Image 
            src={value.secure_url} 
            fill={true}
            priority
            alt={value.context?.custom?.alt || ''} 
            sizes="
              (max-width: 575px) 530px,
              (max-width: 767px) 510px,
              (max-width: 991px) 690px,
              (max-width: 1199px) 930px,
              (max-width: 1399px) 740px,
              900px
            "
          />
        </div>
      )
    },
    code: ({ value }) => {
      if (!value?.code && !value?.language) {
        return null
      }

      return (
        <CodeBlock
          code={value.code}
          filename={value.filename}
          highlightedLines={value.highlightedLines}
          language={value.language}
        />
      )
    }
  },
  block: {
    h2: ({children}) => {
      let titleId;
      if (children[0].props?.text) {
        titleId = slugify(children[0].props.text.toLowerCase())
      } else {
        titleId = slugify(children[0].toLowerCase())
      }
      return (
        <h2 id={titleId} className="mt-5 mb-4">
          {children}
          <a href={`#${titleId}`} className="ms-2 p-1 text-white-50" title="Link to this section" aria-label='Link to this section'>
            <LinkIcon />
          </a>
        </h2>
      )  
    }
  }
}


export default function BlogPost({ post, morePosts }) {
  const router = useRouter()

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />
  }

  // og:image generation
  const ogImage = generateSocialImage({
    title: post?.title,
    imagePublicId: post?.cloudinaryimage?.public_id,
  });

  // Remove multiple spaces/newlines for meta description
  const metaDescription = post && toPlainText(post?.body).replace(/\n/gm, ' ').replace(/^\s+|\s+$/gm, '').substring(0,157) + '...'

  return (
    <Layout>
      {router.isFallback ? (
        <></>
      ) : (
        <>
          <Head>
            <title>{post?.title}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={post?.seoKeywords?.join(', ') + ', ' + process.env.NEXT_PUBLIC_COMMON_BLOG_KEYWORDS || ''} />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${router.asPath}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post?.title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
          </Head>
          
          <div className={styles.orangeGradient}></div>
          
          <div className='menu-spacer'></div>

          <div className='container'>
            <div className='col col-12 col-xl-8'>
              <h1 className="">{post?.title}</h1>
              <PostDate date={post?.publishedAt} />

              {
                !!post?.cloudinaryimage && <div className={`cover-image-container mt-4 mb-5 ${styles.coverImage}`}>
                  <Image 
                    src={post?.cloudinaryimage.secure_url} 
                    loading="eager"
                    fill={true}
                    alt=''
                    sizes="
                      (max-width: 575px) 530px,
                      (max-width: 767px) 510px,
                      (max-width: 991px) 690px,
                      (max-width: 1199px) 930px,
                      (max-width: 1399px) 740px,
                      900px
                    "
                  />
                </div>
              }

              <PortableText
                value={post?.body}
                components={ptComponents}
              />

              <div className='row'>
                <div className='h2 mb-4 mt-5'>More posts</div>

                {morePosts.length > 0 && morePosts.map(post => {
                  return <PostTile key={post._id} post={post} morePost />
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}


export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params

  const [{ post, morePosts }] = await Promise.all([
    getPostAndMorePosts(slug), //token
  ])
  
  return {
    props: {
      post,
      morePosts
    }
  }
}


export async function getStaticPaths() {
  const paths = await getAllPostsSlugs()

  return {
    paths,
    fallback: true,
  }
}