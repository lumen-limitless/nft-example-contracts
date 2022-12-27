import { ethers } from 'hardhat'
import { NFT } from '../typechain'

const URI = process.argv[2] || ''
async function main() {
  if (!URI) throw new Error('URI must be specified')
  const nft: NFT = await ethers.getContract('NFT')
  const tx = await nft.setBaseURI(URI)
  await tx.wait()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
