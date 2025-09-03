import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/MySetup.module.scss'
import Layout from '@/components/Layout'
import PostTile from '@/components/PostTile'

import {desktopComponents, deskSetup} from '@/constants'

export default function MySetup() {
  return (
    <Layout>
      <Head>
        <title>My Setup</title>
        <meta name="description" content="Simone's personal setup" />
      </Head>

      <div className={styles.greenGradient}></div>
      <div className={styles.blueGradient}></div>

      <div className='menu-spacer'></div>

      <div className='container'>
        <div className={`row align-content-center`}>
          <div className={`col col-12 ${styles.hero}`}>
            <h1 className='mb-5'>My Setup</h1>
            <p>Here are the details of my setup, with Amazon links for anyone interested</p>
          </div>
        </div>


        <div className={`row align-content-center`}>
          {deskSetup.map((item, index) => (
            <div key={index} className={`col col-12 col-md-6 col-lg-3 ${styles.card}`}>
              {/* {item.img && 
                <Image 
                  src={item.img}
                  alt={item.name}
                  width={200}
                  height={200}
                  style={{'objectFit': 'contain'}}
                  sizes="
                    (max-width: 575px) 500px,
                    (max-width: 767px) 480px,
                    (max-width: 991px) 258px,
                    (max-width: 1199px) 280px,
                    (max-width: 1399px) 340px,
                    420px
                  "
                />
              } */}
              <h5>{item.name}</h5>
              {/* {item.description && <p>{item.description}</p>} */}
              {item.specs.length > 0 && <p>
                  {item.specs.join(', ')}
                </p>
              }
              {item.buyLink && <a href={item.buyLink} target="_blank" rel="noopener noreferrer">Check it out</a>}
            </div>
          ))}
        </div>

        <div className={`row align-content-center`}>
          <div className={`col col-12 ${styles.hero}`}>
            <h1 className='mb-5'>Desktop build</h1>
            <p>Here are the components I used for my PC</p>
          </div>
        </div>

        <div className={`row align-content-center`}>
          {desktopComponents.map((item, index) => (
            <div key={index} className={`col col-12 col-md-6 col-lg-3 ${styles.card}`}>
              {/* {item.img && 
                <Image 
                  src={item.img}
                  alt={item.name}
                  width={200}
                  height={200}
                  style={{'objectFit': 'contain'}}
                  sizes="
                    (max-width: 575px) 500px,
                    (max-width: 767px) 480px,
                    (max-width: 991px) 258px,
                    (max-width: 1199px) 280px,
                    (max-width: 1399px) 340px,
                    420px
                  "
                />
              } */}
              <h5>{item.name}</h5>
              {item.description && <p>{item.description}</p>}
              {item.buyLink && <a href={item.buyLink} target="_blank" rel="noopener noreferrer">Check it out</a>}
            </div>
          ))}
        </div>

      </div>
    </Layout>
  )
}