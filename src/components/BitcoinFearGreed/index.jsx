import React, { useState, useEffect } from 'react'
import Card from 'components/Cards/Card'
import { getBitcoin, getGreedIndex } from 'utils/APIs/CryptoLuxAPI'
import Circle from './SemiCircle'
import Alert from 'components/Alerts'
import Skelaton from 'components/Skelaton'
import Typography from 'components/Typography'
import Borderline from 'components/Borderline'

const Index = () => {
  const [isLoading, setIsLoading] = useState(Boolean)
  const [btcIndex, setBtcIndex] = useState([])
  const [bitcoinData, setBitcoinData] = useState([])

  const words = { Greed: 'სიხარბე', Fear: 'შიში', Neutral: 'ნეიტრალური' }
  const wordsColor = { Greed: 'text-green-500', Fear: 'text-red-500', Neutral: 'text-yellow-500' }
  const months = { 1: 'ინვარი', 2: 'თებერვალი', 3: 'მარტი', 4: 'აპრილი', 5: 'მაისი', 6: 'ივნისი', 7: 'ივლისი', 8: 'აგვისტო', 9: 'სექტემბერი', 10: 'ოქტომბერი', 11: 'ნოემბერი', 12: 'დეკემბერი' }

  const getDate = (date) => {
    const splitText = String(date).split(' ')[0]
    const getDay = splitText.split('-')[2]
    const getMonth = splitText.split('-')[1]
    return `${getDay} ${months[Number(getMonth)]}`
  }

  const fetchData = async () => {
    setIsLoading(true)
    const greedIndex = await getGreedIndex()
    setBtcIndex(greedIndex)
    const btc = await getBitcoin()
    setBitcoinData(btc)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Card title='Bitcoin Fear & Greed Index' titleBorder={true}>
        <div>
          {!isLoading ? (
            <div>
              {btcIndex.status === 200 ? (
                <div>
                  <div className='flex items-center justify-center mt-3'>
                    <Circle value={Number(btcIndex.data.data[0].value)} />
                  </div>
                  <Borderline />
                  <div>
                    {bitcoinData.status === 200 && bitcoinData.data.status === true ? (
                      <div>
                        <div className='p-2 space-y-2'>
                          <div
                            className={`${
                              Number(bitcoinData.data.data.price_change) > 0 ? 'bg-green-600 dark:bg-green-900 border-[1px] border-green-600' : 'bg-red-600 dark:bg-red-900 border-[1px] border-red-600'
                            } duration-150 p-1 gap-2 rounded-md text-white text-sm flex items-center`}>
                            <Typography className='text-sm' color='text-white'>
                              ფასი: ${Number(bitcoinData.data.data.price).toLocaleString('en-US')}
                            </Typography>
                            <div className={`${Number(bitcoinData.data.data.price_change) > 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-1 rounded-lg`}>{bitcoinData.data.data.price_change}%</div>
                          </div>
                          <div
                            className={`${
                              Number(bitcoinData.data.data.market_cap_change) > 0 ? 'bg-green-600 dark:bg-green-900 border-[1px] border-green-600' : 'bg-red-600 dark:bg-red-900 border-[1px] border-red-600'
                            } duration-150 p-1 gap-2 rounded-md text-white text-sm flex items-center`}>
                            <Typography className='text-sm' color='text-white'>
                              კაპ: ${Number(bitcoinData.data.data.market_cap).toLocaleString('en-US')}
                            </Typography>
                            <div className={`${Number(bitcoinData.data.data.market_cap_change) > 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-1 rounded-lg`}>{bitcoinData.data.data.market_cap_change}%</div>
                          </div>
                          <div
                            className={`${
                              Number(bitcoinData.data.data.volume_change) > 0 ? 'bg-green-600 dark:bg-green-900 border-[1px] border-green-600' : 'bg-red-600 dark:bg-red-900 border-[1px] border-red-600'
                            } duration-150 p-1 gap-2 rounded-md text-white text-sm flex items-center`}>
                            <Typography className='text-sm' color='text-white'>
                              ნავაჭრი: ${Number(bitcoinData.data.data.volume).toLocaleString('en-US')}
                            </Typography>
                            <div className={`${Number(bitcoinData.data.data.volume_change) > 0 ? 'bg-green-500' : 'bg-red-500'} px-2 py-1 rounded-lg`}>{bitcoinData.data.data.volume_change}%</div>
                          </div>
                        </div>
                        <div className='duration-150 border-[1px] border-b border-lightBorder dark:border-darkBorder'></div>
                      </div>
                    ) : (
                      <div className='p-2'>
                        <Alert variant='error' text='CMC API კავშირი ვერ მოხერხდა! ცადეთ მოგვიანებით!' />
                      </div>
                    )}
                    {btcIndex.data.data.map((x, index) => (
                      <div key={index}>
                        <div className={`flex items-center p-2 gap-1 duration-150 hover:bg-lightHover dark:hover:bg-darkHover ${index === 5 && 'rounded-b-lg'}`}>
                          <Typography className='text-sm'>{getDate(x.date)}:</Typography>
                          <Typography className='text-sm' color={`${wordsColor[x.value_classification]} `}>
                            {Number(x.value)} {words[x.value_classification]}
                          </Typography>
                        </div>
                        {index !== 5 && <div className='duration-150 border-[1px] border-b border-lightBorder dark:border-darkBorder'></div>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='p-2'>
                  <Alert variant='error' text='API კავშირი ვერ მოხერხდა! ცადეთ მოგვიანებით!' />
                </div>
              )}
            </div>
          ) : (
            <div className='p-2'>
              <Skelaton width='full' />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Index
