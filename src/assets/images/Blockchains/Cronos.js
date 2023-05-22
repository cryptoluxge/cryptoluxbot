import React from 'react'

const Cronos = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} viewBox='0 0 74 86' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 21.3462L37 0L74 21.3462V64.0385L37 85.3846L0 64.0385V21.3462ZM22.3928 18.4555H51.5331L55.018 33.2792H18.982L22.3928 18.4555ZM29.8076 53.143L30.7715 43.8782L27.5832 35.5769H46.4168L43.3026 43.8782L44.1924 53.143H36.9258H29.8076ZM51.6072 68.7079H46.3427L40.0401 62.9267V59.9619L46.5651 53.736V43.8782L55.0922 38.3193L64.8056 45.6571L51.6072 68.7079ZM27.8056 68.7821L34.1082 62.9267V59.9619L27.5832 53.736V43.8782L18.982 38.3934L9.19439 45.6571L22.4669 68.7821H27.8056Z'
      />
    </svg>
  )
}

export default Cronos
