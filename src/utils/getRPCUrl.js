export const getRPCUrl = (chain) => {
  switch (chain) {
    case 'bsc':
      return 'https://bsc-dataseed1.binance.org/'
    case 'eth':
      return 'https://eth.llamarpc.com'
    case 'avax':
      return 'https://api.avax.network/ext/bc/C/rpc'
    case 'matic':
      return 'https://polygon-rpc.com/'
    case 'ftm':
      return 'https://rpcapi.fantom.network/'
    case 'cro':
      return 'https://evm.cronos.org'
    case 'arb':
      return 'https://arb1.arbitrum.io/rpc'
    case 'geth':
      return 'https://rpc.ankr.com/eth_goerli	'
    case 'scroll':
      return 'https://alpha-rpc.scroll.io/l2'
    case 'base':
      return 'https://goerli.base.org'
    default:
      return 'https://eth.llamarpc.com'
  }
}

export const getRPCUrlById = (id) => {
  switch (id) {
    case 56:
      return 'https://bsc-dataseed1.binance.org/'
    case 1:
      return 'https://eth.llamarpc.com'
    case 43114:
      return 'https://api.avax.network/ext/bc/C/rpc'
    case 137:
      return 'https://polygon-rpc.com/'
    case 250:
      return 'https://rpcapi.fantom.network/'
    case 25:
      return 'https://evm.cronos.org'
    case 42161:
      return 'https://arb1.arbitrum.io/rpc'
    case 84531:
      return 'https://goerli.base.org'
    case 534353:
      return 'https://alpha-rpc.scroll.io/l2'
    case 59140:
      return 'https://consensys-zkevm-goerli-prealpha.infura.io/v3/d756bc533db84712a94cb7c675b8c494'
    default:
      return 'https://eth.llamarpc.com'
  }
}
