import Link from 'next/link'
import Image from 'next/image'
import { PostDate } from './PostDate'
import styles from '@/styles/PostTile.module.scss'


export default function PostTile({ post, latest, latestIndex, morePost }) {
    let columnSizes = 'col-md-6 col-xl-4';
    let sizes = `
        (max-width: 575px) 530px,
        (max-width: 767px) 510px,
        (max-width: 991px) 330px,
        (max-width: 1199px) 450px,
        (max-width: 1399px) 350px,
        430px
    `

    if (latest) {
        columnSizes = 'col-xl-6'
        sizes = `
            (max-width: 575px) 530px,
            (max-width: 767px) 510px,
            (max-width: 991px) 690px,
            (max-width: 1199px) 930px,
            (max-width: 1399px) 540px,
            660px
        `
    }
    if (morePost) {
        columnSizes = 'col-lg-6'
        sizes = `
            (max-width: 575px) 530px,
            (max-width: 767px) 510px,
            (max-width: 991px) 690px,
            (max-width: 1199px) 450px,
            (max-width: 1399px) 3350px,
            435px
        `
    }

    return <>
        <div className={
                `col col-12
                ${columnSizes}
                ${styles['post']} 
                ${latest && styles['latest']}
            `}
        >
            <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                {!!post?.cloudinaryimage && <div className={`cover-image-container ${styles['image']}`}>
                    <Image 
                        src={post.cloudinaryimage.secure_url} 
                        fill={true}
                        alt=''
                        priority={latest ? true : false}
                        sizes={sizes}
                    />
                </div>}
                <div className={styles.content}>
                    <div className={styles.title}>
                        {post.title}
                    </div>
                    <PostDate date={post.publishedAt} dateOnly />
                </div>
            </Link>

        </div>
        {/* Force new grid row after "latest" post */}
        {latest && latestIndex === 1 && <div className='w-100 d-none d-md-block'></div>}
    </>
}