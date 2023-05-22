import Card from 'components/Cards/Card'
import Typography from 'components/Typography'

const index = ({ type, name, chainId, symbol, logo, action }) => {
  return (
    <Card className='p-2'>
      <div className='flex items-center space-x-2'>
        <div className='w-[40px] h-[40px] bg-primary rounded-lg shadow-md flex items-center justify-center'>{logo}</div>
        <div>
          <Typography className='font-bold'>{name}</Typography>
          <Typography>{type}</Typography>
        </div>
      </div>
      <div className='py-3'>
        <div className='flex items-center justify-between'>
          <div>
            <Typography>Chain ID</Typography>
            <Typography className='font-bold'>{chainId}</Typography>
          </div>
          <div>
            <Typography>Symbol</Typography>
            <Typography className='font-bold'>{symbol}</Typography>
          </div>
        </div>
      </div>
      <div>{action}</div>
    </Card>
  )
}

export default index
