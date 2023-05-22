import Alert from 'components/Alerts'
import Borderline from 'components/Borderline'
import Card from 'components/Cards/Card'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import Pagination from 'components/Pagination'
import { Option, Select } from 'components/Select'
import Loading from 'components/Skelaton'
import { BodyTd, BodyTr, HeadTh, HeadTr, Table, Tbody, Thead } from 'components/Table'
import Typography from 'components/Typography'
import { getChainDataById } from 'utils/WalletHelpers'
import { useState } from 'react'

const TransactionsTable = ({ account, data, chainId, isTxLoading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const totalPages = Math.ceil(data?.data?.length / itemsPerPage)

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10)
    setItemsPerPage(newItemsPerPage)
  }

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handleClickFirst = () => {
    setCurrentPage(1)
  }

  const handleClickLast = () => {
    setCurrentPage(totalPages)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const itemsToDisplay = data?.data?.slice(startIndex, endIndex)
  return (
    <div className='grid grid-cols-1 w-full'>
      <Card title='ტრანზაქციები' titleBorder={true}>
        {!isTxLoading ? (
          <div>
            {data.status === 200 ? (
              <div>
                {data.data.length > 0 ? (
                  <div>
                    <div className='p-2'>
                      <div className='flex flex-col sm:flex-row md:justify-between md:items-center'>
                        <Typography className='text-sm'>სულ ნაპოვნია {Object.keys(data.data).length} ტრანზაქცია</Typography>
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          handleClickPrev={handleClickPrev}
                          handleClickNext={handleClickNext}
                          handleClickFirst={handleClickFirst}
                          handleClickLast={handleClickLast}
                          itemsToDisplay={itemsToDisplay}
                        />
                      </div>
                    </div>
                    <Borderline />
                    <Table>
                      <Thead>
                        <HeadTr>
                          <HeadTh>ჰეში</HeadTh>
                          <HeadTh>ბლოკი</HeadTh>
                          <HeadTh>დრო</HeadTh>
                          <HeadTh>საიდან</HeadTh>
                          <HeadTh>სად</HeadTh>
                          <HeadTh>რაოდენობა</HeadTh>
                        </HeadTr>
                      </Thead>
                      <Tbody>
                        {itemsToDisplay?.map((tx, index) => (
                          <BodyTr key={index}>
                            <BodyTd isLast={index !== itemsToDisplay?.length - 1} rightCorner={index === itemsToDisplay?.length - 1}>
                              <AddressComponent address={tx.hash} chain='evm' chainId={chainId} type='tx' />
                            </BodyTd>
                            <BodyTd isLast={index !== itemsToDisplay?.length - 1}>
                              <Typography>{tx.block_number}</Typography>
                            </BodyTd>
                            <BodyTd isLast={index !== itemsToDisplay?.length - 1}>
                              <Typography className='whitespace-nowrap'>{String(tx.block_timestamp).replace('T', ' ').replace('.000Z', '')}</Typography>
                            </BodyTd>
                            <BodyTd isLast={index !== itemsToDisplay?.length - 1}>
                              <AddressComponent address={tx.from_address} chain='evm' chainId={chainId} type='wallet' color={String(tx.from_address).toLocaleLowerCase() === String(account).toLowerCase() && 'text-black'} />
                            </BodyTd>
                            <BodyTd isLast={index !== itemsToDisplay?.length - 1}>
                              <AddressComponent address={tx.to_address} chain='evm' chainId={chainId} type='wallet' color={String(tx.to_address).toLocaleLowerCase() === String(account).toLowerCase() && 'text-black'} />
                            </BodyTd>
                            <BodyTd isLast={index !== itemsToDisplay?.length - 1} leftCorner={index === itemsToDisplay?.length - 1}>
                              <Typography className='whitespace-nowrap'>
                                {(Number(tx.value) / 10 ** 18).toFixed(5)} {getChainDataById(chainId).coinSymbol}
                              </Typography>
                            </BodyTd>
                          </BodyTr>
                        ))}
                      </Tbody>
                    </Table>
                    <Borderline />
                    <div>
                      {!isTxLoading && (
                        <div>
                          {data.status === 200 && (
                            <div>
                              {Object.keys(data.data).length > 0 && (
                                <div className='flex flex-col sm:flex-row md:justify-between md:items-center p-2'>
                                  <div className='flex items-center gap-2'>
                                    <Typography>მანახე</Typography>
                                    <Select id='itemsShowNumber' value={itemsPerPage} onChange={handleItemsPerPageChange}>
                                      <Option value={10}>10</Option>
                                      <Option value={20}>20</Option>
                                      <Option value={50}>50</Option>
                                      <Option value={100}>100</Option>
                                    </Select>
                                    <Typography>ტრანზაქცია</Typography>
                                  </div>
                                  <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    handleClickPrev={handleClickPrev}
                                    handleClickNext={handleClickNext}
                                    handleClickFirst={handleClickFirst}
                                    handleClickLast={handleClickLast}
                                    itemsToDisplay={itemsToDisplay}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='p-2'>
                    <Alert variant='info' text='ტრანზაქციები არ გაქვთ!' />
                  </div>
                )}
              </div>
            ) : (
              <div className='p-2'>
                <Alert variant='error' text='API კავშირი ვერ მოხერხდა! ცადეთ მოგვიანებით!' />
              </div>
            )}
          </div>
        ) : (
          <div className='p-2'>
            <Loading width='full' />
          </div>
        )}
      </Card>
    </div>
  )
}

export default TransactionsTable
