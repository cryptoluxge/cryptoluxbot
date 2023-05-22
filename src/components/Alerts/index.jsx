import { AiFillCheckCircle, AiFillCloseCircle, AiFillWarning } from 'react-icons/ai'
import { MdInfo } from 'react-icons/md'
import Typography from 'components/Typography'

const index = ({ variant, text }) => {
  return (
    <div>
      {variant === 'info' ? (
        <div className='flex p-3 text-sm bg-teal-400 dark:bg-teal-900 rounded-lg border-[1px] border-teal-500 drop-shadow-md' role='alert'>
          <MdInfo className='text-white dark:text-teal-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className='sr-only'>Info</span>
          <div>
            <Typography className='text-sm w-full' color='text-white'>
              {text}
            </Typography>
          </div>
        </div>
      ) : null}
      {variant === 'success' ? (
        <div className='flex p-3 text-sm bg-green-400 dark:bg-green-900 rounded-lg border-[1px] border-green-500 drop-shadow-md' role='alert'>
          <AiFillCheckCircle className='text-white dark:text-green-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className='sr-only'>success</span>
          <div>
            <Typography className='text-sm w-full' color='text-white'>
              {text}
            </Typography>
          </div>
        </div>
      ) : null}
      {variant === 'warning' ? (
        <div className='flex p-3 text-sm bg-yellow-500 dark:bg-yellow-900 rounded-lg border-[1px] border-yellow-500 drop-shadow-md' role='alert'>
          <AiFillWarning className='text-white dark:text-yellow-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className='sr-only'>warning</span>
          <div>
            <Typography className='text-sm w-full' color='text-white'>
              {text}
            </Typography>
          </div>
        </div>
      ) : null}
      {variant === 'error' ? (
        <div className='flex p-3 text-sm bg-red-400 dark:bg-red-900 rounded-lg border-[1px] border-red-500 drop-shadow-md' role='alert'>
          <AiFillCloseCircle className='text-white dark:text-red-500 inline flex-shrink-0 text-[20px] mr-2' />
          <span className='sr-only'>error</span>
          <div>
            <Typography className='text-sm w-full' color='text-white'>
              {text}
            </Typography>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default index
