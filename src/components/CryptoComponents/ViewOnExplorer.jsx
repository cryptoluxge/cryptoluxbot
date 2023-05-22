import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import Typography from 'components/Typography'
import { getExplorerURL } from 'utils/getExplorerURL'

const ViewOnExplorer = ({ text, chainType, chainId, dataType, data }) => {
  return (
    <div>
      <div className='flex items-center gap-2 cursor-pointer'>
        <FiExternalLink className='text-lightText dark:text-darkText flex-nowrap' />
        <a href={getExplorerURL(chainType, chainId, dataType, data)} target='_blank' rel='noreferrer' className='flex items-center gap-1 duration-150 cursor-pointer text-sm'>
          <Typography className='text-sm whitespace-nowrap' color='text-lightText dark:text-darkText'>
            {text ? text : 'ნახე Explorer-ზე'}
          </Typography>
        </a>
      </div>
    </div>
  )
}

export default ViewOnExplorer
