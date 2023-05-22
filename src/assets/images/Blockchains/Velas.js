import React from 'react'

const Velas = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} width='62' height='55' viewBox='0 0 62 55' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M3.8381 6.79048L0 0H62L58.0143 6.79048H3.8381ZM7.67619 13.581L31 54.619L54.3238 13.581H7.67619ZM42.6619 20.519L31 40.8905L19.3381 20.3714H42.6619V20.519Z' fill='white' />
    </svg>
  )
}

export default Velas
