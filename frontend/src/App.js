import './App.css'
import Header from './components/layout/Header/Header.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import WebFont from 'webfontloader'
import Footer from './components/layout/Footer/Footer'
import Home from './components/Home/Home'
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sens', 'Chilanka'],
      },
    })
  }, [])
  return (
    <Router>
      <Header />
      <div style={{ marginTop: '120px' }}></div>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
