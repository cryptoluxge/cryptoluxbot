import { ethers, Contract, id } from 'ethers'
import { shortAddress } from 'utils/WalletHelpers'
export const baseProvider = new ethers.JsonRpcProvider('https://goerli.base.org')
export const bnsRegistrar = '0xcd6bB0f23b46A5cbf4949f6f4Bd91BF8a9ad81a1'
export const bnsRegistrarABI = [
  {
    inputs: [
      { internalType: 'contract ENS', name: 'ensAddr', type: 'address' },
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'contract MinimalForwarder', name: 'forwarder', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [{ internalType: 'address', name: 'forwarder', type: 'address' }], name: 'isTrustedForwarder', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'bytes32', name: 'label', type: 'bytes32' },
      { internalType: 'address', name: 'owner', type: 'address' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const bnsRegistrarContract = async (runner) => {
  const bnsContract = new Contract(bnsRegistrar, bnsRegistrarABI, runner)
  return bnsContract
}

export const generateRandomString = (stringLedth) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length

  for (var i = 0; i < stringLedth; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const mintName = async (wallet, namesToMint) => {
  const data = []
  let successTxs = 0
  let failedTxs = 0
  for (let i = 0; i < namesToMint; i++) {
    try {
      const contract = await bnsRegistrarContract(wallet)
      const randomString = generateRandomString(5)
      const randomHash = id(randomString)
      const txResponse = await contract.register(randomHash, wallet.address)
      const txReceipt = await txResponse.wait()
      if (txReceipt.status === 1) {
        successTxs += 1
        data.push({
          isMinted: true,
          hash: txReceipt.hash,
          text: `დაიმინტა სახელი ${randomString} ${i + 1}/${namesToMint}`,
        })
        console.log(`[+][BASE] - [${shortAddress(wallet.address, 5)}] - MINTED NAME: ${randomString}`)
      } else {
        failedTxs += 1
        data.push({
          isMinted: false,
          hash: txReceipt.hash,
          text: `არ დაიმინტა ${randomString} ${i + 1}/${namesToMint}`,
        })
        console.log(`[-][BASE] - [${shortAddress(wallet.address, 5)}] - NOT MINTED NAME: ${randomString}`)
      }
      await baseProvider.waitForTransaction(txReceipt.hash, Math.floor(Math.random() * 5) + 1)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    data: data,
    successTxs: successTxs,
    failedTxs: failedTxs,
    walletAddress: wallet.address,
  }
}
