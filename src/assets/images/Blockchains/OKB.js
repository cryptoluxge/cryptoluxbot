import React from 'react'

const OKB = ({ className = '', color }) => {
  return (
    <svg className={`fill-current duration-150 ${color ? color : 'text-black dark:text-white'} ${className}`} viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='39.9999' cy='18.1132' r='18.1132' fill='white' />
      <circle cx='39.9999' cy='61.8868' r='18.1132' fill='white' />
      <circle cx='61.8866' cy='40' r='18.1132' fill='white' />
      <circle cx='18.1132' cy='40' r='18.1132' fill='white' />
      <path d='M35.7368 35.7358C29.1551 34.1355 24.0164 28.9967 22.416 22.4151C28.9842 24.0393 34.1125 29.1677 35.7368 35.7358Z' fill='#D9D9D9' />
      <path d='M22.377 57.6226C23.9773 51.041 29.1161 45.9022 35.6977 44.3019C34.0735 50.8701 28.9451 55.9984 22.377 57.6226Z' fill='#D9D9D9' />
      <path d='M44.2637 44.2642C50.8453 45.8645 55.9841 51.0033 57.5844 57.5849C51.0163 55.9607 45.8879 50.8323 44.2637 44.2642L44.2637 44.2642Z' fill='#D9D9D9' />
      <path d='M57.6235 22.3774C56.0231 28.959 50.8844 34.0978 44.3027 35.6981C45.927 29.1299 51.0553 24.0016 57.6235 22.3774Z' fill='#D9D9D9' />
    </svg>
  )
}

export default OKB
