import Avatar from 'components/Avatar'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'

const index = ({ logoURL, name, symbol, price, percentage }) => {
  return (
    <div className={`rounded-lg shadow-sm ${Number(percentage) > 0 ? 'shadow-green-500' : 'shadow-red-500'}`}>
      <Card>
        <div className='p-2'>
          <div className='flex items-center gap-2'>
            <div>
              <Avatar src={logoURL} alt={symbol} className='w-8 rounded-full' />
            </div>
            <div>
              <Typography>
                {name} ({String(symbol).toUpperCase()})
              </Typography>
              <div className='flex gap-1'>
                <Typography>${Number(price).toLocaleString('en-US')}</Typography>
                <Typography className='text-xs' color={`${Number(percentage) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Number(percentage).toFixed(2)}%
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default index
