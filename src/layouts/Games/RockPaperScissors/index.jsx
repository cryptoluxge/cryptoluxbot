import { useWeb3React } from '@web3-react/core'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import ConnectWallet from 'components/ConnectWallet/Ethereum/ConnectButton'
import { Option, Select } from 'components/Select'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { useEffect, useState } from 'react'
import { getPlayContract, getPlayerData, getTotalFlipCount } from './helpers'
import { supportedChainsForGames } from '../config'
import { switchChainTo } from 'utils/SwitchChain'
import Borderline from 'components/Borderline'
import { isError } from 'ethers'
import Alert from 'components/Alerts'

const Index = () => {
  const moves = { 1: 'ქვა', 2: 'ქაღალდი', 3: 'მაკრატელი' }
  const result = { 0: 'text-red-400', 1: 'text-green-400', 2: 'text-primary' }
  const { account, active, chainId } = useWeb3React()
  const [contract2Move, setContract2Move] = useState('')
  const [player1Move, setPlayer1Move] = useState('')
  const [userWon, setUserWon] = useState()
  const [userWins, setUserWins] = useState('')
  const [userLosses, setUserLosses] = useState('')
  const [userTies, setUserTies] = useState('')
  const [flipCount, setFlipCount] = useState(0)
  const [isLoading, setIsLoading] = useState(Boolean)
  const toast = useToast()

  const contractData = async () => {
    const chain = active ? chainId : 534353
    const getFlipNumber = await getTotalFlipCount(chain)
    setFlipCount(getFlipNumber)
  }

  const userStats = async () => {
    const data = await getPlayerData(account, chainId)
    setUserWins(data.wins)
    setUserLosses(data.losses)
    setUserTies(data.ties)
  }

  const playRPS = async (type) => {
    setPlayer1Move('')
    setContract2Move('')
    setUserWon()
    setPlayer1Move(moves[type])

    const supportedChains = [534353, 59140, 84531]
    const getChain = document.getElementById('rpsGameChain').value
    let playContract = null
    if (supportedChains.includes(Number(getChain))) {
      playContract = await getPlayContract(getChain, true)
    } else {
      toast('error', 'აირჩიეთ ქსელი!')
      return
    }

    if (!active) {
      toast('error', 'დააკავშირეთ საფულე')
      return
    }

    if (Number(chainId) !== Number(getChain)) {
      switchChainTo(getChain)
    }

    try {
      setIsLoading(true)
      const eventHash = '0x372221c9f683f461485a4bd9366b7187a3d613b896c323b71ab7f82bf83a5f62'
      const gasLimit = await playContract.play.estimateGas(type)
      const txResponse = await playContract.play(type, { gasLimit: Number(gasLimit) + 100000 })
      toast('loading', 'Rock-Paper-Scissors', 'ტრანზაქცია მუშავდება', txResponse.hash, 'evm', 534353, '')
      const txReceipt = await txResponse.wait()
      const item = txReceipt.logs.find((obj) => obj.topics.includes(eventHash))
      if (txReceipt.status === 1) {
        setContract2Move(moves[Number(item.args[2])])
        if (item.args[3] === 1) {
          toast('success', 'Rock-Paper-Scissors', 'თქვენ მოიგეთ ✨', txReceipt.hash, 'evm', chainId)
          setUserWon(1)
        } else if (item.args[3] === 2) {
          toast('error', 'Rock-Paper-Scissors', 'ფრე 😐', txReceipt.hash, 'evm', chainId)
          setUserWon(2)
        } else {
          toast('error', 'Rock-Paper-Scissors', 'თქვენ წააგეთ 😔', txReceipt.hash, 'evm', chainId)
          setUserWon(0)
        }
      } else {
        toast('error', 'Coin Flip', 'ტრანზაქცია არ დადასტურდა', txReceipt.hash, 'evm', chainId, '')
      }
      userStats()
      contractData()
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
      setUserWins('0')
      setUserLosses('0')
      setUserTies('0')
    }
    // eslint-disable-next-line
  }, [active, chainId])

  return (
    <div>
      <Card title='Rock-Paper-Scissors' titleBorder={true}>
        <div className='p-2'>
          <div className='mb-2'>
            <Select id='rpsGameChain' defaultValue='Scroll'>
              <Option value='selectChain'>აირჩიეთ ქსელი</Option>
              {supportedChainsForGames.map((x) => (
                <Option key={x.name} value={x.networkId}>
                  {x.name}
                </Option>
              ))}
            </Select>
          </div>
          <Typography className='text-sm'>სულ ნათამაშებია {flipCount}-ჯერ</Typography>
          <div className='flex items-center gap-1'>
            <Typography className='text-sm'>თქვენი სვლა:</Typography>
            <Typography className='text-sm'>{player1Move}</Typography>
          </div>
          <div className='flex items-center gap-1'>
            <Typography className='text-sm'>კონტრაქტის სვლა:</Typography>
            <Typography className='text-sm'>{contract2Move}</Typography>
          </div>
          {userWon !== undefined && (
            <div>
              <Typography className='text-sm' color={result[userWon]}>
                {userWon === 0 && 'თქვენ წააგეთ'}
                {userWon === 1 && 'თქვენ მოგეთ'}
                {userWon === 2 && 'ფრე'}
              </Typography>
            </div>
          )}
          <Borderline className='mb-3 mt-2' />
          {active ? (
            <div>
              {supportedChainsForGames.some((chain) => chain.networkId === chainId) ? (
                <div className='space-y-2'>
                  <Button loading={isLoading} onClick={() => playRPS(1)}>
                    ქვა
                  </Button>
                  <Button loading={isLoading} onClick={() => playRPS(2)}>
                    ქაღალდი
                  </Button>
                  <Button loading={isLoading} onClick={() => playRPS(3)}>
                    მაკრატელი
                  </Button>
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
                <Borderline className='mb-3 mt-2' />
                <div className='mb-2 flex items-center justify-between px-2'>
                  <div className='flex flex-col text-center items-center gap-1'>
                    <Typography className='text-sm'>მოგება</Typography>
                    <Typography className='text-sm'>{userWins}</Typography>
                  </div>
                  <div className='flex flex-col text-center items-center gap-1'>
                    <Typography className='text-sm'>ფრე</Typography>
                    <Typography className='text-sm'>{userTies}</Typography>
                  </div>
                  <div className='flex flex-col text-center items-center gap-1'>
                    <Typography className='text-sm'>წაგება</Typography>
                    <Typography className='text-sm'>{userLosses}</Typography>
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
