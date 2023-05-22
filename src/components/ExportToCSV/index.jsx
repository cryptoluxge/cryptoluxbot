import React from 'react'
import { convertToCSV, downloadCSV } from 'utils/exportExcel'
import { SiMicrosoftexcel } from 'react-icons/si'
import Typography from 'components/Typography'

const Index = ({ data }) => {
  const exportData = () => {
    const csv = convertToCSV(data)
    downloadCSV(csv)
  }

  return (
    <div onClick={() => exportData()} className='border-[1px] duration-150 border-lightBorder dark:border-darkBorder p-2 rounded-lg cursor-pointer'>
      <div className='flex items-center gap-2'>
        <Typography>Export</Typography>
        <SiMicrosoftexcel className='duration-150 text-lightText dark:text-darkText' />
      </div>
    </div>
  )
}

export default Index
