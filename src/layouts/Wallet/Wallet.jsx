import { Tab } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import { useEffect, useState } from 'react'
import { getNativeTransactions, getNftTransactions, getTokenBalances, getTokenTransactions } from 'utils/APIs/MoralisAPI'
import { getChainDataById } from 'utils/WalletHelpers'
import NativeCoinSend from './NativeCoinSend'
import NFTTransactionsTable from './Tables/NFTTransactionsTable'
import TokenTransactionsTable from './Tables/TokenTransactionsTable'
import TokensTable from './Tables/TokensTable'
import TransactionsTable from './Tables/TransactionsTable'

const Index = () => {
  const { account, active, chainId } = useWeb3React()
  const [isLoading, setIsLoading] = useState(Boolean)
  const [isTxLoading, setIsTxLoading] = useState(Boolean)
  const [isTokenTxLoading, setTokenIsTxLoading] = useState(Boolean)
  const [isNftTxLoading, setIsNftTxLoading] = useState(Boolean)

  const [tokenBalances, setTokenBalances] = useState([])

  const [nativeTxs, setNativeTxs] = useState([])
  const [tokenTxs, setTokenTxs] = useState([])
  const [NftTxs, setNftTxs] = useState([])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const getTokenBalancesOnEVMChains = async (chain) => {
    setIsLoading(true)

    const tokenBalanceData = await getTokenBalances(account, chain)
    setTokenBalances(tokenBalanceData)

    setIsLoading(false)
  }

  const getNativeTransactionsOnEVMChains = async () => {
    setIsTxLoading(true)

    const getChain = getChainDataById(chainId)
    const nativeTxsData = await getNativeTransactions(account, getChain.moralisId)
    setNativeTxs(nativeTxsData)

    setIsTxLoading(false)
  }

  const getTokenTransactionsOnEVMChains = async () => {
    setTokenIsTxLoading(true)
    const getChain = getChainDataById(chainId)
    const tokenTxsData = await getTokenTransactions(account, getChain.moralisId)
    setTokenTxs(tokenTxsData)

    setTokenIsTxLoading(false)
  }

  const getNftTransactionsOnEVMChains = async () => {
    setIsNftTxLoading(true)
    const getChain = getChainDataById(chainId)
    const nftTxsData = await getNftTransactions(account, getChain.moralisId)
    setNftTxs(nftTxsData)

    setIsNftTxLoading(false)
  }

  useEffect(() => {
    if (active) {
      const getChain = getChainDataById(chainId)
      getTokenBalancesOnEVMChains(getChain.moralisId)
      /* getNativeTransactionsOnEVMChains(getChain.moralisId)
      getTokenTransactionsOnEVMChains(getChain.moralisId)
      getNftTransactionsOnEVMChains(getChain.moralisId) */
    }

    // eslint-disable-next-line
  }, [active, chainId])

  return (
    <div>
      <div>
        <NativeCoinSend />
        <div className='w-full mt-2'>
          <Tab.Group>
            <div className='w-full md:w-auto mb-3'>
              <Tab.List className='flex flex-col md:flex-row rounded-xl bg-primary p-1 md:space-x-2'>
                <Tab className={({ selected }) => classNames('w-full text-white rounded-lg py-1 text-sm leading-5', selected ? 'bg-yellow-700 dark:bg-darkCard' : 'hover:bg-yellow-700 dark:hover:bg-darkCard')}>
                  <div className='flex items-center justify-center gap-2'>
                    <Typography color='text-white'>ტოკენების ბალანსი</Typography>
                  </div>
                </Tab>
                <Tab
                  onClick={() => getNativeTransactionsOnEVMChains()}
                  className={({ selected }) => classNames('w-full text-white rounded-lg py-1 text-sm leading-5', selected ? 'bg-yellow-700 dark:bg-darkCard' : 'hover:bg-yellow-700 dark:hover:bg-darkCard')}>
                  <div className='flex items-center justify-center gap-2'>
                    <Typography color='text-white'>ტრანზაქციები</Typography>
                  </div>
                </Tab>
                <Tab
                  onClick={() => getTokenTransactionsOnEVMChains()}
                  className={({ selected }) => classNames('w-full text-white rounded-lg py-1 text-sm leading-5', selected ? 'bg-yellow-700 dark:bg-darkCard' : 'hover:bg-yellow-700 dark:hover:bg-darkCard')}>
                  <div className='flex items-center justify-center gap-2'>
                    <Typography color='text-white'>ტოკენების ტრანზაქციები</Typography>
                  </div>
                </Tab>
                <Tab
                  onClick={() => getNftTransactionsOnEVMChains()}
                  className={({ selected }) => classNames('w-full text-white rounded-lg py-1 text-sm leading-5', selected ? 'bg-yellow-700 dark:bg-darkCard' : 'hover:bg-yellow-700 dark:hover:bg-darkCard')}>
                  <div className='flex items-center justify-center gap-2'>
                    <Typography color='text-white'>NFT ტრანზაქციები</Typography>
                  </div>
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels>
              <Tab.Panel>
                <Card title='ტოკენების ბალანსი' titleBorder={true}>
                  <TokensTable data={tokenBalances} networkId={chainId} isLoading={isLoading} />
                </Card>
              </Tab.Panel>
              <Tab.Panel>
                <TransactionsTable account={account} data={nativeTxs} chainId={chainId} isTxLoading={isTxLoading} />
              </Tab.Panel>
              <Tab.Panel>
                <TokenTransactionsTable account={account} data={tokenTxs} chainId={chainId} isTxLoading={isTokenTxLoading} />
              </Tab.Panel>
              <Tab.Panel>
                <NFTTransactionsTable account={account} data={NftTxs} chainId={chainId} isTxLoading={isNftTxLoading} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

export default Index
