import { useWeb3React } from '@web3-react/core'
import CryptoLuxToken from 'assets/images/logo.png'
import Borderline from 'components/Borderline'
import Button from 'components/Button'
import Card from 'components/Cards/Card'
import ConnectWallet from 'components/ConnectWallet/Ethereum/ConnectButton'
import { Option, Select } from 'components/Select'
import Typography from 'components/Typography'
import { useToast } from 'hooks/useToast'
import { useState } from 'react'
import { getCLXFaucetContract } from '..'
import { isError } from 'ethers'
import { supportedChainsForGames } from 'layouts/Games/config'
import Alert from 'components/Alerts'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const { active, chainId } = useWeb3React()
  const toast = useToast()

  const claimTokens = async () => {
    const faucetChain = document.getElementById('faucetChain').value
    if (Number(faucetChain) !== Number(chainId)) {
      toast('error', 'ქსელი არასწორად გაქვთ არჩეული!')
      return
    }
    const faucetContract = await getCLXFaucetContract(Number(faucetChain))

    try {
      setIsLoading(true)
      const txResponse = await faucetContract.claim()
      toast('loading', 'ტრანზაქცია მუშავდება', '', txResponse.hash, 'evm', chainId, '')
      const txReceipt = await txResponse.wait()
      if (txReceipt.status === 1) {
        toast('success', 'CryptoLux Token Faucet', `თქვენ დაგერიცხათ 500 CLX.`, txReceipt.hash, 'evm', chainId, '')
      } else {
        toast('error', 'CryptoLux Token Faucet', 'ტრანზაქცია არ დადასტურდა', txReceipt.hash, 'evm', chainId, '')
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

  return (
    <div className='w-full md:w-[350px]'>
      <Card title='Claim CryptoLux Token' titleBorder={true}>
        <div className='px-2 mt-2'>
          <Select id='faucetChain' defaultValue='Scroll'>
            <Option value='selectChain'>აირჩიეთ ქსელი</Option>
            {supportedChainsForGames.map((x) => (
              <Option key={x.name} value={x.networkId}>
                {x.name}
              </Option>
            ))}
          </Select>
        </div>
        <Borderline className='mt-2' />
        <div className='p-2'>
          {active ? (
            <div>
              {supportedChainsForGames.some((chain) => chain.networkId === chainId) ? (
                <div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <img src={CryptoLuxToken} alt='logo' className='w-7' />
                      <Typography className='text-md'>500 CLX</Typography>
                    </div>
                    <Button onClick={() => claimTokens()} loading={isLoading}>
                      აღება
                    </Button>
                  </div>
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
      </Card>
    </div>
  )
}

export default Index
