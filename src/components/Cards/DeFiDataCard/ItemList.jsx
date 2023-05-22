import Typography from 'components/Typography'
import Borderline from 'components/Borderline'

const ItemList = ({ name, data }) => {
  return (
    <div>
      <div className='flex items-center justify-between duration-150 hover:bg-lightHover dark:hover:bg-darkHover'>
        <Typography>{name}</Typography>
        <Typography>{data}</Typography>
      </div>
      <Borderline />
    </div>
  )
}

export default ItemList
