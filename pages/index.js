import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

import SliderArrowPrev from '@/public/slider-arrow-prev.svg'
import SliderArrowNext from '@/public/slider-arrow-next.svg'

import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'
import Layout from '@/components/Layout'
import BlogIcon from '@/public/blog-icon.svg'
import {getAllProjects} from '@/lib/sanity.client'

export default function Home({ projects }) {
  const [activeProject, setActiveProject] = useState(projects[0])

  function handleSlideChange(swiper) {
    const newSlide = swiper.slides[swiper.activeIndex]
    const projectObj = {
      title: newSlide.dataset['projectTitle'],
      body: newSlide.dataset['projectBody'],
      url: newSlide.dataset['projectUrl']
    }
    setActiveProject(projectObj)
  }

  return (
    <Layout>
      <div className={styles.grayGradient}></div>
      <div className={styles.purpleGradient}></div>

      <div className='container'>

        <div className={`row align-content-center ${styles['hero-row']}`}>
          <div className={`col col-sm-12 col-md-10 offset-md-1 ${styles.hero}`}>
            <div>Hey there, I&apos;m</div>
            <h1>Simone.</h1>
            <div>I&apos;m a Web Developer from Venice</div>
          </div>

          <div className={styles[`mouse-animation`]}>
              <div className={styles[`mouse`]}></div>
              <span>Scroll Down</span>
          </div>
        </div>


        <div className={`row justify-content-center ${styles.lead}`}>
          <div className={`col col-sm-12 col-md-7 text-center`}>
            <p>
              Passionate about technology, every moment is a good to try out something brand new, 
              to improve my knowledge base and learn something every day.
            </p>
          </div>
        </div>


        <div className={`row justify-content-center ${styles.about}`}>
          <div className={`col col-12 col-md-5 col-lg-4 order-2 order-md-1`}>
            <div className={`cover-image-container ${styles['profile-image']}`}>
              <Image 
                src="/victory-emoji.png"
                alt="Emoji"
                width="100"
                height="100"
                className={styles[`victory-emoji`]}
              />
              <Image 
                src="https://res.cloudinary.com/hecsa/image/upload/v1676820132/simonedenadai.com/profile.jpg"
                alt="Simone"
                fill
                style={{'objectPosition': 'top right'}}
                sizes="
                  (max-width: 575px) 500px,
                  (max-width: 767px) 480px,
                  (max-width: 991px) 258px,
                  (max-width: 1199px) 280px,
                  (max-width: 1399px) 340px,
                  420px
                "
              />
            </div>
          </div>

          <div className={`col col-12 col-md-6 col-lg-5 offset-md-1 order-1 order-md-2`}>
            <div className='h1 mb-4'>About me</div>
            <p>
              Fascinated by the web since a young age, I started getting my hands dirty with basic HTML and CSS just for fun.
            </p>
            <p>
              While studying Graphics and Communication, I started working as a Web Developer in 2014.
            </p>
            <p>
              From my standpoint, web development is fun, it allows you to see things come alive, transform an idea into something many users can click and interact with.
            </p>
            <p>
              Aside from Web development, I also enjoy computer hardware, general technology, music, watching anime and gaming.
            </p>
          </div>
        </div>


        <div className={`row ${styles.work}`}>
          <div className={`col col-12 col-lg-10 offset-0 offset-lg-1`}>
            <div className='h1 mb-4'>Work & Projects</div>

            <Swiper
              className={styles['work-swiper']}
              modules={[Navigation, A11y]}
              navigation={{
                nextEl: `.${styles['swiper-next-arrow']}`,
                prevEl: `.${styles['swiper-prev-arrow']}`,
                disabledClass: `.${styles['swiper-button-disabled']}`
              }}
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
            >
              {projects.length > 0 && projects.map(project => {
                return (
                  <SwiperSlide 
                    key={project?._id} 
                    data-project-title={project?.title}
                    data-project-body={project?.body}
                    data-project-url={project?.url}
                  >
                    {
                      !!project?.cloudinaryimage && <div className={`cover-image-container ${styles.projectImage}`}>
                        <Image 
                          src={project?.cloudinaryimage.secure_url}
                          fill={true}
                          alt={project?.title}
                          sizes="
                            (max-width: 575px) 530px,
                            (max-width: 767px) 510px,
                            (max-width: 991px) 690px,
                            (max-width: 1199px) 770px,
                            (max-width: 1399px) 920px,
                            1120px
                          "
                        />
                      </div>
                    }
                  </SwiperSlide>
                )
              })}

              <div role='button' className={styles['swiper-prev-arrow']}>
                <SliderArrowPrev />
              </div>
              <div role='button' className={styles['swiper-next-arrow']}>
                <SliderArrowNext />
              </div>
            </Swiper>

            <div className={styles['work-slider-content-wrapper']}>
              <div className={styles['work-slider-content']}>
                <div className='h4'>{activeProject.title}</div>
                <p>{activeProject.body}</p>
                <Link href={activeProject.url} target="_blank" rel="noreferrer nofollow">Discover &rarr;</Link>
              </div>
            </div>

          </div>
        </div>


        <div className={`row justify-content-center ${styles.blog}`}>
          <div className={`col col-12 col-md-5 col-lg-3 offset-lg-1 d-none d-md-block`}>
            <BlogIcon className={`${styles["blog-icon"]}`} />
          </div>

          <div className={`col col-12 col-md-6 col-lg-5 offset-md-1`}>
            <div className='h1 mb-4'>Blog</div>
            <p>
              Sometimes I find time to write guides related to issues I faced, 
              this works well as a personal documentation for future reference, and can also help 
              other people around the internet.
            </p>
            <Link href="/blog">Discover &rarr;</Link>
          </div>
        </div>

      </div>

    </Layout>
  )
}


export async function getStaticProps() {
  const [projects = []] = await Promise.all([
    getAllProjects(),
  ])

  return {
    props: {
      projects
    }
  }
}