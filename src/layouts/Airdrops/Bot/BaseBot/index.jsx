import React, { useEffect, useState } from 'react'
import DackieSwapBot from './DackieSwap'
import BaseNamesBot from './BaseNames'
import Card from 'components/Cards/Card'
import Typtography from 'components/Typography'
import { ethers, formatEther } from 'ethers'
import { mintName } from './BaseNames/config'
import Borderline from 'components/Borderline'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import { startTasks } from './DackieSwap/config'

const Index = ({ privateKeys }) => {
  const [baseNameData, setBaseNameData] = useState([])
  const [dackieSwapData, setDackieSwapData] = useState([])
  const [activeWallet, setActiveWallet] = useState('')
  const [ethBalance, setEthBalance] = useState(0)

  const baseProvider = new ethers.JsonRpcProvider('https://goerli.base.org')

  const walletEthBalance = async (walletAddress) => {
    const getEthBalance = await baseProvider.getBalance(walletAddress)
    setEthBalance(formatEther(getEthBalance))
  }

  const startBot = async () => {
    for (const wallet of privateKeys) {
      const getWallet = new ethers.Wallet(wallet, baseProvider)
      setActiveWallet(getWallet.address)
      walletEthBalance(getWallet.address)

      const dackieSwapBot = await startTasks(getWallet, 5)
      setDackieSwapData(dackieSwapBot)
      walletEthBalance(getWallet.address)

      const baseNameBot = await mintName(getWallet, 10)
      setBaseNameData(baseNameBot)
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
      <Card title='Base Bot' titleBorder={true}>
        <div className='p-2'>
          <div className='flex items-center gap-1'>
            <Typtography className='text-sm'>აქტიური საფულე: </Typtography>
            <AddressComponent short={!true} address={activeWallet} type='wallet' chain='evm' chainid={84531} />
          </div>
          <div className='flex items-center gap-1'>
            <Typtography className='text-sm'>ETH ბალანსი: </Typtography>
            <Typtography className='text-sm'>{ethBalance}</Typtography>
          </div>
        </div>
        <Borderline />
        <div className='p-2'>
          <div className='flex flex-col space-y-2'>
            <DackieSwapBot data={dackieSwapData} />
            <BaseNamesBot data={baseNameData} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Index
