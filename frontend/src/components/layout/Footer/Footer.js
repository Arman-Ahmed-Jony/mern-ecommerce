import React from 'react'
import './footer.css'
import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs'
function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h3>Address</h3>
        <p>188, ashkona, dakkhinkahn, dhaka - 1230</p>
      </div>
      <div className="middleFooter">
        <h3>Technofix</h3>
        <p>Honest And Best Quality Service </p>
        <p>Copyright 2022 Technofix</p>
      </div>
      <div className="rightFooter">
        <h3>follow us</h3>
        <div className="social-links">
          <a href="https://facebook.com/">
            <BsFacebook />
          </a>
          <a href="https://whatsapp.com/">
            <BsWhatsapp />
          </a>
          <a href="https://instagram.com/">
            <BsInstagram />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
