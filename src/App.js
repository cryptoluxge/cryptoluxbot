
import { useEffect } from 'react'
import ReactGA from 'react-ga'
import { Route, Routes, useLocation } from 'react-router-dom'
import { menuItem } from 'routes'
import Sidenav from './components/SideNav'
import ToastContainer from './components/Toast/ToastContainer'
import { ToastProvider } from './context/ToastContext'

import Games from 'layouts/Games'
import AirdropBot from './layouts/Airdrops/Bot'

function App() {
  const location = useLocation()
  const { pathname } = location
  ReactGA.initialize('G-35VHEXBDM2')

  menuItem.forEach((item) => {
    if (item.path === pathname) {
      document.title = `კრიპტოლუქსი - ${item.name}`
    } else if (item.collapse) {
      item.collapse.forEach((subitem) => {
        if (subitem.path === pathname) {
          document.title = `კრიპტოლუქსი - ${subitem.name}`
        }
      })
    }
  })

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <div className='duration-150 min-h-screen bg-lightBackground dark:bg-darkBackground'>
      <ToastProvider>
        <ToastContainer />
        <Sidenav>
          <Routes>
            <Route path='/' element={<AirdropBot />} />
            <Route path='/airdrops/bot' element={<AirdropBot />} />
            <Route path='/games' element={<Games />} />
          </Routes>
        </Sidenav>
      </ToastProvider>
    </div>
  )
}

export default App
