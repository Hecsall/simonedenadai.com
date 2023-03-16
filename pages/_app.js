import { Outfit } from "next/font/google"
import { useEffect } from 'react';

import '@/styles/bootstrap-custom.scss'
import '@/styles/globals.scss'


const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})


export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  },[])
  
  return <>
    <style jsx global>{`
      :root {
        --font-outfit: ${outfit.style.fontFamily};
      }
    `}</style>
    
    <Component {...pageProps} />
  </>
}
