require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    mainnet: {
      url: process.env.ALCHEMY_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 137
    },
    bsc: {
      url: process.env.BSC_RPC_URL || "https://bsc-dataseed1.binance.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 56,
      gasPrice: 3000000000,  // 3 gwei
      maxFeePerGas: 3500000000,
      maxPriorityFeePerGas: 3000000000
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42161
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: "3CI1GGKVDMVHXV7ED7DHXWDJNMAYBAV672"
  }
};
