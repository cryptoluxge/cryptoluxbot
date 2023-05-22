import React from 'react'

const Base = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.25 25.3'>
      <path className='cls-1' d='M13,26.65A12.65,12.65,0,1,0,.37,12.94H17.09v2.12H.37A12.66,12.66,0,0,0,13,26.65Z' transform='translate(-0.37 -1.35)' />
    </svg>
  )
}

export default Base
