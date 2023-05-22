import { useWeb3React } from '@web3-react/core'
import Borderline from 'components/Borderline'
import Button from 'components/Button'
import Input from 'components/Input'
import Modal from 'components/Modal'
import Typography from 'components/Typography'
import { ethers, formatEther, isError, parseEther } from 'ethers'
import { useToast } from 'hooks/useToast'
import { useEffect, useState } from 'react'
import { MdSend } from 'react-icons/md'
import { isCorrectEVMAddress } from 'utils/WalletHelpers'

const SendButton = ({ tokenName, canSend }) => {
  const { account, chainId } = useWeb3React()
  const [modalOpen, setModalOpen] = useState(false)
  const [userBalance, setUserBalance] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean)
  const provider = new ethers.BrowserProvider(window.ethereum)
  const toast = useToast()

  const getWalletBalance = async () => {
    const balance = await provider.getBalance(account.toLowerCase())
    setUserBalance({ hasBalance: Number(balance) > 0, balance: formatEther(balance), balanceWei: balance })
  }

  const setMaxBalance = () => {
    document.getElementById('amountToSend').value = userBalance.balance
  }

  const sendNativeToken = async () => {
    const recipientAddress = document.getElementById('reciverAddress').value
    const value = document.getElementById('amountToSend').value

    if (value === '') {
      toast('error', 'შეიყვანეთ გასაგზავნი რაოდენობა')
      return
    }

    if (Number(value) < 0) {
      toast('error', 'რაოდენობა არასწორადაა შეყვანილი')
      return
    }

    if (recipientAddress === '') {
      toast('error', 'შეიყვანეთ საფულის მისამართი')
      return
    }

    if (!isCorrectEVMAddress(recipientAddress)) {
      toast('error', 'საფულის მისამართი არასწორია')
      return
    }

    const signer = await provider.getSigner()

    const transaction = {
      to: recipientAddress,
      value: parseEther(value),
    }

    try {
      setIsLoading(true)
      const sendTransaction = await signer.sendTransaction(transaction)
      toast('loading', 'ტრანზაქცია მუშავდება', '', sendTransaction.hash, 'evm', chainId, '')
      const receipt = await sendTransaction.wait()
      if (receipt.status === 1) {
        toast('success', `ტრანზაქცია დადასტურდა`, `გაიგზავნა ${value} ${tokenName}`, receipt.hash, 'evm', chainId, null)
      } else {
        toast('error', 'ტრანზაქცია არ დადასტურდა!', '', receipt.hash, 'evm', chainId, null)
      }
      setIsLoading(false)
    } catch (error) {
      if (isError(error, 'ACTION_REJECTED')) {
        toast('error', 'ტრანზაქცია არ დაადასტურეთ')
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWalletBalance()
    // eslint-disable-next-line
  }, [modalOpen])

  return (
    <div>
      <div
        onClick={canSend ? () => setModalOpen(!modalOpen) : undefined}
        className={`duration-150 h-[42px] ${canSend ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-slate-500 cursor-not-allowed'}  rounded-lg flex justify-center items-center cursor-pointer gap-2`}>
        <Typography color='text-white'>გაგზავნა</Typography>
        <MdSend className='text-white text-xl' />
      </div>
      <Modal title={`${tokenName} გაგზავნა`} open={modalOpen} close={() => setModalOpen(!modalOpen)}>
        <div className='p-2'>
          <Typography className='text-sm'>ბალანსი: {userBalance.balance}</Typography>
        </div>
        <Borderline />
        <div className='p-2'>
          <div className='space-y-2'>
            <div className='flex items-center gap-1'>
              <Input type='number' pattern='[0-9]*' min={0} step='any' id='amountToSend' placeholder='რაოდენობა' className='appearance-none' />
              <Button onClick={() => setMaxBalance()}>MAX</Button>
            </div>
            <Input id='reciverAddress' placeholder='მიმღების მისამართი' />
          </div>
        </div>
        <Borderline />
        <div className='flex items-center gap-2 justify-end p-2'>
          <Button onClick={() => setModalOpen(!modalOpen)}>დახურვა</Button>
          <Button loading={isLoading} onClick={() => sendNativeToken()}>
            გაგზავნა
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default SendButton
