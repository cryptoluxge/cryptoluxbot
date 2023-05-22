import { Contract, ethers } from 'ethers'
import { getRPCUrlById } from 'utils/getRPCUrl'
import { RPS_ABI, RPS_MULTICHAIN_ADDRESSES } from '../config'

export const getPlayContract = async (chain, isSigner) => {
  const provider = isSigner ? new ethers.BrowserProvider(window.ethereum) : new ethers.JsonRpcProvider(getRPCUrlById(chain))
  const playContract = new Contract(RPS_MULTICHAIN_ADDRESSES[chain], RPS_ABI, isSigner ? await provider.getSigner() : provider)
  return playContract
}

export const getPlayerData = async (walletAddress, chain) => {
  const playContract = await getPlayContract(chain, false)
  const data = await playContract.getUserStats(walletAddress)
  return { wins: Number(data[0]), losses: Number(data[1]), ties: Number(data[2]) }
}

export const getTotalFlipCount = async (chain) => {
  const playContract = await getPlayContract(chain, false)
  const data = await playContract.flipCount()
  return Number(data)
}
