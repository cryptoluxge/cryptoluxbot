import { useWeb3React } from '@web3-react/core'
import Alert from 'components/Alerts'
import Card from 'components/Cards/Card'
import Skelaton from 'components/Skelaton'
import { BodyTd, BodyTr, HeadTh, HeadTr, Table, Tbody, Thead } from 'components/Table'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { shortAddress } from 'utils/WalletHelpers'
import { getExplorerURL } from 'utils/getExplorerURL'
import { supportedEVMChains } from 'config'

const Index = ({ data, isLoading }) => {
  const { account, chainId } = useWeb3React()
  if (data?.status === 200) {
    data?.data?.sort((a, b) => Number(b.block_number) - Number(a.block_number))
  }

  return (
    <Card title='ბოლო ტრანზაქციები' titleBorder={true}>
      {supportedEVMChains.some((chain) => chain.chainId === chainId) ? (
        <div className='overflow-scroll overflow-x-hidden max-h-[210px]'>
          {!isLoading ? (
            <div>
              {data.status === 200 ? (
                <div>
                  {data.data.length > 0 ? (
                    <Table>
                      <Thead>
                        <HeadTr>
                          <HeadTh>საიდან</HeadTh>
                          <HeadTh>სად</HeadTh>
                          <HeadTh>ჰეში</HeadTh>
                        </HeadTr>
                      </Thead>
                      <Tbody>
                        {data.data.map((x, index) => (
                          <BodyTr key={index}>
                            <BodyTd isLast={index !== data.data.length - 1} rightCorner={index === data.data.length - 1}>
                              <div className='flex items-center gap-1'>
                                {x.from_address === account.toLowerCase() ? <BsFillArrowUpCircleFill className='text-xl text-red-500' /> : <BsFillArrowDownCircleFill className='text-xl text-green-500' />}
                                <a href={getExplorerURL('evm', chainId, 'wallet', x.from_address)} target='_blank' rel='noreferrer' className='text-sm text-lightText dark:text-darkText'>
                                  {x.from_address === account.toLowerCase() ? 'ჩემიდან' : shortAddress(x.from_address, 3)}
                                </a>
                              </div>
                            </BodyTd>
                            <BodyTd isLast={index !== data.data.length - 1}>
                              <a href={getExplorerURL('evm', chainId, 'wallet', x.to_address)} target='_blank' rel='noreferrer' className='text-sm text-lightText dark:text-darkText'>
                                {x.to_address === account.toLowerCase() ? 'ჩემთან' : shortAddress(x.to_address, 3)}
                              </a>
                            </BodyTd>
                            <BodyTd isLast={index !== data.data.length - 1} leftCorner={index === data.data.length - 1}>
                              <a href={getExplorerURL('evm', chainId, 'tx', x.hash)} target='_blank' rel='noreferrer' className='text-sm text-lightText dark:text-darkText'>
                                {shortAddress(x.hash, 5)}
                              </a>
                            </BodyTd>
                          </BodyTr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    <div className='p-2'>
                      <Alert variant='info' text='ტრანზაქციები არ გაქვთ.' />
                    </div>
                  )}
                </div>
              ) : (
                <div className='p-2'>
                  <Alert variant='error' text='API კავშირი ვერ მოხერხდა! ცადეთ მოგვიანებით.' />
                </div>
              )}
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
