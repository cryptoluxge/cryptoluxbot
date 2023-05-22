import React from 'react'

const HeadTh = ({ children }) => {
  return (
    <th scope='col' className='duration-150 border-b border-lightBorder dark:border-darkBorder px-6 py-3 whitespace-nowrap'>
      {children}
    </th>
  )
}

export default HeadTh
