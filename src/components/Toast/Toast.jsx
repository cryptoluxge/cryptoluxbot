import { useWeb3React } from '@web3-react/core'
import { useToastDispatchContext } from 'context/ToastContext'
import { AiFillCheckCircle, AiFillClockCircle, AiFillCloseCircle } from 'react-icons/ai'
import { shortAddress } from 'utils/WalletHelpers'
import { getExplorerURL } from 'utils/getExplorerURL'
import Typography from 'components/Typography'

export default function Toast({ type, title, message, txHash, chain, networkId, id }) {
  const { active, chainId } = useWeb3React()
  const dispatch = useToastDispatchContext()
  return (
    <>
      <div className='max-w-md w-full duration-150  bg-lightCard dark:bg-darkCard shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mt-2 borderborder-lightBorder dark:border-darkBorder'>
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            {type === 'success' ? <AiFillCheckCircle className='text-green-500 text-[20px]' /> : null}
            {type === 'error' ? <AiFillCloseCircle className='text-red-500 text-[20px]' /> : null}
            {type === 'loading' ? <AiFillClockCircle className='text-yellow-500 text-[20px]' /> : null}
            <div className='ml-3 flex-1'>
              <Typography className='text-sm font-medium'>{title}</Typography>
              {message && (
                <Typography className='mt-1 text-sm' color='text-gray-500'>
                  {message}
                </Typography>
              )}

              {txHash && (
                <a href={`${getExplorerURL(chain, active ? chainId : networkId, 'tx', txHash)}`} target='_blank' rel='noreferrer' className='mt-1 text-sm text-gray-500'>
                  ნახე: {shortAddress(txHash, 5)}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className='flex'>
          <button
            onClick={() => {
              dispatch({ type: 'DELETE_TOAST', id: id })
            }}
            className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-yellow-600 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500'>
            X
          </button>
        </div>
      </div>
    </>
  )
}
