import Borderline from 'components/Borderline'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import Input from 'components/Input'
import Typography from 'components/Typography'
import { Wallet, ethers } from 'ethers'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'
import { mintName } from './BaseBot/BaseNames/config'
import { startTasks } from './BaseBot/DackieSwap/config'
import { startOmniKingdomTasks } from './ScrollBot/OmniKingdoms/config'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const toast = useToast()

  const baseProvider = new ethers.JsonRpcProvider('https://goerli.base.org')
  const scrollProvider = new ethers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2')

  const setWalletPrivateKey = async () => {
    const getWallets = document.getElementById('walletPrivateKeys').value
    if (getWallets === '') {
      toast('error', 'შეიყვანეთ საფულის Private Key')
      return
    }

    if (String(getWallets).includes(' ')) {
      toast('error', 'გამოტოვების გარეშე')
      return
    }

    const getPrivatekeys = String(getWallets).split(',')
    setIsLoading(true)
    for (const key of getPrivatekeys) {
      const baseWallet = new Wallet(key, baseProvider)
      const scrollWallet = new Wallet(key, scrollProvider)

      toast('loading', 'იწყება DackieSwap-ის ტასკები')
      console.log('STARTING DACKIESWAP...')
      await startTasks(baseWallet, 5)
      console.log('ENDED DACKIESWAP')
      toast('success', 'დამთვარდა DackieSwap-ის ტასკები')

      toast('loading', 'იწყება BASENAMES-ის ტასკები')
      console.log('STARTING BASENAMES')
      await mintName(baseWallet, 5)
      console.log('ENDED BASENAMES')
      toast('success', 'დამთვარდა BASENAMES-ის ტასკები')

      toast('loading', 'იწყება Scroll Kingdom-ის ტასკები')
      console.log('STARTING Scroll Kingdom...')
      await startOmniKingdomTasks(scrollWallet)
      console.log('ENDED Scroll Kingdom')
      toast('success', 'დამთვარდა Scroll Kingdom-ის ტასკები')
      
      toast('success', 'დამთვარდა ყველა ტასკი')
      console.log('დასრულდა ყველა ტასკი')
    }
    setIsLoading(false)
  }
  return (
    <div>
      <Card title='Airdrop Farmer' titleBorder={true}>
        <div className='p-2'>
          <div className='duration-150 p-2 border-[1px] border-lightBorder dark:border-darkBorder rounded-lg'>
            <Typography className='text-sm'>შეიყვანეთ საფულის ან საფულეების Private Key და დააჭირეთ დაწყბეას. ბოტი ავტომატურად გააკეთებს ტრანზაქციებს ტესტნეტებზე.</Typography>
          </div>
        </div>
        <Borderline />
        <div className='p-2 space-y-2'>
          <Input id='walletPrivateKeys' placeholder='საფულის Private Key' />
          <Button onClick={() => setWalletPrivateKey()} loading={isLoading}>
            დაწყება
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Index
