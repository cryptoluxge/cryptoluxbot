import Skelaton from 'components/Skelaton'
import Typography from 'components/Typography'
import Card from './Card'

const MiniCard = ({ title, data, icon, isLoading }) => {
  return (
    <Card className='p-2'>
      <div className='flex items-center justify-between'>
        <div>
          <Typography>{title}</Typography>
          {!isLoading ? (
            <Typography>{data}</Typography>
          ) : (
            <div>
              <Skelaton width='full' />
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-md bg-primary flex justify-center items-center`}>{icon}</div>
      </div>
    </Card>
  )
}

export default MiniCard
