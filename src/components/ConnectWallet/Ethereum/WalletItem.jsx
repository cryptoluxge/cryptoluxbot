import Avatar from 'components/Avatar'

const WalletItem = ({ name, icon, isInstalled }) => {
  return (
    <button
      disabled={!isInstalled}
      className='disabled:bg-zinc-400 dark:disabled:bg-zinc-900 w-full disabled:cursor-not-allowed group flex justify-between items-center px-3 py-2 bg-lightBorder dark:bg-darkBorder rounded-lg duration-150 hover:bg-primary'>
      <div className='flex items-center'>
        <Avatar disabled={!isInstalled} src={icon} alt='' className='w-5 disabled:grayscale' />
        <div disabled={!isInstalled} className='flex-1 ml-3 disabled:text-zinc-900 text-lightText dark:text-darkText group-hover:text-white disabled:group-hover:text-darkText text-sm'>
          {name}
        </div>
      </div>
      {!isInstalled && <span className='inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs text-white  font-medium bg-red-800 rounded-md'>არ არის დაყენებული</span>}
    </button>
  )
}

export default WalletItem
