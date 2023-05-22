const index = ({ children, color, className = '', ...rest }) => {
  return (
    <p {...rest} className={`duration-150 font-light ${color ? color : 'text-lightText dark:text-darkText'} ${className}`}>
      {children}
    </p>
  )
}

export default index
