import Alert from 'components/Alerts'
import Card from 'components/Cards/Card'
import Typography from 'components/Typography'
import moment from 'moment'
import LoadingPulse from 'components/Skelaton'
import { useEffect, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { getUserStakedAptoads } from 'utils/Helpers/AptosHelpers/EcosystemProjects/Aptoads'
import TableView from './TableView'
import WithdrawButton from './WithdrawButton'
import Borderline from 'components/Borderline'

const Index = ({ walletAddress, stakedList, isChecking }) => {
  const [gridView, setGridView] = useState(true)
  const [data, setData] = useState([])
  const calculateStakedTime = (timestamp) => {
    const currentDate = moment()
    const stakedTime = moment(timestamp * 1000)
    var a = moment(String(currentDate.toString()))
    var b = moment(String(stakedTime.toString()))
    return a.diff(b, 'days')
  }

  const calculatePendingToken = (timestamp) => {
    const result = Number(calculateStakedTime(timestamp)) * 100
    return Number(result).toLocaleString('en-US')
  }

  const calculateTotalTokens = () => {
    var daysList = []
    var totalTokensList = []
    var totalPendingTokens = 0
    if (Object.keys(data).length > 0) {
      data.forEach((x) => {
        const days = calculateStakedTime(Number(x.token_stake_data.initial_lockup_timestamp))
        daysList.push(days)
      })
      daysList.map((x) => totalTokensList.push(x * 100))
    }

    totalPendingTokens = totalTokensList.reduce(function (a, b) {
      return a + b
    })

    return Number(totalPendingTokens).toLocaleString('en-US')
  }

  const getStakingData = async () => {
    const data = await getUserStakedAptoads(walletAddress)
    setData(data)
  }

  useEffect(() => {
    if (stakedList === undefined) {
      getStakingData()
    } else {
      setData(stakedList)
    }
    // eslint-disable-next-line
  }, [walletAddress, stakedList])

  return (
    <div>
      <Card title='Aptoads Staking' variant='collapsible'>
        <div className={`${gridView ? 'p-2' : ''}`}>
          {Object.keys(data).length > 0 ? (
            <div>
              {!data.hasOwnProperty('status') ? (
                <div className='max-h-[400px] overflow-y-auto'>
                  <div className={`${gridView ? '' : 'p-2'} flex items-center justify-between`}>
                    <div className='flex flex-col md:flex-row md:gap-3 '>
                      <Typography className='text-sm'>დაგროვებული: {calculateTotalTokens()} FLY</Typography>
                      <Typography className='text-sm'>სულ დასტეიკებულია: {data.length}</Typography>
                    </div>
                    <div className='flex items-center gap-1'>
                      <BiListUl onClick={() => setGridView(false)} className='text-white text-2xl cursor-pointer' />
                      <HiOutlineViewGrid onClick={() => setGridView(true)} className='text-white text-xl cursor-pointer' />
                    </div>
                  </div>
                  <Borderline className='mt-2 mb-2' />
                  {gridView ? (
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
                      {data.map((x) => (
                        <Card key={x.token.id.token_data_id.name}>
                          <div className='p-2'>
                            <div>
                              <img src={`https://aptoads.nyc3.digitaloceanspaces.com/mainnet/${String(x.token.id.token_data_id.name).split('#')[1]}.png`} alt={x.token.id.token_data_id.name} className='w-full rounded-lg' />
                              <Typography className='text-sm py-1' color='text-gray-400'>
                                {x.token.id.token_data_id.name}
                              </Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                              <Typography className='text-sm'>დაგროვებული FLY:</Typography>
                              <Typography className='text-sm'>{calculatePendingToken(Number(x.token_stake_data.initial_lockup_timestamp))}</Typography>
                            </div>
                            <div className='flex items-center justify-between'>
                              <Typography className='text-sm'>დასტეიკებულია:</Typography>
                              <Typography className='text-sm'>{calculateStakedTime(Number(x.token_stake_data.initial_lockup_timestamp))} დღე</Typography>
                            </div>
                            <Typography className='text-xs mt-1' color='text-gray-400'>
                              დასტეიკდა {moment(Number(x.token_stake_data.initial_lockup_timestamp) * 1000).format('DD/MM/YYYY HH:mm')}
                            </Typography>
                            {isChecking === true ? null : (
                              <WithdrawButton
                                data={x.token.id.token_data_id.name}
                                earnedFly={calculatePendingToken(Number(x.token_stake_data.initial_lockup_timestamp))}
                                daysStaked={calculateStakedTime(Number(x.token_stake_data.initial_lockup_timestamp))}
                                stakedAt={moment(Number(x.token_stake_data.initial_lockup_timestamp) * 1000).format('DD/MM/YYYY HH:mm')}
                              />
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <TableView data={data} isChecking={isChecking} />
                    </div>
                  )}
                </div>
              ) : (
                <Alert variant={data.statusId} text={data.statusText} />
              )}
            </div>
          ) : (
            <LoadingPulse width='full' />
          )}
        </div>
      </Card>
    </div>
  )
}

export default Index
