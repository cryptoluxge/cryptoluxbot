import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useWeb3React } from '@web3-react/core'
import MetamaskIcon from 'assets/images/WalletIcons/MetamaskIcon.svg'
import TrustWalletIcon from 'assets/images/WalletIcons/TrustWalletIcon.svg'
import Avatar from 'components/Avatar'
import ViewOnExplorer from 'components/CryptoComponents/ViewOnExplorer'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { Fragment } from 'react'
import { BiWallet } from 'react-icons/bi'
import { FiCopy } from 'react-icons/fi'
import { IoIosLogOut } from 'react-icons/io'
import { getChainFullName, shortAddress } from 'utils/WalletHelpers'
import ChainSelector from '../../ChainSelector'
import ConnectWallet from './ConnectButton'
import Borderline from 'components/Borderline'

export default function DisconnectButton() {
  const { account: web3Account, deactivate, chainId, active } = useWeb3React()
  const toast = useToast()
  const evmWallet = localStorage.getItem('connectedEVMWallet')
  const isEVMWallet = localStorage.getItem('isEVMWalletConnected')

  const evmWalletDisconnect = async () => {
    try {
      deactivate()
      localStorage.setItem('isEVMWalletConnected', false)
    } catch (ex) {
      toast('error', 'დაფიქსირდა შეცდომა!', ex)
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <ChainSelector />
      <Menu as='div' className='inline-block text-left'>
        <Menu.Button className='p-2 w-full rounded-md bg-lightCard dark:bg-darkCard font-medium text-white duration-150 border-[1px] border-lightBorder dark:border-darkBorder'>
          <div className='flex items-center justify-between gap-2'>
            <BiWallet className='duration-150 text-lightText dark:text-darkText' />
            <Typography>საფულე</Typography>
            <ChevronDownIcon className='h-5 w-5 duration-150 text-lightText dark:text-darkText' aria-hidden='true' />
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items className='origin-top-center absolute center-1 mt-2 w-auto rounded-md shadow-lg z-50 bg-lightModal dark:bg-darkModal focus:outline-none border-[1px] border-lightBorder dark:border-darkBorder right-3'>
            <div>
              {active && (
                <div>
                  <div className='p-2'>
                    <Typography className='text-sm mb-1' color='text-gray-500'>
                      EVM ქსელი
                    </Typography>
                    <div className='flex items-center text-lightText dark:text-darkText'>{active ? getChainFullName(chainId) : 'Mainnet'}</div>
                  </div>
                  <Borderline />
                  <div>
                    <div className='px-3 py-3 flex items-center gap-2 cursor-pointer'>
                      <Avatar src={evmWallet === 'Metamask' ? MetamaskIcon : TrustWalletIcon} className='w-4' />
                      <Typography className='text-sm whitespace-nowrap'>{shortAddress(web3Account, 5)}</Typography>
                    </div>
                  </div>
                  <Borderline />
                  <div onClick={() => navigator.clipboard.writeText(web3Account)} className='p-3 flex items-center gap-2 cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover'>
                    <FiCopy className='text-lightText dark:text-darkText flex-nowrap' />
                    <Typography className='text-sm whitespace-nowrap'>მისამართის კოპირება</Typography>
                  </div>
                  <Borderline />
                  <div className='p-3 flex items-center gap-2 cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover'>
                    <ViewOnExplorer chainType='evm' chainId={chainId} dataType='wallet' data={web3Account} />
                  </div>
                  <Borderline />
                  <div onClick={() => evmWalletDisconnect()} className='p-3 flex items-center gap-2 cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover rounded-b-lg'>
                    <IoIosLogOut className='text-lightText dark:text-darkText flex-nowrap text-lg' />
                    <Typography className='text-sm whitespace-nowrap'>გამოსვლა</Typography>
                  </div>
                </div>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
