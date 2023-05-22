const index = ({ className = '', ...rest }) => {
  return <input {...rest} className={`duration-150 rounded-lg w-full p-2 bg-lightCard dark:bg-darkBackground border-[1px] border-lightHover dark:border-darkBorder text-primary focus:outline-none ${className}`} />
}

export default index
