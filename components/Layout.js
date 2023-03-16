import Meta from './Meta'
import Navigation from './Navigation'
import Footer from './Footer'


export default function Layout({ children }) {
  return (
    <>
      {/* HTML HEAD AND METADATA */}
      <Meta />

      <Navigation/>

      <main id="main">
        <div className='blurBackground'></div>
        {children}
      </main>

      <Footer />
    </>
  )
}
