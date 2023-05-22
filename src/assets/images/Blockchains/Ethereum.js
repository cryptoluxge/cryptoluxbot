import React from 'react'

const Ethereum = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12.85 20.92'>
      <g>
        <g id='_1421394342400' data-name=' 1421394342400'>
          <polygon points='6.42 0 6.28 0.48 6.28 14.31 6.42 14.45 12.84 10.66 6.42 0' />
          <polygon points='6.42 0 0 10.66 6.42 14.45 6.42 7.74 6.42 0' />
          <polygon points='6.42 15.67 6.34 15.76 6.34 20.69 6.42 20.92 12.85 11.87 6.42 15.67' />
          <polygon points='6.42 20.92 6.42 15.67 0 11.87 6.42 20.92' />
          <polygon points='6.42 14.45 12.84 10.66 6.42 7.74 6.42 14.45' />
          <polygon points='0 10.66 6.42 14.45 6.42 7.74 0 10.66' />
        </g>
      </g>
    </svg>
  )
}

export default Ethereum
