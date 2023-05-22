import { useWeb3React } from '@web3-react/core'
import CLXLogo from 'assets/images/logo.png'
import Borderline from 'components/Borderline'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import ConnectWallet from 'components/ConnectWallet/Ethereum/ConnectButton'
import Input from 'components/Input'
import Alert from 'components/Alerts'
import { Option, Select } from 'components/Select'
import Typography from 'components/Typography'
import { isError, parseUnits } from 'ethers'
import { useToast } from 'hooks/useToast'
import { getTotalFlipCount } from 'layouts/Games/CoinFlip/helpers'
import { useEffect, useState } from 'react'
import { switchChainTo } from 'utils/SwitchChain'
import { getCLXContract, getHasUserCLXApproved, getUserCLXBalance } from '../CLXToken'
import { COINFLIP_MULTICHAIN_ADDRESSES, supportedChainsForGames } from '../config'
import { getBettingContract, getUserData } from './helpers'

const Index = () => {
  const { account, active, chainId } = useWeb3React()
  const [userWons, setUserWons] = useState('')
  const [userLost, setUserLost] = useState('')
  const [userWonsCLX, setUserWonsCLX] = useState('')
  const [userLostCLX, setUserLostCLX] = useState('')
  const [flipCount, setFlipCount] = useState(0)
  const [hasUserApproved, setHasUserApproved] = useState(false)
  const [clxBalance, setClxBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(Boolean)
  const toast = useToast()

  const approveCLXForFlipping = async () => {
    const tokenContract = await getCLXContract(chainId, true)
    try {
      setIsLoading(true)
      const gasLimit = await tokenContract.approve.estimateGas(COINFLIP_MULTICHAIN_ADDRESSES[chainId], '100000000000000000000000')
      const txResponse = await tokenContract.approve(COINFLIP_MULTICHAIN_ADDRESSES[chainId], '100000000000000000000000', { gasLimit: Number(gasLimit) + 100000 })
      toast('loading', 'Coin Flip', 'ტრანზაქცია მუშავდება', txResponse.hash, 'evm', 534353, '')
      const txReceipt = await txResponse.wait()
      if (txReceipt.status === 1) {
        toast('success', 'Coin Flip', `Approve გაკეთებულია`, txReceipt.hash, 'evm', chainId, '')
        userStats()
      } else {
        toast('error', 'Coin Flip', 'ტრანზაქცია არ დადასტურდა', txReceipt.hash, 'evm', chainId, '')
      }
      setIsLoading(false)
    } catch (error) {
      if (isError(error, 'ACTION_REJECTED')) {
        toast('error', 'ტრანზაქცია არ დაადასტურეთ')
      } else if (isError(error, 'CALL_EXCEPTION')) {
        toast('error', 'CALL_EXCEPTION')
      } else if (isError(error, 'INSUFFICIENT_FUNDS')) {
        toast('error', 'INSUFFICIENT_FUNDS')
      } else if (isError(error, 'NONCE_EXPIRED')) {
        toast('error', 'NONCE_EXPIRED')
      } else if (isError(error, 'REPLACEMENT_UNDERPRICED')) {
        toast('error', 'REPLACEMENT_UNDERPRICED')
      } else if (isError(error, 'TRANSACTION_REPLACED')) {
        toast('error', 'TRANSACTION_REPLACED')
      } else if (isError(error, 'UNCONFIGURED_NAME')) {
        toast('error', 'UNCONFIGURED_NAME')
      } else if (isError(error, 'OFFCHAIN_FAULT')) {
        toast('error', 'OFFCHAIN_FAULT')
      } else {
        toast('error', 'UNKNOWN_ERROR')
      }
      setIsLoading(false)
    }
  }

  const contractData = async () => {
    const chain = active ? chainId : 534353
    const getFlipNumber = await getTotalFlipCount(chain)
    setFlipCount(getFlipNumber)
  }

  const userStats = async () => {
    const userData = await getUserData(account, chainId)
    setUserWons(userData.won)
    setUserLost(userData.lost)
    setUserWonsCLX(userData.totalWonAmount)
    setUserLostCLX(userData.totalLostAmount)

    const hasApproved = await getHasUserCLXApproved(account, COINFLIP_MULTICHAIN_ADDRESSES[chainId], chainId)
    setHasUserApproved(hasApproved)

    const userCLXBalance = await getUserCLXBalance(account, chainId)
    setClxBalance(userCLXBalance)
  }

  const flipTheCoin = async (type) => {
    const supportedChains = [534353, 59140, 84531]
    const getBettingAmount = document.getElementById('flipBetAmount').value
    const getChain = document.getElementById('cfGameChain').value
    let bettingContract = null
    if (supportedChains.includes(Number(getChain))) {
      bettingContract = await getBettingContract(getChain, true)
    } else {
      toast('error', 'აირჩიეთ ქსელი!')
      return
    }
    if (!active) {
      return
    }

    if (Number(chainId) !== Number(getChain)) {
      switchChainTo(getChain)
      return
    }

    if (getBettingAmount === null || getBettingAmount === '' || getBettingAmount === undefined) {
      toast('error', 'შეიყვანეთ CXL რაოდენობა!')
      return
    }

    if (Number(clxBalance) < Number(getBettingAmount)) {
      toast('error', 'არასაკმარისი CLX ბალანსი!')
      return
    }

    if (Number(getBettingAmount) > 100) {
      toast('error', 'დასაბეთი რაოდენობა არ უნდა იყოს 100 CLX-ზე მეტი!')
      return
    }

    if (Number(getBettingAmount) <= 0) {
      toast('error', 'დასაბეთი რაოდენობა უნდა იყოს 0 CLX-ზე მეტი!')
      return
    }

    try {
      setIsLoading(true)
      const eventHash = '0x93cb8e870ff142701d42ae5a0bd25793cf9eeaef2c54b1b28d34bcccad4c25ed'
      const betAmount = parseUnits(getBettingAmount, 18)
      const gasLimit = await bettingContract.flipCoin.estimateGas(type, betAmount)
      const txResponse = await bettingContract.flipCoin(type, betAmount, { gasLimit: gasLimit })
      toast('loading', 'CoinFlip', 'ტრანზაქცია მუშავდება', txResponse.hash, 'evm', chainId, '')
      const txReceipt = await txResponse.wait()
      const item = txReceipt.logs.find((obj) => obj.topics.includes(eventHash))
      if (txReceipt.status === 1) {
        if (item.args[3]) {
          toast('success', 'Coin Flip', `თქვენ მოიგეთ ✨`, txReceipt.hash, 'evm', chainId, '')
        } else {
          toast('error', 'Coin Flip', `თქვენ წააგეთ 😔`, txReceipt.hash, 'evm', chainId, '')
        }
        userStats()
        contractData()
      } else {
        toast('error', 'Coin Flip', 'ტრანზაქცია არ დადასტურდა', txReceipt.hash, 'evm', chainId, '')
      }
      setIsLoading(false)
    } catch (error) {
      if (isError(error, 'ACTION_REJECTED')) {
        toast('error', 'ტრანზაქცია არ დაადასტურეთ')
      } else if (isError(error, 'CALL_EXCEPTION')) {
        toast('error', 'CALL_EXCEPTION')
      } else if (isError(error, 'INSUFFICIENT_FUNDS')) {
        toast('error', 'INSUFFICIENT_FUNDS')
      } else if (isError(error, 'NONCE_EXPIRED')) {
        toast('error', 'NONCE_EXPIRED')
      } else if (isError(error, 'REPLACEMENT_UNDERPRICED')) {
        toast('error', 'REPLACEMENT_UNDERPRICED')
      } else if (isError(error, 'TRANSACTION_REPLACED')) {
        toast('error', 'TRANSACTION_REPLACED')
      } else if (isError(error, 'UNCONFIGURED_NAME')) {
        toast('error', 'UNCONFIGURED_NAME')
      } else if (isError(error, 'OFFCHAIN_FAULT')) {
        toast('error', 'OFFCHAIN_FAULT')
      } else {
        toast('error', 'UNKNOWN_ERROR')
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (active) {
      if (supportedChainsForGames.some((chain) => chain.networkId === chainId)) {
        userStats()
        contractData()
      }
    } else {
      contractData()
      setUserLost('0')
      setUserWons('0')
    }
    // eslint-disable-next-line
  }, [active, chainId])

  return (
    <div>
      <Card title='Coin Flip' titleBorder={true}>
        <div className='p-2'>
          <div className='mb-2'>
            <Select id='cfGameChain' defaultValue='Scroll'>
              <Option value='selectChain'>აირჩიეთ ქსელი</Option>
              {supportedChainsForGames.map((x) => (
                <Option key={x.name} value={x.networkId}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </div>
          <Typography className='text-sm mb-2'>სულ ნათამაშებია {flipCount}-ჯერ</Typography>
          <div className='flex items-center gap-1 mb-2'>
            <img src={CLXLogo} alt='CLX_TOKEN_LOGO' className='w-5' />
            <Typography className='text-sm'>CLX ბალანსი: {Number(clxBalance).toLocaleString('en-US')}</Typography>
          </div>
          {active ? (
            <div>
              {supportedChainsForGames.some((chain) => chain.networkId === chainId) ? (
                <div>
                  <Input disabled={!hasUserApproved} id='flipBetAmount' placeholder='CLX რაოდენობა' className='mb-2' />
                  {hasUserApproved ? (
                    <div className='space-y-2'>
                      <Button id='aversButton' onClick={() => flipTheCoin(0)} loading={isLoading}>
                        ავერსი
                      </Button>
                      <Button id='reverseButton' onClick={() => flipTheCoin(1)} loading={isLoading}>
                        რევერსი
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button id='aversButton' onClick={() => approveCLXForFlipping()} loading={isLoading}>
                        APPROVE
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Alert variant='warning' text='მუშაობს მხოლოდ Scroll Testnet, Base Goerli და Linea Testnet-ზე.' />
                </div>
              )}
            </div>
          ) : (
            <div>
              <ConnectWallet text='დააკავშირეთ საფულე' />
            </div>
          )}
        </div>
        {active && (
          <div>
            {supportedChainsForGames.some((chain) => chain.networkId === chainId) && (
              <div>
                <Borderline className='mb-2 mt-2' />
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-0 mb-2'>
                  <div className='flex flex-col text-center'>
                    <Typography className='text-sm'>მოგებული</Typography>
                    <Typography className='text-sm'>{userWons}</Typography>
                  </div>
                  <div className='flex flex-col text-center'>
                    <Typography className='text-sm'>მოგებული CLX</Typography>
                    <Typography className='text-sm'>{userWonsCLX}</Typography>
                  </div>
                  <div className='flex flex-col text-center'>
                    <Typography className='text-sm'>წაგებული </Typography>
                    <Typography className='text-sm'>{userLost}</Typography>
                  </div>
                  <div className='flex flex-col text-center'>
                    <Typography className='text-sm'>წაგებული CLX</Typography>
                    <Typography className='text-sm'>{userLostCLX}</Typography>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export default Index
