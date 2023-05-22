import React from 'react'

const Linea = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.56 24.92'>
      <g>
        <polygon points='4.44 3.84 4.44 20.48 19.74 20.48 19.74 24.92 0 24.92 0 3.84 4.44 3.84' />
        <circle cx='19.59' cy='3.97' r='3.97' />
      </g>
    </svg>
  )
}

export default Linea
