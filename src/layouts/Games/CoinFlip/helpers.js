import { getRPCUrlById } from 'utils/getRPCUrl'
import { Contract, ethers, formatUnits } from 'ethers'
import { COINFLIP_ABI, COINFLIP_MULTICHAIN_ADDRESSES } from '../config'

export const getBettingContract = async (chain, isSigner) => {
  const runner = isSigner ? new ethers.BrowserProvider(window.ethereum) : new ethers.JsonRpcProvider(getRPCUrlById(chain))
  const bettingContract = new Contract(COINFLIP_MULTICHAIN_ADDRESSES[chain], COINFLIP_ABI, isSigner ? await runner.getSigner() : runner)
  return bettingContract
}

export const getUserData = async (walletAddress, chain) => {
  const bettingContract = await getBettingContract(chain, false)
  const data = await bettingContract.userStats(walletAddress)
  return { won: Number(data[2]).toString(), lost: Number(data[3]).toString(), totalWonAmount: formatUnits(String(data[0]), 18), totalLostAmount: formatUnits(String(data[1]), 18) }
}

export const getTotalFlipCount = async (chain) => {
  const bettingContract = await getBettingContract(chain, false)
  const data = await bettingContract.totalFlips()
  return Number(data)
}
