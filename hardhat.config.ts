import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/types'
import { task } from 'hardhat/config'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-gas-reporter'
import '@typechain/hardhat'
import 'solidity-coverage'
import '@atixlabs/hardhat-time-n-mine'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-deploy-tenderly'
import { node_url, accounts, addForkConfiguration } from './utils/network'

task('blockNumber', 'Prints the current block number', async (_, { ethers }) => {
  await ethers.provider.getBlockNumber().then((blockNumber) => {
    console.log('Current block number: ' + blockNumber)
  })
})

task('balance', 'Prints an account balance')
  .addParam('account', 'the account address')
  .setAction(async (args, { ethers }) => {
    const account = ethers.utils.getAddress(args.account)
    const balance = await ethers.provider.getBalance(account)

    console.log(ethers.utils.formatEther(balance), 'ETH')
  })

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
    user: 1,
  },
  networks: addForkConfiguration({
    hardhat: {
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
    },
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    production: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('kovan'),
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
    },
  }),
  paths: {
    sources: 'src',
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 0,
  },
  external: process.env.HARDHAT_FORK
    ? {
        deployments: {
          // process.env.HARDHAT_FORK will specify the network that the fork is made from.
          // these lines allow it to fetch the deployments from the network being forked from both for node and deploy task
          hardhat: ['deployments/' + process.env.HARDHAT_FORK],
          localhost: ['deployments/' + process.env.HARDHAT_FORK],
        },
      }
    : undefined,

  tenderly: {
    project: '',
    username: process.env.TENDERLY_USERNAME as string,
  },
  etherscan: {
    apiKey: process.env.SCAN_API_KEY,
  },
}

export default config
