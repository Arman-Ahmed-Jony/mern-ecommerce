import React, { useEffect, useState } from 'react'
import Products from '../Products'
import style from './style.module.css'
import MetaData from '../../layout/MetaData';
function Home() {
  const [backToTop, setBackToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, [])
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <MetaData title='ecommerce'/>
      <div className={style.header}>
        <h1>Welcome to Technofix</h1>
        <p>we give best support to out clients</p>
      </div>
      <div>
        <h2>Featured Project</h2>
        <Products />
      </div>
      {backToTop && (
        <button onClick={scrollToTop} className={style.scrollToTop}>
          &#8593;
        </button>
      )}
    </>
  )
}

export default Home
