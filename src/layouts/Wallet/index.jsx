import { useWeb3React } from '@web3-react/core'
import Alert from 'components/Alerts'
import { supportedEVMChains } from 'config'
import Wallet from './Wallet'

const Index = () => {
  const { active, chainId } = useWeb3React()
  return (
    <div>
      {active === true ? (
        <div>
          {supportedEVMChains.some((chain) => chain.chainId === chainId) ? (
            <Wallet />
          ) : (
            <div className='flex justify-center'>
              <div className='w-full md:w-[550px]'>
                <Alert variant='error' text='ქსელი არასწორად გაქვთ არჩეული!' />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center'>
          <div className='w-full md:w-[550px]'>
            <Alert variant='warning' text='საფულის დაკავშირების გარეშე ამ გვერდს ვერ გამოიყენებთ.' />
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
