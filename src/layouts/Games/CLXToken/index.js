import { ethers, Contract, formatEther } from 'ethers'
import { getRPCUrlById } from 'utils/getRPCUrl'
import { CLX_TOKEN_ABI, CLX_TOKEN_MULTICHAIN_ADDRESSES } from '../config'
import { FAUCET_MULTICHAIN_ADDRESS, FAUCET_ABI } from '../config'

export const getCLXContract = async (chain, isSigner) => {
  const runner = isSigner ? new ethers.BrowserProvider(window.ethereum) : new ethers.JsonRpcProvider(getRPCUrlById(chain))
  const tokenContract = new Contract(CLX_TOKEN_MULTICHAIN_ADDRESSES[chain], CLX_TOKEN_ABI, isSigner ? await runner.getSigner() : runner)
  return tokenContract
}

export const getUserCLXBalance = async (address, chain) => {
  const tokenContract = await getCLXContract(chain, false)
  const userBalance = await tokenContract.balanceOf(address)
  return formatEther(userBalance)
}

export const getHasUserCLXApproved = async (address, contract, chain) => {
  const tokenContract = await getCLXContract(chain, false)
  const allowance = await tokenContract.allowance(address, contract)
  return Number(allowance) > 0
}

export const getCLXFaucetContract = async (chain) => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const faucetContract = new Contract(FAUCET_MULTICHAIN_ADDRESS[chain], FAUCET_ABI, signer)
  return faucetContract
}
