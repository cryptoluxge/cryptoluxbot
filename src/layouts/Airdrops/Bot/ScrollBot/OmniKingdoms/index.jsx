import React from 'react'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import Borderline from 'components/Borderline'

const index = ({ data }) => {
  return (
    <div>
      <Card title='BaseName-ის ტასკები' variant='collapsible'>
        <div className=''>
          <div className='p-2'>
            <Typography className='text-sm'>გაკეთებული ტრანზაქციები: {Object.keys(data).length ? data.successTxs : 0}</Typography>
            <Typography className='text-sm'>ჩავარდნილი ტრანზაქციები: {Object.keys(data).length ? data.failedTxs : 0}</Typography>
          </div>
          {Object.keys(data).length > 0 && (
            <div>
              {data.data.map((x, index) => (
                <div key={index}>
                  <Borderline />
                  <div className='flex items-center gap-1 bg-lightBackground dark:bg-darkBackground p-2'>
                    <Typography className='text-sm' color={`${x.isMinted ? 'text-green-600' : 'text-red-600'}`}>
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

export default index
