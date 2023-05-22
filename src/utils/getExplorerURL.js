const evmExplorerURLS = {
  56: 'https://bscscan.com',
  1: 'https://etherscan.io',
  5: 'https://goerli.etherscan.io',
  11155111: 'https://sepolia.etherscan.io',
  84531: 'https://goerli.basescan.org',
  43114: 'https://snowtrace.io',
  137: 'https://polygonscan.com',
  250: 'https://ftmscan.com',
  25: 'https://cronoscan.com',
  42161: 'https://arbiscan.io',
  534353: 'https://blockscout.scroll.io',
  59140: 'https://explorer.goerli.linea.build',
  167004: 'https://explorer.a2.taiko.xyz',
}

const l1ExplorerURLS = {
  APT: 'https://explorer.aptoslabs.com',
  ADA: 'https://cardanoscan.io',
  MINA: 'https://minascan.io',
  VENOM: 'https://testnet.venomscan.com',
}

export const getExplorerURL = (chain, chainId, type, data) => {
  if (chain === 'evm') {
    switch (type) {
      case 'wallet':
        return `${evmExplorerURLS[chainId]}/address/${data}`
      case 'tx':
        return `${evmExplorerURLS[chainId]}/tx/${data}`
      case 'token':
        return `${evmExplorerURLS[chainId]}/token/${data}`
      case 'block':
        return `${evmExplorerURLS[chainId]}/block/${data}`
      default:
        return `${evmExplorerURLS[chainId]}/`
    }
  } else {
    if (chain === 'APT') {
      switch (type) {
        case 'wallet':
          return `${l1ExplorerURLS[chain]}/account/${data}`
        case 'tx':
          return `${l1ExplorerURLS[chain]}/txn/${data}`
        default:
          return `${l1ExplorerURLS[chain]}/`
      }
    } else if (chain === 'ADA') {
      switch (type) {
        case 'wallet':
          return `${l1ExplorerURLS[chain]}/address/${data}`
        case 'tx':
          return `${l1ExplorerURLS[chain]}/transaction/${data}`
        case 'block':
          return `${l1ExplorerURLS[chain]}/block/${data}`
        case 'pool':
          return `${l1ExplorerURLS[chain]}/pool/${data}`
        case 'epoch':
          return `${l1ExplorerURLS[chain]}/epoch/${data}`
        default:
          return `${l1ExplorerURLS[chain]}/`
      }
    } else if (chain === 'MINA') {
      switch (type) {
        case 'wallet':
          return `${l1ExplorerURLS[chain]}/mainnet/address/${data}`
        case 'tx':
          return `${l1ExplorerURLS[chain]}/mainnet/transaction/${data}`
        case 'block':
          return `${l1ExplorerURLS[chain]}/mainnet/block/${data}`
        case 'pool':
          return `${l1ExplorerURLS[chain]}/mainnet/validator/${data}`
        default:
          return `${l1ExplorerURLS[chain]}/`
      }
    } else if (chain === 'VENOM') {
      switch (type) {
        case 'wallet':
          return `${l1ExplorerURLS[chain]}/accounts/${data}`
        case 'tx':
          return `${l1ExplorerURLS[chain]}/transactions/${data}`
        case 'block':
          return `${l1ExplorerURLS[chain]}/blocks/${data}`
        default:
          return `${l1ExplorerURLS[chain]}/`
      }
    }
  }
}
