import Borderline from 'components/Borderline'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'

const Index = ({ data }) => {
  return (
    <div>
      <Card title='Dackieswap-ის ტასკები' variant='collapsible'>
        <div className=''>
          <div className='p-2'>
            <Typography className='text-sm'>გაკეთებული ტრანზაქციები: {data?.successTxs}</Typography>
            <Typography className='text-sm'>ჩავარდნილი ტრანზაქციები: {data?.failedTxs}</Typography>
          </div>
          {data?.length > 0 && (
            <div>
              {data?.swapTask?.data?.map((x, index) => (
                <div key={index}>
                  <Borderline />
                  <div className='flex items-center gap-1 bg-lightBackground dark:bg-darkBackground p-2'>
                    <Typography className='text-sm' color={`${x.isSwapped ? 'text-green-600' : 'text-red-600'}`}>
                      {x.text}
                    </Typography>
                  </div>
                </div>
              ))}
              {data?.addLiquidityTask?.data?.map((x, index) => (
                <div key={index}>
                  <Borderline />
                  <div className='flex items-center gap-1 bg-lightBackground dark:bg-darkBackground p-2'>
                    <Typography className='text-sm' color={`${x.isAdded ? 'text-green-600' : 'text-red-600'}`}>
                      {x.text}
                    </Typography>
                  </div>
                </div>
              ))}
              {data?.stakeLpTask?.data?.map((x, index) => (
                <div key={index}>
                  <Borderline />
                  <div className='flex items-center gap-1 bg-lightBackground dark:bg-darkBackground p-2'>
                    <Typography className='text-sm' color={`${x.isStaked ? 'text-green-600' : 'text-red-600'}`}>
                      {x.text}
                    </Typography>
                  </div>
                </div>
              ))}
              {data?.harvestFarmsTask?.data?.map((x, index) => (
                <div key={index}>
                  <Borderline />
                  <div className='flex items-center gap-1 bg-lightBackground dark:bg-darkBackground p-2'>
                    <Typography className='text-sm' color={`${x.isHarvested ? 'text-green-600' : 'text-red-600'}`}>
                      {x.text}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Index
