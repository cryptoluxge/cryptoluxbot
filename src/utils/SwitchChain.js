import { ScrollChain, lineaGoerliChain, BaseGoerli, ETHChain } from './EVMNetworks'

export const switchChainTo = (chain) => {
  switch (chain) {
    case '534353':
      ScrollChain()
      break
    case '59140':
      lineaGoerliChain()
      break
    case '84531':
      BaseGoerli()
      break
    default:
      ETHChain()
  }
}
