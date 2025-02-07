const { ethers } = require("hardhat");

async function main() {
    try {
        console.log("Starting BSC deployment...");
        
        // Get the deployer's address
        const [deployer] = await ethers.getSigners();
        const provider = ethers.provider;
        const balance = await provider.getBalance(deployer.address);
        console.log("Deploying from address:", deployer.address);
        console.log("Account balance:", ethers.formatEther(balance), "BNB");
        
        // Deploy XGToken
        console.log("\nDeploying XGToken...");
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = await XGToken.deploy();
        await xgt.waitForDeployment();
        
        const xgtAddress = await xgt.getAddress();
        console.log("XGToken deployed to:", xgtAddress);

        // Initial liquidity setup
        const PANCAKESWAP_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // BSC PancakeSwap Router
        const tokenAmount = ethers.parseEther("40000000"); // 5% for initial liquidity
        const bnbAmount = ethers.parseEther("0.05"); // Initial BNB liquidity

        console.log("\nApproving PancakeSwap Router...");
        const approveTx = await xgt.approve(PANCAKESWAP_ROUTER, tokenAmount);
        await approveTx.wait();
        console.log("Approval confirmed in block:", approveTx.blockNumber);

        // Add liquidity
        console.log("\nAdding initial liquidity...");
        const router = await ethers.getContractAt("IUniswapV2Router02", PANCAKESWAP_ROUTER);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

        const addLiquidityTx = await router.addLiquidityETH(
            xgtAddress,
            tokenAmount,
            tokenAmount, // Set min tokens same as token amount
            bnbAmount,  // Set min BNB same as BNB amount
            deployer.address,
            deadline,
            { value: bnbAmount }
        );
        await addLiquidityTx.wait();
        console.log("Liquidity added in block:", addLiquidityTx.blockNumber);

        // Verify contract
        console.log("\nVerifying contract on BSCScan...");
        await hre.run("verify:verify", {
            address: xgtAddress,
            constructorArguments: []
        });

        console.log("\nDeployment complete!");
        console.log("Token address:", xgtAddress);
        console.log("PancakeSwap Router:", PANCAKESWAP_ROUTER);
        console.log("Initial liquidity:", ethers.formatEther(tokenAmount), "XGT +", ethers.formatEther(bnbAmount), "BNB");

    } catch (error) {
        console.error("\nDeployment failed:", error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
