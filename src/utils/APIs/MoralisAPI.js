import axios from 'axios'
import { supportedEVMChains } from 'config'
import { supportedChains } from 'config'
import { getTokenMetadata } from 'utils/Helpers/BlockchainHelpers/contractHelpers'

export const getNativeTransactions = async (walletAddress, chain) => {
  const naitveTxsList = []
  let cursor = null

  try {
    do {
      const url = `https://deep-index.moralis.io/api/v2/${walletAddress}?chain=${chain}${cursor ? `&cursor=${cursor}` : ''}`
      const response = await axios.get(url, { headers: { 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY } })

      if (response.status === 200) {
        if (Object.keys(response.data.result).length > 0) {
          const data = response.data
          const result = data.result
          if (result && result.length) {
            naitveTxsList.push(...result)
          }
          cursor = data.cursor
        } else {
          return { status: 200, data: [], totalTokenTxs: 0 }
        }
      } else {
        return { status: 404, data: [], totalTokenTxs: 0 }
      }
    } while (cursor !== '' && cursor !== null)
    return { status: 200, data: naitveTxsList, lastTx: naitveTxsList[0], firstTx: naitveTxsList[naitveTxsList.length - 1], totalTokenTxs: naitveTxsList.length }
  } catch (error) {
    return { status: 500, data: [], totalTokenTxs: 0 }
  }
}

export const getTokenTransactions = async (walletAddress, chain) => {
  const tokenTxsList = []
  let cursor = null

  try {
    do {
      const url = `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20/transfers?chain=${chain}${cursor ? `&cursor=${cursor}` : ''}`
      const response = await axios.get(url, { headers: { 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY } })

      if (response.status === 200) {
        if (Object.keys(response.data.result).length > 0) {
          const data = response.data
          const result = data.result
          if (result && result.length) {
            tokenTxsList.push(...result)
          }
          cursor = data.cursor
        } else {
          return { status: 200, data: [], totalTokenTxs: 0 }
        }
      } else {
        return { status: 404, data: [], totalTokenTxs: 0 }
      }
    } while (cursor !== '' && cursor !== null)
    return { status: 200, data: tokenTxsList, totalTokenTxs: tokenTxsList.length }
  } catch (error) {
    console.error(error)
    return { status: 500, data: [], totalTokenTxs: 0 }
  }
}

export const getNftTransactions = async (walletAddress, chain) => {
  const nftTxsList = []
  let cursor = null

  try {
    do {
      const url = `https://deep-index.moralis.io/api/v2/${walletAddress}/nft/transfers?chain=${chain}&format=decimal&direction=both${cursor ? `&cursor=${cursor}` : ''}`
      const response = await axios.get(url, { headers: { 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY } })

      if (response.status === 200) {
        if (Object.keys(response.data.result).length > 0) {
          const data = response.data
          const result = data.result
          if (result && result.length) {
            nftTxsList.push(...result)
          }
          cursor = data.cursor
        } else {
          return { status: 200, data: [], totalTokenTxs: 0 }
        }
      } else {
        return { status: 404, data: [], totalTokenTxs: 0 }
      }
    } while (cursor !== '' && cursor !== null)
    return { status: 200, data: nftTxsList, totalTokenTxs: nftTxsList.length }
  } catch (error) {
    console.error(error)
    return { status: 500, data: [], totalTokenTxs: 0 }
  }
}

export const getTokenBalances = async (walletAddress, chain, atBlockNumber, tokenAddress) => {
  const json = await axios(`https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=${chain}${atBlockNumber ? `&to_block=${atBlockNumber}` : ''}${tokenAddress ? `&token_addresses=${tokenAddress}` : ''}`, {
    headers: {
      'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY,
    },
  })
    .then((response) => response)
    .catch((error) => error.response)
  return json
}

export const getNftBalances = async (walletAddress, chain) => {
  const json = await axios(`https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=${chain}&format=decimal`, {
    headers: {
      'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY,
    },
  })
    .then((response) => response)
    .then((data) => data)
  return json
}

export const getMultiwalletNativeBalance = async (walletAddresses) => {
  let evmChains = Array(supportedChains)[0].filter((x) => x.chainType === 'evm')
  let finalData = []
  let balances = []
  try {
    for (const wallet of walletAddresses) {
      for (const chain of evmChains) {
        const json = await axios(`https://deep-index.moralis.io/api/v2/${wallet}/balance?chain=${chain.chainIdHex}`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY,
          },
        })
          .then((response) => response)
          .then((data) => data)

        if (json.status === 200) {
          balances.push({ status: 200, chainSymbol: chain.networkSymbol, chainName: chain.networkName, chainLogo: chain.logo, chainId: chain.chainId, balance: Number(json.data.balance) / 10 ** 18 })
        } else {
          balances.push({ status: 404, chainSymbol: chain.networkSymbol, chainName: chain.networkName, chainLogo: chain.logo, chainId: chain.chainId, balance: 'API ERROR' })
        }
      }
      finalData.push({ address: wallet, data: balances })
      balances = []
    }
    return finalData
  } catch (error) {
    console.log(error)
  }
}

export const getMultiWalletTokenBalance = async (walletAddresses) => {
  let evmChains = Array(supportedChains)[0].filter((x) => x.chainType === 'evm')
  let finalData = []
  let balances = []
  try {
    for (const wallet of walletAddresses) {
      for (const chain of evmChains) {
        const json = await axios(`https://deep-index.moralis.io/api/v2/${wallet}/erc20?chain=${chain.chainIdHex}`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY,
          },
        })
          .then((response) => response)
          .then((data) => data)

        if (json.status === 200) {
          balances.push({ status: 200, chainSymbol: chain.networkSymbol, chainName: chain.networkName, chainLogo: chain.logo, chainId: chain.chainId, balance: json.data })
        } else {
          balances.push({ status: 404, chainSymbol: chain.networkSymbol, chainName: chain.networkName, chainLogo: chain.logo, chainId: chain.chainId, balance: [] })
        }
      }
      finalData.push({ address: wallet, data: balances })
      balances = []
    }
    return finalData
  } catch (error) {
    console.log(error)
  }
}

export const getMultiWalletNftBalance = async (walletAddresses) => {
  let evmChains = Array(supportedChains)[0].filter((x) => x.chainType === 'evm')
  let finalData = []
  let balances = []
  try {
    for (const wallet of walletAddresses) {
      for (const chain of evmChains) {
        const json = await axios(`https://deep-index.moralis.io/api/v2/${wallet}/nft?chain=${chain.chainIdHex}&format=decimal`, {
          headers: {
            'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY,
          },
        })
          .then((response) => response)
          .then((data) => data)

        if (json.status === 200) {
          balances.push({ status: 200, chainSymbol: chain.networkSymbol, chainName: chain.networkName, chainLogo: chain.logo, chainId: chain.chainId, balance: json.data })
        } else {
          balances.push({ status: 404, chainSymbol: chain.networkSymbol, chainName: chain.networkName, chainLogo: chain.logo, chainId: chain.chainId, balance: [] })
        }
      }
      finalData.push({ address: wallet, data: balances })
      balances = []
    }
    return finalData
  } catch (error) {
    console.log(error)
  }
}

export const getTokenApprovals = async (walletAddress, chain) => {
  let getChainId = 0
  supportedEVMChains.forEach((x) => {
    if (x.moralisId === chain) {
      getChainId = x.chainId
    }
  })
  const json = await axios(`https://deep-index.moralis.io/api/v2/erc20/approvals?chain=${chain}&wallet_addresses[0]=${walletAddress}`, {
    headers: {
      'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY,
    },
  })
    .then((response) => response)
    .then((data) => data)

  const approvedTokens = []

  if (json.status === 200) {
    if (Object.keys(json.data.result).length > 0) {
      await Promise.all(
        json.data.result.map(async (x) => {
          const approved = x
          const tokenData = await getTokenMetadata(x.contract_address, chain)
          approvedTokens.push({ data: approved, tokenData: tokenData })
        })
      )
      return { status: 200, chainId: getChainId, data: approvedTokens }
    } else {
      return { status: 200, data: [] }
    }
  } else {
    return { status: 404, data: [] }
  }
}
