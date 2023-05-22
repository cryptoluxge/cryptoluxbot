import Borderline from 'components/Borderline'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import moment from 'moment'
import { useEffect, useState } from 'react'

const Index = ({ nativeTxs, tokenTxs, nftTxs, firstAndLastTx, chainId }) => {
  const [daysOld, setDaysOld] = useState(0)

  const caluclateWalletAge = () => {
    const date = moment(nativeTxs.firstTx.block_timestamp)
    const currentDate = moment()
    const days = currentDate.diff(date, 'days')
    setDaysOld(days)
  }

  useEffect(() => {
    if (Object.keys(nativeTxs).length > 0) {
      caluclateWalletAge()
    }
    // eslint-disable-next-line
  }, [nativeTxs])

  return (
    <div className='w-full md:w-[350px]'>
      <Card title='ინფორმაცია' titleBorder={true}>
        <div className='flex items-center gap-1 p-1'>
          <Typography className='text-sm'>ტრანზაქციები:</Typography>
          <Typography className='text-sm'>{nativeTxs.status === 200 ? Object.keys(nativeTxs.data).length : 'ERROR'}</Typography>
        </div>
        <Borderline />
        <div className='flex items-center gap-1 p-1'>
          <Typography className='text-sm'>ტოკენების ტრანზაქციები:</Typography>
          <Typography className='text-sm'>{tokenTxs.status === 200 ? Object.keys(tokenTxs.data).length : 'ERROR'}</Typography>
        </div>
        <Borderline />
        <div className='flex items-center gap-1 p-1'>
          <Typography className='text-sm'>NFT ტრანზაქციები:</Typography>
          <Typography className='text-sm'>{nftTxs.status === 200 ? Object.keys(nftTxs.data).length : 'ERROR'}</Typography>
        </div>
        <Borderline />
        <div className='flex items-center gap-1 p-1'>
          <Typography className='text-sm'>საფულის ასაკი:</Typography>
          <Typography className='text-sm'>{daysOld} დღე</Typography>
        </div>
      </Card>
    </div>
  )
}

export default Index
