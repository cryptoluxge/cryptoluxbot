import Card from 'components/Cards/Card'
import Alert from 'components/Alerts'
import Avatar from 'components/Avatar'
import Skelaton from 'components/Skelaton'
import Typography from 'components/Typography'

const index = ({ title, data, isFetching }) => {
  return (
    <Card title={title} titleBorder={true}>
      <div>
        {!isFetching ? (
          <div>
            {data.status === true ? (
              <div>
                {data.data.slice(0, 10).map((x, index) => (
                  <div key={index}>
                    <div className={`duration-150 hover:bg-lightHover dark:hover:bg-darkHover p-2 ${index === 9 && 'rounded-b-lg'}`}>
                      <a href={x.token_link} target='_blank' rel='noreferrer'>
                        <div className='flex items-center justify-between space-x-2'>
                          <div className='flex items-center space-x-2'>
                            <Avatar src={x.token_logo} alt='a' className='w-8 rounded-full' />
                            <Typography className='text-sm'>{x.token_name}</Typography>
                          </div>
                          <Typography className='text-sm'>{x.token_price}</Typography>
                        </div>
                      </a>
                    </div>
                    {index !== 9 && <div className='duration-150 border-[1px] border-b border-lightBorder dark:border-darkBorder'></div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className='p-2'>
                <Alert variant='error' text='API კავშირი ვერ მოხერხდა!' />
              </div>
            )}
          </div>
        ) : (
          <div className='animate-pulse p-2'>
            <div>
              <div className='flex items-center justify-between space-x-2'>
                <div className='flex items-center space-x-2'>
                  <div className='rounded-full bg-zinc-500 h-8 w-8'></div>
                  <Skelaton />
                </div>
                <Skelaton />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default index
