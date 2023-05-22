const ItemList = ({ name, logo, color, isFirst, isLast }) => {
  return (
    <div>
      <div className={`flex items-center duration-75 p-2 hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer ${isFirst && 'rounded-t-md'} ${isLast && 'rounded-b-md'}`}>
        <div className={`bg-${color} w-[30px] h-[30px] mr-2 rounded-md flex justify-center items-center`}>{logo}</div>
        <a href='#/' className='text-lightText dark:text-darkText text-sm'>
          {name}
        </a>
      </div>
      {!isLast && <div className='border-lightBorder dark:border-darkBorder w-full' style={{ borderWidth: 0.1 }}></div>}
    </div>
  )
}

export default ItemList
