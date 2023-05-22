import Typography from 'components/Typography'
import { ethers, formatEther } from 'ethers'
import ArbitrumLogo from '../assets/images/Blockchains/Arbitrum.js'
import AvaxLogo from '../assets/images/Blockchains/Avalanche.js'
import BaseLogo from '../assets/images/Blockchains/Base.js'
import BscLogo from '../assets/images/Blockchains/Binance.js'
import CronosLogo from '../assets/images/Blockchains/Cronos.js'
import EthLogo from '../assets/images/Blockchains/Ethereum.js'
import FantomLogo from '../assets/images/Blockchains/Fantom.js'
import LineaLogo from '../assets/images/Blockchains/Linea.js'
import MaticLogo from '../assets/images/Blockchains/Matic.js'
import ScrollLogo from '../assets/images/Blockchains/Scroll.js'
import { getCoinPriceID } from './APIs/CryptoRankAPI'

const web3BSC = new ethers.JsonRpcProvider('https://bsc-dataseed1.binance.org/')
const web3ETH = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth')
const web3AVAX = new ethers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
const web3MATIC = new ethers.JsonRpcProvider('https://polygon-rpc.com/')
const web3FTM = new ethers.JsonRpcProvider('https://rpc.ankr.com/fantom')
const web3CRO = new ethers.JsonRpcProvider('https://evm.cronos.org/')
const web3ARBI = new ethers.JsonRpcProvider('https://rpc.ankr.com/arbitrum')

export const isCorrectEVMAddress = (address) => {
  if (typeof address !== 'string') return false
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return false
  return true
}

export const checkWallet = () => {
  const result = {
    isMetamaskInstalled: false,
    isCoinbaseInstalled: false,
    isTrustWalletInstalled: false,
  }

  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      result.isMetamaskInstalled = true
      result.isTrustWalletInstalled = true
    }
    if (typeof window.web3 !== 'undefined' && window.web3.currentProvider.isCoinbaseWallet) {
      result.isCoinbaseInstalled = true
    }

    if (window.ethereum.isTrust) {
      result.isMetamaskInstalled = true
      result.isTrustWalletInstalled = true
    }
  }

  return result
}

export const getChainId = (chainName) => {
  // eslint-disable-next-line
  switch (chainName) {
    case 'ETH':
      return 1
    case 'gETH':
      return 5
    case 'BSC':
      return 56
    case 'AVAX':
      return 43114
    case 'FTM':
      return 250
    case 'MATIC':
      return 137
    case 'CRO':
      return 25
    case 'ARB':
      return 42161
    default:
      return 'Wrong Network'
  }
}

export const getChainFullName = (chainId) => {
  // eslint-disable-next-line
  const getChain = getChainDataById(chainId)
  return (
    <div className='flex flex-row items-center gap-2'>
      <getChain.logo className={getChain.logoWidth} />
      <div className='flex items-center'>
        <Typography className='text-sm hidden md:flex tracking-wide'>{getChain.name}</Typography>
        <Typography className='text-sm flex md:hidden tracking-wide'>{getChain.symbol}</Typography>
      </div>
    </div>
  )
}

export const shortAddress = (address, length) => {
  try {
    return `${address.substring(0, length)}...${address.substring(address.length - length)}`
  } catch (error) {
    return '-'
  }
}

export const getNativeBalance = async (account) => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const nativeBalance = await provider.getBalance(account)
  return formatEther(nativeBalance)
}

export const getBalancesOnSupportedChains = async (account) => {
  const BNBPrice = await getCoinPriceID('bitcoin')
  const ETHPrice = await getCoinPriceID('ethereum')
  const AVAXPrice = await getCoinPriceID('avalanche')
  const maticPrice = await getCoinPriceID('matic-network')
  const ftmPrice = await getCoinPriceID('fantom')
  const croPrice = await getCoinPriceID('crypto-com-cro')
  const arbitrumPrice = await getCoinPriceID('ethereum')

  const balanceBSC = await web3BSC.getBalance(account)
  const balanceETH = await web3ETH.getBalance(account)
  const balanceAVAX = await web3AVAX.getBalance(account)
  const balanceMATIC = await web3MATIC.getBalance(account)
  const balanceFTM = await web3FTM.getBalance(account)
  const balanceCRO = await web3CRO.getBalance(account)
  const balanceARBI = await web3ARBI.getBalance(account)

  return [
    { logoSize: 'w-4', logo: <BscLogo className='w-4' color='text-white' />, name: 'BSC', bal: formatEther(balanceBSC), usd: Number(BNBPrice) * Number(formatEther(balanceBSC)) },
    { logoSize: 'w-3', logo: <EthLogo className='w-3' color='text-white' />, name: 'ETH', bal: formatEther(balanceETH), usd: Number(ETHPrice) * Number(formatEther(balanceETH)) },
    { logoSize: 'w-4', logo: <AvaxLogo className='w-4' color='text-white' />, name: 'AVAX', bal: formatEther(balanceAVAX), usd: Number(AVAXPrice) * Number(formatEther(balanceAVAX)) },
    { logoSize: 'w-4', logo: <MaticLogo className='w-4' color='text-white' />, name: 'MATIC', bal: formatEther(balanceMATIC), usd: Number(maticPrice) * Number(formatEther(balanceMATIC)) },
    { logoSize: 'w-3', logo: <FantomLogo className='w-3' color='text-white' />, name: 'FTM', bal: formatEther(balanceFTM), usd: Number(ftmPrice) * Number(formatEther(balanceFTM)) },
    { logoSize: 'w-4', logo: <CronosLogo className='w-4' color='text-white' />, name: 'CRO', bal: formatEther(balanceCRO), usd: Number(croPrice) * Number(formatEther(balanceCRO)) },
    { logoSize: 'w-4', logo: <ArbitrumLogo className='w-4' color='text-white' />, name: 'ETH', bal: formatEther(balanceARBI), usd: Number(arbitrumPrice) * Number(formatEther(balanceARBI)) },
  ]
}

export const getChainDataById = (chainId) => {
  switch (chainId) {
    case 1:
      return { chainId: 1, name: 'Ethereum', symbol: 'ETH', coinName: 'Ethereum', coinSymbol: 'ETH', logo: EthLogo, logoWidth: 'w-3', moralisId: 'eth' }
    case 5:
      return { chainId: 5, name: 'Goerli', symbol: 'gETH', coinName: 'Ethereum', coinSymbol: 'ETH', logo: EthLogo, logoWidth: 'w-3', moralisId: 'eth' }
    case 56:
      return { chainId: 56, name: 'Smart Chain', symbol: 'BSC', coinName: 'BNB', coinSymbol: 'BNB', logo: BscLogo, logoWidth: 'w-4', moralisId: 'bsc' }
    case 43114:
      return { chainId: 43114, name: 'Avalanche', symbol: 'AVAX', coinName: 'Avalanche', coinSymbol: 'AVAX', logo: AvaxLogo, logoWidth: 'w-3', moralisId: 'avalanche' }
    case 250:
      return { chainId: 250, name: 'Fantom', symbol: 'FTM', coinName: 'Fantom', coinSymbol: 'FTM', logo: FantomLogo, logoWidth: 'w-3', moralisId: 'fantom' }
    case 137:
      return { chainId: 137, name: 'Polygon', symbol: 'MATIC', coinName: 'Polygon', coinSymbol: 'MATIC', logo: MaticLogo, logoWidth: 'w-3', moralisId: 'polygon' }
    case 25:
      return { chainId: 25, name: 'Cronos', symbol: 'CRO', coinName: 'Cronos', coinSymbol: 'CRO', logo: CronosLogo, logoWidth: 'w-3', moralisId: 'cronos' }
    case 42161:
      return { chainId: 42161, name: 'Arbitrum', symbol: 'ARBI', coinName: 'Ethereum', coinSymbol: 'ETH', logo: ArbitrumLogo, logoWidth: 'w-3', moralisId: 'arbitrum' }
    case 534353:
      return { chainId: 534353, name: 'Scroll', symbol: 'SCROLL', coinName: 'Ethereum', coinSymbol: 'ETH', logo: ScrollLogo, logoWidth: 'w-4', moralisId: 'eth' }
    case 59140:
      return { chainId: 59140, name: 'Linea', symbol: 'LINEA', coinName: 'Ethereum', coinSymbol: 'ETH', logo: LineaLogo, logoWidth: 'w-4', moralisId: 'eth' }
    case 11155111:
      return { chainId: 11155111, name: 'Sepolia', symbol: 'SEPOLIA', coinName: 'Ethereum', coinSymbol: 'ETH', logo: EthLogo, logoWidth: 'w-3', moralisId: 'eth' }
    case 84531:
      return { chainId: 84531, name: 'BASE', symbol: 'BASE', coinName: 'Ethereum', coinSymbol: 'ETH', logo: BaseLogo, logoWidth: 'w-3', moralisId: 'eth' }
    default:
      return { chainId: 0, name: '-', symbol: '-', coinName: '-', coinSymbol: '-', logo: '', logoWidth: '-', moralisId: '-' }
  }
}
