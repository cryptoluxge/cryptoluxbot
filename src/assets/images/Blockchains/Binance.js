import React from 'react'

const Binance = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} viewBox='0 0 26 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='-0.000366211' y='13.983' width='4.15405' height='4.16267' transform='rotate(-44.916 -0.000366211 13.983)' />
      <rect x='10.0356' y='13.9822' width='4.21865' height='4.2176' transform='rotate(-44.916 10.0356 13.9822)' />
      <path fillRule='evenodd' clipRule='evenodd' d='M13.0193 1.00596L13.0096 0.996277L5.03 8.9759L7.95644 11.9023L13.0088 6.84995L18.056 11.912L20.9861 8.99041L15.9347 3.9241L15.9361 3.92271L14.9892 2.97587L13.0222 1.00307L13.0193 1.00596Z' />
      <path fillRule='evenodd' clipRule='evenodd' d='M13.0003 27.0256L15.9375 24.0971L15.9278 24.0873L21.002 19.0131L18.0702 16.0813L13.0003 21.1512L7.94131 16.0774L5.00414 19.006L13.0003 27.0256Z' />
      <rect x='20.1402' y='13.9864' width='4.1498' height='4.13727' transform='rotate(-44.916 20.1402 13.9864)' />
    </svg>
  )
}

export default Binance
