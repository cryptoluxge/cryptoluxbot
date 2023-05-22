import { useWeb3React } from '@web3-react/core'
import AddToWallet from 'components/AddToWallet'
import Alert from 'components/Alerts'
import Borderline from 'components/Borderline'
import Button from 'components/Button'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import Input from 'components/Input'
import Modal from 'components/Modal'
import Skelaton from 'components/Skelaton'
import { BodyTd, BodyTr, HeadTh, HeadTr, Table, Tbody, Thead } from 'components/Table'
import Typography from 'components/Typography'
import { isError, parseUnits } from 'ethers'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'
import { getTokenContract } from 'utils/Helpers/BlockchainHelpers/contractHelpers'
import { getChainDataById, shortAddress } from 'utils/WalletHelpers'

const Index = ({ data, networkId, isLoading }) => {
  const { chainId } = useWeb3React()
  const [token, setToken] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [isTxLoading, setIsTxLoading] = useState(Boolean)
  const toast = useToast()

  const sendToken = async (tokenAddress, decimal) => {
    const toAddress = document.getElementById('reciverAddress').value
    const toAmount = document.getElementById('sentAmount').value
    const tokenContract = await getTokenContract(tokenAddress, chainId, true)
    const amount = parseUnits(toAmount, decimal)
    const gasLimit = await tokenContract.transfer.estimateGas(toAddress, amount)

    try {
      setIsTxLoading(true)
      const txResponse = await tokenContract.transfer(toAddress, amount, { gasLimit: gasLimit })
      toast('loading', 'ტრანზაქცია მუშავდება', '', txResponse.hash, 'evm', chainId, '')
      const txReceipt = await txResponse.wait()
      if (txReceipt.status === 1) {
        toast('success', 'ტრანზაქცია დადასტურდა', 'თქვენი ტოკენები გაიგზავნა', txReceipt.hash, 'evm', chainId, '')
      } else {
        toast('error', 'ტრანზაქცია არ დადასტურდა', '', txReceipt.hash, 'evm', chainId, '')
      }
      setIsTxLoading(false)
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
      setIsTxLoading(false)
    }
  }

  return (
    <div>
      <div className='overflow-x-auto s rounded-lg max-h-[500px]'>
        {!isLoading ? (
          <div>
            {data.status === 200 ? (
              <div>
                {data.data.length > 0 ? (
                  <div>
                    <div className='p-2'>
                      <div className='flex flex-col sm:flex-row md:justify-between md:items-center'>
                        <Typography className='text-sm'>ტოკენების რაოდენობა: {Object.keys(data.data).length}</Typography>
                      </div>
                    </div>
                    <Borderline />
                    <Table>
                      <Thead>
                        <HeadTr>
                          <HeadTh>სახელი</HeadTh>
                          <HeadTh>ბალანსი</HeadTh>
                          <HeadTh>კონტრაქტი</HeadTh>
                          <HeadTh></HeadTh>
                          <HeadTh></HeadTh>
                        </HeadTr>
                      </Thead>
                      <Tbody>
                        {data.data.map((x, index) => (
                          <BodyTr key={x.token_address} onMouseEnter={() => setToken({ address: x.token_address, decimal: x.decimals, name: x.name, symbol: x.symbol, balance: Number(Number(x.balance) / 10 ** x.decimals) })}>
                            <BodyTd isLast={index !== data.data.length - 1} rightCorner={index === data.data.length - 1}>
                              <Typography className='font-light'>{x.symbol}</Typography>
                            </BodyTd>
                            <BodyTd isLast={index !== data.data.length - 1}>
                              <Typography>{Number(Number(x.balance) / 10 ** x.decimals).toLocaleString('en-US')}</Typography>
                            </BodyTd>
                            <BodyTd isLast={index !== data.data.length - 1}>
                              <AddressComponent address={x.token_address} chain='evm' chainId={networkId} type='token' />
                            </BodyTd>
                            <BodyTd isLast={index !== data.data.length - 1}>
                              <Typography onClick={chainId === networkId ? () => setModalOpen(!modalOpen) : () => toast('error', `გადართეთ ${getChainDataById(networkId).symbol} ქსელზე`)} className='hover:underline'>
                                გაგზავნა
                              </Typography>
                            </BodyTd>
                            <BodyTd isLast={index !== data.data.length - 1} leftCorner={index === data.data.length - 1}>
                              <AddToWallet variant='text' address={x.token_address} decimal={x.decimals} symbol={x.symbol} />
                            </BodyTd>
                          </BodyTr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                ) : (
                  <div className='p-2'>
                    <Alert variant='info' text={`${getChainDataById(networkId).symbol} ქსელზე ტოკენები არ გაქვთ`} />
                  </div>
                )}
              </div>
            ) : (
              <div className='p-2'>
                <Alert variant='error' text='API კავშირი ვერ მოხერხდა! ცადეთ მოგვიანებით.' />
              </div>
            )}
          </div>
        ) : (
          <div className='p-2'>
            <Skelaton width='full' />
          </div>
        )}
      </div>
      <Modal title='ტოკენის გაგზავნა' open={modalOpen} close={() => setModalOpen(!modalOpen)}>
        <div className='p-2'>
          <Typography className='text-sm'>
            სახელი: {token.name} ({token.symbol})
          </Typography>
          <Typography className='text-sm'>ბალანსი: {token.balance}</Typography>
          <Typography className='text-sm'>
            კონტრაქტი:{' '}
            <a href={`https://bscscan.com/address/${token.address}`} target='_blank' rel='noreferrer' className='text-lightText dark:text-darkText'>
              {shortAddress(token.address, 5)}
            </a>
          </Typography>
          <div className='flex md:hidden'>
            <AddToWallet variant='text' address={token.address} decimal={token.decimal} symbol={token.symbol} />
          </div>
          <div className='rounded-t border-b border-gray-600  rounded-3xl mt-2'></div>
          <Typography className='mt-2 text-sm'>გაგზავნა</Typography>
          <div className='flex items-center gap-2 mt-1'>
            <Input id='sentAmount' type='text' placeholder='რაოდენობა' />
            <Button onClick={() => (document.getElementById('sentAmount').value = token.balance)}>MAX</Button>
          </div>
          <div className='mt-2'>
            <Input id='reciverAddress' type='text' placeholder='მიმღების მისამართი' />
          </div>
          <div className='mt-2'>
            <Button loading={isTxLoading} onClick={() => sendToken(token.address, token.decimal)} type='button'>
              გაგზავნა
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Index
