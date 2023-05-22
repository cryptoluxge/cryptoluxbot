import React from 'react'

const BodyTr = ({ children, ...rest }) => {
  return (
    <tr {...rest} className={`w-full cursor-pointer duration-150 hover:bg-lightHover dark:hover:bg-darkHover rounded-lg`}>
      {children}
    </tr>
  )
}

export default BodyTr
