import { useWeb3React } from '@web3-react/core'
import ArbLogo from 'assets/images/Blockchains/Arbitrum.js'
import AvaxLogo from 'assets/images/Blockchains/Avalanche.js'
import BnbLogo from 'assets/images/Blockchains/Binance.js'
import CroLogo from 'assets/images/Blockchains/Cronos.js'
import EthLogo from 'assets/images/Blockchains/Ethereum.js'
import FtmLogo from 'assets/images/Blockchains/Fantom.js'
import MaticLogo from 'assets/images/Blockchains/Matic.js'
import Borderline from 'components/Borderline'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { ethers, formatEther } from 'ethers'
import { useState } from 'react'
import { getSimpleCoinPrice } from 'utils/APIs/CoinGeckoAPI'
import SendButton from './SendButton'

const Index = () => {
  const { account, chainId } = useWeb3React()
  const [userBalance, setUserBalance] = useState({})
  const [nativeCoinPrice, setNativeCoinPrice] = useState(0)
  const provider = new ethers.BrowserProvider(window.ethereum)
  const chains = {
    56: { chainName: 'Smart Chain', coinGeckoId: 'binancecoin', tokenName: 'BNB', color: 'bg-yellow-500', icon: <BnbLogo className='w-6' color='text-white' /> },
    1: { chainName: 'Ethereum', coinGeckoId: 'ethereum', tokenName: 'ETH', color: 'bg-blue-500', icon: <EthLogo className='w-4' /> },
    5: { chainName: 'Ethereum', coinGeckoId: 'ethereum', tokenName: 'ETH', color: 'bg-blue-500', icon: <EthLogo className='w-4' /> },
    43114: { chainName: 'Avalanche', coinGeckoId: 'avalanche-2', tokenName: 'AVAX', color: 'bg-red-500', icon: <AvaxLogo className='w-6' /> },
    137: { chainName: 'Polygon', coinGeckoId: 'matic-network', tokenName: 'MATIC', color: 'bg-blue-500', icon: <MaticLogo className='w-6' color='text-white' /> },
    250: { chainName: 'Fantom', coinGeckoId: 'fantom', tokenName: 'FTM', color: 'bg-blue-500', icon: <FtmLogo className='w-4' /> },
    25: { chainName: 'Cronos', coinGeckoId: 'crypto-com-chain', tokenName: 'CRO', color: 'bg-blue-500', icon: <CroLogo className='w-5' /> },
    42161: { chainName: 'Arbitrum', coinGeckoId: 'ethereum', tokenName: 'ETH', color: 'bg-blue-500', icon: <ArbLogo className='w-5' /> },
  }

  const getWalletBalance = async () => {
    const balance = await provider.getBalance(account.toLowerCase())
    setUserBalance({ hasBalance: Number(balance) > 0, balance: formatEther(balance), balanceWei: balance })
  }

  const getNativeCoinPrice = async () => {
    const data = await getSimpleCoinPrice(chains[chainId].coinGeckoId)
    if (data.status === 200) {
      setNativeCoinPrice(data.data[chains[chainId].coinGeckoId].usd)
    }
  }

  const selectedChain = chains[chainId]

  useState(() => {
    getWalletBalance()
    getNativeCoinPrice()
  }, [])

  return (
    <div>
      <div className='w-full md:w-[250px]'>
        <Card title='მიმოხილვა' titleBorder={true}>
          <div className='p-2 space-y-2'>
            <div className='flex flex-col'>
              <Typography className='text-sm'>{selectedChain.tokenName} ბალანსი</Typography>
              <Typography className='text-sm'>
                {Number(userBalance.balance).toFixed(8)} {selectedChain.tokenName}
              </Typography>
            </div>
            <div className='flex flex-col'>
              <Typography className='text-sm'>{selectedChain.tokenName} ღირებულება</Typography>
              <Typography className='text-sm'>
                ${(Number(userBalance.balance) * Number(nativeCoinPrice)).toLocaleString('en-US')} (@ ${Number(nativeCoinPrice).toLocaleString('en-US')}/{selectedChain.tokenName})
              </Typography>
            </div>
          </div>
          <Borderline />
          <div className='p-2'>
            <SendButton tokenName={selectedChain.tokenName} canSend={userBalance.hasBalance} />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Index
