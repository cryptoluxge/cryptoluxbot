import MetamaskIcon from 'assets/images/WalletIcons/MetamaskIcon.svg'
import TrustWalletIcon from 'assets/images/WalletIcons/TrustWalletIcon.svg'
import { useToast } from 'hooks/useToast'
import Avatar from '../Avatar'
import Typography from 'components/Typography'

const Index = ({ variant, address, symbol, decimal }) => {
  const toast = useToast()
  const wallet = localStorage.getItem('connectedEVMWallet')

  if (symbol.length > 11) {
    symbol = symbol.slice(0, 11)
  }

  const addToken = async () => {
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: address,
            symbol: symbol,
            decimals: Number(decimal),
          },
        },
      })
      .then((success) => {
        if (success) {
          toast('success', `${symbol} დაემატა ${wallet === 'Metamask' ? 'Metamask' : 'Trust Wallet'}-ში`)
        } else {
          toast('error', 'Something went wrong')
        }
      })
      .catch((error) => {
        toast('error', error.message)
      })
  }

  return (
    <div>
      {variant === 'text' ? (
        <div onClick={() => addToken()} className='inline-flex items-center gap-2 cursor-pointer duration-150 hover:no-underline'>
          <Typography className='hover:underline text-sm whitespace-nowrap'>საფულეში დამატება</Typography>
          <div className='shrink-0'>
            <Avatar src={wallet === 'Metamask' ? MetamaskIcon : TrustWalletIcon} alt='metamask' className='w-5' />
          </div>
        </div>
      ) : (
        <div onClick={() => addToken()} className='px-3 py-2 bg-violet-800 rounded-lg inline-flex items-center gap-2 cursor-pointer duration-150 hover:bg-violet-900'>
          <Typography className='hover:underline text-sm'>საფულეში დამატება</Typography>
          <div>
            <Avatar src={wallet === 'Metamask' ? MetamaskIcon : TrustWalletIcon} alt='metamask' className='w-5' />
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
