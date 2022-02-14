import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Aurora } from '../../../src'

describe('Aurora Chain', () => {
  it('getChainId', () => {
    expect(Aurora.chainId).to.equal(1313161555)
  })

  it('getChainName', () => {
    expect(Aurora.chainName).to.eq('Aurora')
  })

  it('isTestChain', () => {
    expect(Aurora.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Aurora.isLocalChain).to.be.false
  })


})
