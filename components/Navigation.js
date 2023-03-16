import Link from "next/link";
import { useEffect, useState } from 'react'


export default function Navigation({}) {  
  const [scroll, setScroll] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 80);
    });
  }, []);

  const handleMenuClick = () => {
    if (window.innerWidth < 992) {
      document.querySelector('.mobile-nav-toggle').click()
    }
  }

  return <>
    <nav id="navigation" className={`navbar navbar-expand-lg ${scroll && "scrolling"}`}>

      <div className="container">
        {/* Mobile Menu Toggle */}        
        <button className="mobile-nav-toggle collapsed btn d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenuList"
          aria-controls="navbarMenuList"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg className="ham" viewBox="0 0 100 100" width="60">
            <path className="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
            <path className="line middle" d="m 70,50 h -40" />
            <path className="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
          </svg>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenuList">
          {/* Menu Links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className={`nav-item`}>
              <Link href='/' className="nav-link" onClick={handleMenuClick}>Home</Link>
            </li>
            <li className={`nav-item`}>
              <Link href='/blog' className="nav-link" onClick={handleMenuClick}>Blog</Link>
            </li>
            <li className={`nav-item`}>
              <Link href='#get-in-touch' className="nav-link" onClick={handleMenuClick}>Get in touch</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </>
}
