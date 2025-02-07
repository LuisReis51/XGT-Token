const { ethers } = require("hardhat");

async function main() {
    try {
        // Connect to contract
        const [owner] = await ethers.getSigners();
        console.log("Setting up with address:", owner.address);
        
        const xgt = await ethers.getContractAt("XGToken", "0x654E38A4516F5476D723D770382A5EaF8Bae0e0D");
        const PANCAKESWAP_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
        
        // Amount to add to liquidity
        const tokenAmount = ethers.parseEther("400000"); // 400k tokens
        const bnbAmount = ethers.parseEther("0.05"); // 0.05 BNB
        
        console.log("\nApproving PancakeSwap Router...");
        const approveTx = await xgt.approve(PANCAKESWAP_ROUTER, tokenAmount);
        await approveTx.wait();
        console.log("Approved PancakeSwap to spend tokens");
        
        // Add liquidity
        console.log("\nAdding liquidity...");
        const router = await ethers.getContractAt("IUniswapV2Router02", PANCAKESWAP_ROUTER);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
        
        // Calculate minimum amounts (1% slippage)
        const minTokens = tokenAmount * 99n / 100n;
        const minBNB = bnbAmount * 99n / 100n;
        
        const addLiquidityTx = await router.addLiquidityETH(
            await xgt.getAddress(),
            tokenAmount,
            minTokens, // Min tokens (1% slippage)
            minBNB,  // Min BNB (1% slippage)
            owner.address,
            deadline,
            { value: bnbAmount }
        );
        
        const receipt = await addLiquidityTx.wait();
        console.log("Liquidity added in block:", receipt.blockNumber);
        console.log("\nInitial setup complete!");
        console.log("Added", ethers.formatEther(tokenAmount), "XGT +", ethers.formatEther(bnbAmount), "BNB");
        
        // Calculate initial price
        const tokenPriceInBNB = bnbAmount / tokenAmount;
        console.log("\nInitial token price:", tokenPriceInBNB, "BNB per XGT");
        
    } catch (error) {
        console.error("\nError:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
