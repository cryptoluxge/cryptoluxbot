import { baseProvider, baseTokenContract, contractAddresses, dackieLpContract, swapContract } from './config'

export const hasLpApproved = async (lpAddress, walletAddress) => {
  const getContract = await dackieLpContract(lpAddress, baseProvider)
  const isApproved = await getContract.allowance(walletAddress, contractAddresses.masterChef)
  return Number(isApproved) > 0
}

export const getTokenAmountForSwap = async (ethAmount, path) => {
  const routerContract = await swapContract(baseProvider)
  const amount = await routerContract.getAmountsOut(ethAmount, path)
  return amount[1]
}

export const getLpBalance = async (address, walletAddress) => {
  const contract = await dackieLpContract(address, baseProvider)
  const balance = await contract.balanceOf(walletAddress)
  return balance
}

export const hasTokenApproved = async (tokenAddress, walletAddress, spender) => {
  const contract = await baseTokenContract(tokenAddress, baseProvider)
  const allowance = await contract.allowance(walletAddress, spender)
  return Number(allowance) > 0
}
