import Link from "next/link";
import { useState, useEffect } from 'react';

import GithubIcon from '@/public/github-icon.svg'
import LinkedinIcon from '@/public/linkedin-icon.svg'


export default function Footer() {
  const [currentYear, setCurrentYear] = useState();
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, [])

  return <footer id="footer">
    <div className='container'>
      <div className={`row justify-content-center`}>
        <div className={`col col-12 col-md-6`} id="get-in-touch">
          <div className='h1 mb-4'>Get in touch</div>
          <p>
            I&apos;m not currently searching for new opportunities, 
            but if you want to check out what I do, or if you just want to say &#34;Hi&#34;,
            you can find me at the links below!
          </p>
          <Link href={process.env.NEXT_PUBLIC_GITHUB_URL} aria-label="GitHub" target='_blank'>
            <GithubIcon width="60" />
          </Link>
          <Link href={process.env.NEXT_PUBLIC_LINKEDIN_URL} aria-label="LinkedIn" target='_blank'>
            <LinkedinIcon width="60" className={`ms-4`} />
          </Link>
        </div>
      </div>

      <div className={`row justify-content-center mt-5`}>
        <div className='col-sm-12 col-md-6'>
          Copyright &copy; {process.env.NEXT_PUBLIC_WEBSITE_NAME} {currentYear}
        </div>
      </div>
    </div>
  </footer>
}
