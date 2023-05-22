import React from 'react'

const Fantom = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} viewBox='0 0 45 75' xmlns='http://www.w3.org/2000/svg'>
      <path d='M27 26.005L40.5 18.0905V33.9196L27 26.005ZM40.5 59.9246L22.5 70.4774L4.5 59.9246V41.4573L22.5 52.0101L40.5 41.4573V59.9246ZM4.5 18.0905L18 26.005L4.5 33.9196V18.0905ZM24.75 29.7739L38.25 37.6884L24.75 45.603V29.7739ZM20.25 45.603L6.75 37.6884L20.25 29.7739V45.603ZM38.25 14.3216L22.5 23.3668L6.75 14.3216L22.5 4.8995L38.25 14.3216ZM0 12.8141V62.1859L22.5 75L45 62.1859V12.8141L22.5 0L0 12.8141Z' />
    </svg>
  )
}

export default Fantom
