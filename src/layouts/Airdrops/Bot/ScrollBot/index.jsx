import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Borderline from 'components/Borderline'
import OmniKingdomBot from './OmniKingdoms'
import { scrollProvider } from './OmniKingdoms/config'
import { startOmniKingdomTasks } from './OmniKingdoms/config'
import { ethers, formatEther } from 'ethers'
import AddressComponent from 'components/CryptoComponents/AddressComponent'

const Index = ({ privateKeys }) => {
  const [omniKingdomData, setOmniKingdomData] = useState([])
  const [activeWallet, setActiveWallet] = useState('')
  const [ethBalance, setEthBalance] = useState(0)

  const walletEthBalance = async (walletAddress) => {
    const getEthBalance = await scrollProvider.getBalance(walletAddress)
    setEthBalance(formatEther(getEthBalance))
  }

  const startBot = async () => {
    for (const wallet of privateKeys) {
      const getWallet = new ethers.Wallet(wallet, scrollProvider)
      setActiveWallet(getWallet.address)
      walletEthBalance(getWallet.address)

      const OmniKingdomTasks = await startOmniKingdomTasks(getWallet)
      setOmniKingdomData(OmniKingdomTasks)
      walletEthBalance(getWallet.address)
    }
  }
  useEffect(() => {
    if (privateKeys?.length > 0) {
      startBot()
    }
    // eslint-disable-next-line
  }, [privateKeys])
  return (
    <div>
      <Card title='Scroll Bot' titleBorder={true}>
        <div className='p-2'>
          <div className='flex items-center gap-1'>
            <Typography className='text-sm'>აქტიური საფულე: </Typography>
            <AddressComponent short={!true} address={activeWallet} type='wallet' chain='evm' chainid={84531} />
          </div>
          <div className='flex items-center gap-1'>
            <Typography className='text-sm'>ETH ბალანსი: </Typography>
            <Typography className='text-sm'>{ethBalance}</Typography>
          </div>
        </div>
        <Borderline />
        <div className='p-2'>
          {/* <div className='flex flex-col space-y-2'>
            <OmniKingdomBot data={data} />
          </div> */}
        </div>
      </Card>
    </div>
  )
}

export default Index
