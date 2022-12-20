import './App.css'
import Header from './layout/Header/Header.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
// import WebFont from 'webfontloader'
import Footer from './layout/Footer/Footer'
import Home from './modules/Home'
import ProductDetails from './modules/Products/ProductDetailsPage'
function App() {
  useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ['Roboto', 'Droid Sens', 'Chilanka'],
    //   },
    // })
  }, [])
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '120px' }}></div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
