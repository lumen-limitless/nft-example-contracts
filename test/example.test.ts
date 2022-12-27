import { expect } from 'chai'
import { deployments, ethers } from 'hardhat'

const setup = deployments.createFixture(async () => {
  await deployments.fixture()
  const deployer = await ethers.getNamedSigner('deployer')
  const users = await ethers.getUnnamedSigners()
  const example = await ethers.getContract('NFT')

  return {
    example,
    deployer,
    users,
  }
})

describe('SETUP', function () {
  it('Sets up', async function () {
    expect(await setup()).to.be.ok
  })
})
