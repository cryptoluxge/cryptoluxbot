import Alert from 'components/Alerts'
import Borderline from 'components/Borderline'
import Card from 'components/Cards/Card'
import AddressComponent from 'components/CryptoComponents/AddressComponent'
import Pagination from 'components/Pagination'
import { Option, Select } from 'components/Select'
import Loading from 'components/Skelaton'
import { BodyTd, BodyTr, HeadTh, HeadTr, Table, Tbody, Thead } from 'components/Table'
import Typography from 'components/Typography'
import { Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { getRPCUrlById } from 'utils/getRPCUrl'

const TransactionsTable = ({ account, data, chainId, isTxLoading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [itemsToDisplay, setItemsToDisplay] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean)

  const totalPages = Math.ceil(data?.data?.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

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

  const getNftDetails = async (items) => {
    const ABI = [
      { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
      { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
    ]

    const provider = new ethers.JsonRpcProvider(getRPCUrlById(chainId))
    const updatedItemsToDisplay = []
    setIsLoading(true)

    for (const x of items) {
      const nftContract = new Contract(x.token_address, ABI, provider)
      const name = await nftContract.name()
      const symbol = await nftContract.symbol()
      x.token_name = name
      x.token_symbol = symbol
      updatedItemsToDisplay.push({ ...x, token_name: name, token_symbol: symbol })
    }

    setIsLoading(false)
    setItemsToDisplay(updatedItemsToDisplay)
  }

  useEffect(() => {
    if (!isTxLoading) {
      const items = data?.data?.slice(startIndex, endIndex)
      getNftDetails(items)
    }
    // eslint-disable-next-line
  }, [currentPage, itemsPerPage, isTxLoading])

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
                    {!isLoading ? (
                      <Table>
                        <Thead>
                          <HeadTr>
                            <HeadTh>ჰეში</HeadTh>
                            <HeadTh>ბლოკი</HeadTh>
                            <HeadTh>დრო</HeadTh>
                            <HeadTh>საიდან</HeadTh>
                            <HeadTh>სად</HeadTh>
                            <HeadTh>Item</HeadTh>
                          </HeadTr>
                        </Thead>
                        <Tbody>
                          {itemsToDisplay?.map((tx, index) => (
                            <BodyTr key={index}>
                              <BodyTd isLast={index !== itemsToDisplay?.length - 1}>
                                <AddressComponent address={tx.transaction_hash} chain='evm' chainId={chainId} type='tx' />
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
                              <BodyTd isLast={index !== itemsToDisplay?.length - 1}>
                                <div className='flex flex-col'>
                                  <Typography>
                                    {tx.token_symbol} #{tx.token_id}
                                  </Typography>
                                  <Typography>{tx.token_name}</Typography>
                                </div>
                              </BodyTd>
                            </BodyTr>
                          ))}
                        </Tbody>
                      </Table>
                    ) : (
                      <div className='p-2'>
                        <Loading width='full' />
                      </div>
                    )}
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
