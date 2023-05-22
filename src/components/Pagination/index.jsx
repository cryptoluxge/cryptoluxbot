import React from 'react'
import Typography from 'components/Typography'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'

const index = ({ currentPage, totalPages, handleClickPrev, handleClickNext, handleClickFirst, handleClickLast }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  return (
    <div className='flex items-center gap-1'>
      <div className={`group duration-150 ${!isFirstPage && 'cursor-pointer'} ${!isFirstPage && 'hover:bg-primary'} p-2 border-[1px] border-lightBorder dark:border-darkBorder rounded-md`} onClick={!isFirstPage ? handleClickFirst : undefined}>
        <BiFirstPage className={`duration-150 ${isFirstPage ? 'text-lightText dark:text-darkText' : 'text-primary dark:text-white group-hover:text-white'} text-xl`} />
      </div>
      <div className={`group duration-150 ${!isFirstPage && 'cursor-pointer'} ${!isFirstPage && 'hover:bg-primary'} p-2 border-[1px] border-lightBorder dark:border-darkBorder rounded-md`} onClick={!isFirstPage ? handleClickPrev : undefined}>
        <FiArrowLeft className={`duration-150 ${isFirstPage ? 'text-lightText dark:text-darkText' : 'text-primary dark:text-white group-hover:text-white'} text-xl`} />
      </div>
      <div className='duration-150 border-[1px] border-lightBorder dark:border-darkBorder p-2 rounded-sm'>
        <Typography className='text-sm'>
          გვერდი {currentPage} / {totalPages}
        </Typography>
      </div>
      <div className={`group duration-150 ${!isLastPage && 'cursor-pointer'} ${!isLastPage && 'hover:bg-primary'} p-2 border-[1px] border-lightBorder dark:border-darkBorder rounded-md`} onClick={!isLastPage ? handleClickNext : undefined}>
        <FiArrowRight className={`duration-150 ${isLastPage ? 'text-lightText dark:text-darkText' : 'text-primary dark:text-white group-hover:text-white'} text-xl`} />
      </div>
      <div className={`group duration-150 ${!isLastPage && 'cursor-pointer'} ${!isLastPage && 'hover:bg-primary'} p-2 border-[1px] border-lightBorder dark:border-darkBorder rounded-md`} onClick={!isLastPage ? handleClickLast : undefined}>
        <BiLastPage className={`duration-150 ${isLastPage ? 'text-lightText dark:text-darkText' : 'text-primary dark:text-white group-hover:text-white'} text-xl`} />
      </div>
    </div>
  )
}

export default index
