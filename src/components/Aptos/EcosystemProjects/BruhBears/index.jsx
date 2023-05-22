import Alert from 'components/Alerts'
import Card from 'components/Cards/Card'
import LoadingPulse from 'components/Skelaton'
import Typography from 'components/Typography'
import { useEffect, useState } from 'react'
import { BiListUl } from 'react-icons/bi'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { checkTavern } from 'utils/Helpers/AptosHelpers/EcosystemProjects/BruhTavern'
import TableView from './TableView'
import WithdrawButton from './WithdrawButton'
import Borderline from 'components/Borderline'

const Index = ({ walletAddress, stakedList, isChecking }) => {
  const [data, setData] = useState([])
  const [gridView, setGridView] = useState(true)

  const getTavernData = async () => {
    const getData = await checkTavern(walletAddress)
    setData(getData)
  }

  useEffect(() => {
    if (stakedList === undefined) {
      getTavernData()
    } else {
      setData(stakedList)
    }

    // eslint-disable-next-line
  }, [walletAddress, stakedList])

  return (
    <div>
      <Card title='Bruh Bears - Taverns' variant='collapsible'>
        <div className={`${gridView ? 'px-2 mt-2' : ''}`}>
          {Object.keys(data).length > 0 ? (
            <div>
              {data.status === 200 ? (
                <div>
                  {data.staked ? (
                    <div>
                      <div className={`${gridView ? '' : 'px-2 mt-2'} flex items-center justify-between`}>
                        <Typography className='text-sm'>სულ დასტეიკებული: {data.data.length}</Typography>
                        <div className='flex items-center gap-1'>
                          <BiListUl onClick={() => setGridView(false)} className='text-white text-2xl cursor-pointer' />
                          <HiOutlineViewGrid onClick={() => setGridView(true)} className='text-white text-xl cursor-pointer' />
                        </div>
                      </div>
                      <Borderline className='mt-2' />
                      {gridView ? (
                        <div className='max-h-[400px] overflow-y-auto rounded-lg py-2'>
                          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
                            {data.data.map((x, index) => (
                              <Card key={index}>
                                <div className='p-2'>
                                  <img src={`https://bafybeih6hezn7yyabgunclxhi5xa2sbfd6gnnc6un3lilcufq5yyywlpqm.ipfs.nftstorage.link/${String(x.tokens.name).split('#')[1]}.png`} alt={x.tokens.name} className='w-full rounded-lg' />
                                  <Typography className='text-sm py-1' color='text-gray-400'>
                                    {x.tokens.name}
                                  </Typography>
                                  <div>
                                    <div className='flex items-center justify-between'>
                                      <Typography className='text-sm'>პროგრესი:</Typography>
                                      <Typography className='text-sm'>{x.progress}%</Typography>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                      <Typography className='text-sm'>ლეველი:</Typography>
                                      <Typography className='text-sm'>{x.level}</Typography>
                                    </div>
                                    <Typography className='text-xs mt-1' color='text-gray-400'>
                                      დასტეიკდა {x.tokens.stakedAt}
                                    </Typography>
                                  </div>
                                  {isChecking === true ? null : <WithdrawButton data={x.tokens} />}
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <TableView data={data} isChecking={isChecking} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='mb-2'>
                      <Alert variant='info' text='Bruh Bears დასტეიკებული არ გაქვთ!' />
                    </div>
                  )}
                </div>
              ) : (
                <div className='mb-2'>
                  <Alert variant={data.statusCode} text={data.statusText} />
                </div>
              )}
            </div>
          ) : (
            <div className='mb-2'>
              <LoadingPulse width='full' />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Index
