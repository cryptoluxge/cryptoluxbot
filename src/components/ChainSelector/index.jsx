import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { getChainFullName } from 'utils/WalletHelpers'

import ArbLogo from 'assets/images/Blockchains/Arbitrum.js'
import AvaxLogo from 'assets/images/Blockchains/Avalanche.js'
import BscLogo from 'assets/images/Blockchains/Binance.js'
import CroLogo from 'assets/images/Blockchains/Cronos.js'
import EthLogo from 'assets/images/Blockchains/Ethereum.js'
import FtmLogo from 'assets/images/Blockchains/Fantom.js'
import MaticLogo from 'assets/images/Blockchains/Matic.js'
import Typography from 'components/Typography'
import Borderline from 'components/Borderline'
import { supportedEvmTestnetChains } from 'config'

import { useWeb3React } from '@web3-react/core'
import { ArbitrumChain, AvalancheChain, BNBChain, CronosChain, ETHChain, FantomChain, PolygonChain } from 'utils/EVMNetworks'
import ItemList from './ItemList'

const ChainSelector = () => {
  const { active, chainId } = useWeb3React()

  const isTestnetEnabled = localStorage.getItem('showTestnetNetworks')

  return (
    <div>
      {active && (
        <Menu as='div' className='inline-block text-left'>
          <Menu.Button className='p-2.5 w-full rounded-md bg-lightCard dark:bg-darkCard font-medium text-lightText dark:text-white duration-150 border-[1px] border-lightBorder dark:border-darkBorder'>
            <div className='flex items-center justify-between gap-2'>
              <div>{getChainFullName(chainId)}</div>
              <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
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
            <Menu.Items className='origin-top-center absolute center-1 mt-2 w-40 rounded-md shadow-lg z-50 bg-lightModal dark:bg-darkModal focus:outline-none border-[1px] border-lightBorder dark:border-darkBorder'>
              <div>
                <Typography className='text-sm p-2' color='text-gray-500'>
                  Mainnet
                </Typography>
                <Borderline />
                <ul>
                  <li onClick={() => BNBChain()}>
                    <ItemList name='Smart Chain' logo={<BscLogo className='w-4' color='text-white' />} logoWidth='w-4' color='primary' isFirst={true} />
                  </li>
                  <li onClick={() => ETHChain()}>
                    <ItemList name='Ethereum' logo={<EthLogo className='w-3' color='text-white' />} logoWidth='w-3' color='primary' />
                  </li>
                  <li onClick={() => AvalancheChain()}>
                    <ItemList name='Avalanche' logo={<AvaxLogo className='w-4' color='text-white' />} logoWidth='w-4' color='primary' />
                  </li>
                  <li onClick={() => PolygonChain()}>
                    <ItemList name='Polygon' logo={<MaticLogo className='w-4' color='text-white' />} logoWidth='w-4' color='primary' />
                  </li>
                  <li onClick={() => FantomChain()}>
                    <ItemList name='Fantom' logo={<FtmLogo className='w-3' color='text-white' />} logoWidth='w-3' color='primary' />
                  </li>
                  <li onClick={() => CronosChain()}>
                    <ItemList name='Cronos' logo={<CroLogo className='w-4' color='text-white' />} logoWidth='w-4' color='primary' />
                  </li>
                  <li onClick={() => ArbitrumChain()}>
                    <ItemList name='Arbitrum' logo={<ArbLogo className='w-4' color='text-white' />} logoWidth='w-4' color='primary' isLast={true} />
                  </li>
                </ul>
                {isTestnetEnabled !== null && isTestnetEnabled === 'true' && (
                  <div>
                    <Borderline />
                    <Typography className='text-sm p-2' color='text-gray-500'>
                      Testnet
                    </Typography>
                    <Borderline />
                    <ul>
                      {supportedEvmTestnetChains.map((x, index) => (
                        <li key={index} onClick={async () => await x.addChain()}>
                          <ItemList name={x.networkName} logo={x.logo} logoWidth='w-3' color='primary' />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  )
}

export default ChainSelector
