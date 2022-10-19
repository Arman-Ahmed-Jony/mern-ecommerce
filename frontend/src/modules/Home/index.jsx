import React, { useEffect } from 'react'
import Products from '../Products'
import style from './style.module.css'
function Home() {
  useEffect(() => {
    console.log(style)
  })
  return (
    <>
      <div className={style.header}>
        <h1>Welcome to Technofix</h1>
        <p>we give best support to out clients</p>
      </div>
      <div>
        <h2>Featured Project</h2>
        <Products />
      </div>
    </>
  )
}

export default Home
