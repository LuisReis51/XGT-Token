const { ethers } = require("hardhat");

async function main() {
    // Addresses for Sepolia
    const ROUTER_ADDRESS = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008"; // Sepolia UniswapV2Router02
    const FACTORY_ADDRESS = "0x7E0987E5b3a30e3f2828572Bb659A548460a3003"; // Sepolia UniswapV2Factory
    const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";    // Sepolia WETH
    const XGT_ADDRESS = "0x654E38A4516F5476D723D770382A5EaF8Bae0e0D";     // Our token

    const [signer] = await ethers.getSigners();
    console.log("Checking from address:", signer.address);

    // Factory ABI
    const FACTORY_ABI = [
        "function getPair(address tokenA, address tokenB) external view returns (address pair)",
        "function createPair(address tokenA, address tokenB) external returns (address pair)"
    ];

    // Get Factory contract
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);

    try {
        // Get pair address
        console.log("Checking if pair exists...");
        const pairAddress = await factory.getPair(XGT_ADDRESS, WETH_ADDRESS);
        console.log("Pair Address:", pairAddress);

        if (pairAddress === "0x0000000000000000000000000000000000000000") {
            console.log("No pair exists yet. Creating pair...");
            const tx = await factory.createPair(XGT_ADDRESS, WETH_ADDRESS);
            console.log("Creating pair... Transaction hash:", tx.hash);
            await tx.wait();
            
            const newPairAddress = await factory.getPair(XGT_ADDRESS, WETH_ADDRESS);
            console.log("New Pair Created at:", newPairAddress);
        } else {
            console.log("Pair already exists at:", pairAddress);
        }
    } catch (error) {
        console.error("Error details:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
