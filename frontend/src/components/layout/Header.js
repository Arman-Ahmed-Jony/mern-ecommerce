import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import { BsSearch, BsApp, BsCardText } from 'react-icons/bs'
function Header() {
  return (
    <div>
      <ReactNavbar
        burgerColor="#173b1b"
        burgerColorHover="grey"
        navColor1="#fa4b00"
        navColor2="#f75611"
        navColor3="#f76425"
        navColor4="#f7743b"
        logo="/logo192.png"
        logoWidth="200px"
        logoTransition="1"
        logoHoverColor="green"
        nav2FlexDirection="row"
        nav2justifyContent="space-around"
        nav3justifyContent="space-around"
        nav4justifyContent="space-around"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/home"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Family="Roboto"
        link2Family="Roboto"
        link3Family="Roboto"
        link4Family="Roboto"
        searchIcon
        SearchIconElement={BsSearch}
        profileIcon
        ProfileIconElement={BsApp}
        cartIcon
        CartIconElement={BsCardText}
        // searchIconUrl="/search"
        // searchIconColor="black"
      />
    </div>
  )
}

export default Header
