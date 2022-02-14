import { Chain } from '../../constants'

export const Aurora: Chain = {
  chainId: 1313161555,
  chainName: 'Aurora',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '',
  getExplorerAddressLink: (address: string) => `https://explorer.testnet.aurora.dev/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://explorer.testnet.aurora.dev/tx/${transactionHash}`,
}

export default { Aurora }
