import { useWeb3React } from '@web3-react/core'
import MetamaskIcon from 'assets/images/WalletIcons/MetamaskIcon.svg'
import TrustWalletIcon from 'assets/images/WalletIcons/TrustWalletIcon.svg'
import Borderline from 'components/Borderline'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'
import { checkWallet } from 'utils/WalletHelpers'
import WalletItem from './WalletItem'
import { injected } from './connectors'

export default function ConnectWallet({ text }) {
  const { activate } = useWeb3React()
  const [open, setOpen] = useState(false)
  const toast = useToast()
  const provider = window.ethereum

  const getWallets = checkWallet()

  const connectEvmWallet = async (wallet, isWalletInstalled) => {
    if (isWalletInstalled) {
      try {
        if (typeof provider !== 'undefined') {
          await activate(injected)
          localStorage.setItem('isEVMWalletConnected', true)
          localStorage.setItem('isEVMWalletConnected', true)
          localStorage.setItem('connectedEVMWallet', wallet)
        } else {
          toast('error', `საფულის დასაკავშირებლად საჭიროა ${wallet} საფულე!`)
        }
      } catch (ex) {
        toast('error', 'დაფიქსირდა შეცდომა!', ex)
      }
    } else {
      toast('error', `საფულის დასაკავშირებლად საჭიროა ${wallet} საფულე!`)
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setOpen(true)} type='button' className='duration-150 text-white w-full bg-primary hover:bg-primary/90 rounded-lg text-sm font-medium px-3 py-2.5 flex justify-center'>
          <svg className='mr-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'></path>
          </svg>
          {text ? text : 'შესვლა'}
        </button>
      </div>
      <Modal title='საფულის დაკავშირება' open={open} close={() => setOpen(!open)}>
        <div className='p-3'>
          <Typography className='text-sm' color='text-gray-500'>
            დაუკავშირდით თქვენი საფულით ან შექმენით ახალი.
          </Typography>
          <ul className='my-4 space-y-3'>
            <Typography className='text-sm'>EVM ქსელებისთვის</Typography>
            <Borderline />
            <div onClick={() => connectEvmWallet('Metamask', getWallets.isMetamaskInstalled)}>
              <WalletItem name='Metamask' icon={MetamaskIcon} isInstalled={getWallets.isMetamaskInstalled} />
            </div>
            <div onClick={() => connectEvmWallet('Trust Wallet', getWallets.isTrustWalletInstalled)}>
              <WalletItem name='Trust Wallet' icon={TrustWalletIcon} isInstalled={getWallets.isTrustWalletInstalled} />
            </div>
          </ul>
        </div>
      </Modal>
    </div>
  )
}
