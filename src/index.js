import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

function getLibrary(provider) {
  const ethersProvider = new ethers.BrowserProvider(provider)
  return ethersProvider
}

const root = ReactDOM.createRoot(document.getElementById('root'))
window.addEventListener('load', () => {
  root.render(
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
      <App />
      </Web3ReactProvider>
    </BrowserRouter>
  )
})
