import { Network, Alchemy } from "alchemy-sdk";

// Your Alchemy API key and network configuration
const settings = {
  apiKey: "hbX0uHHfyGIZYvsqkOwSfQLPz5_S8zc0", // Replace with your actual API key
  network: Network.ETH_MAINNET,    // Network selection (you can use Goerli or another testnet)
};

const alchemy = new Alchemy(settings);

// Fetch a specific block and log the result
alchemy.core.getBlock(15221026).then((block) => {
  console.log("Block details:", block);
}).catch((error) => {
  console.error("Error fetching block:", error);
});