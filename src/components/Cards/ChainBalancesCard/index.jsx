import { useWeb3React } from '@web3-react/core'
import Card from 'components/Cards/Card'
import Skelaton from 'components/Skelaton'
import { BodyTd, BodyTr, HeadTh, HeadTr, Table, Tbody, Thead } from 'components/Table'
import Typography from 'components/Typography'
import { supportedEVMChains } from 'config'
import Alert from 'components/Alerts'

const Index = ({ data, isLoading }) => {
  const { chainId } = useWeb3React()
  return (
    <Card title='ბალანსი სხვა ქსელებზე' titleBorder={true}>
      {supportedEVMChains.some((chain) => chain.chainId === chainId) ? (
        <div className='overflow-scroll overflow-x-hidden max-h-[210px]'>
          {!isLoading ? (
            <div>
              <Table>
                <Thead>
                  <HeadTr>
                    <HeadTh>ქსელი</HeadTh>
                    <HeadTh>ბალანსი</HeadTh>
                    <HeadTh>USD</HeadTh>
                  </HeadTr>
                </Thead>
                <Tbody>
                  {data.map((x, index) => (
                    <BodyTr key={index}>
                      <BodyTd isLast={index !== data.length - 1} rightCorner={index === data.length - 1}>
                        <div className='flex items-center gap-2'>
                          <div className={`w-[25px] h-[25px] bg-primary rounded-md flex justify-center`}>{x.logo}</div>
                          <h1 className='text-lightText dark:text-darkText font-light'>{x.name}</h1>
                        </div>
                      </BodyTd>
                      <BodyTd isLast={index !== data.length - 1}>
                        <Typography>{Number(x.bal).toFixed(4)}</Typography>
                      </BodyTd>
                      <BodyTd isLast={index !== data.length - 1} leftCorner={index === data.length - 1}>
                        <Typography>${Number(x.usd).toLocaleString('en-US')}</Typography>
                      </BodyTd>
                    </BodyTr>
                  ))}
                </Tbody>
              </Table>
            </div>
          ) : (
            <div className='p-2'>
              <Skelaton width='full' />
            </div>
          )}
        </div>
      ) : (
        <div className='p-2'>
          <Alert variant='warning' text='არასწორი ქსელი!' />
        </div>
      )}
    </Card>
  )
}

export default Index
