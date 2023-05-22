import { Contract, ethers } from 'ethers'
import ERC20Abi from 'config/abi/erc20.json'
import { getRPCUrlById } from 'utils/getRPCUrl'

export const getTokenContract = async (address, chainId, isSigner) => {
  const provider = new ethers.BrowserProvider(isSigner ? window.ethereum : getRPCUrlById(chainId))
  return new Contract(address, ERC20Abi, isSigner ? await provider.getSigner() : provider)
}

export const getTokenMetadata = async (address, chainId) => {
  const tokenContract = await getTokenContract(address, chainId, false)
  const tokenName = await tokenContract.name()
  const tokenSymbol = await tokenContract.symbol()
  const tokenDecimals = await tokenContract.decimals()

  return { name: tokenName, symbol: tokenSymbol, decimals: tokenDecimals }
}
