const { ethers } = require("hardhat");

async function main() {
    try {
        // Contract addresses
        const XGT_ADDRESS = "0x654E38A4516F5476D723D770382A5EaF8Bae0e0D";
        const UNISWAP_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
        const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

        // Get signer
        const [deployer] = await ethers.getSigners();
        const balance = await ethers.provider.getBalance(deployer.address);
        console.log("Current balance:", ethers.formatEther(balance), "ETH");
        console.log("Adding liquidity from:", deployer.address);

        // Check if we have enough ETH
        const ethNeeded = ethers.parseEther("0.008"); // 0.005 ETH for liquidity + 0.003 for gas
        
        if (balance < ethNeeded) {
            console.error("\nInsufficient ETH!");
            console.log("Current balance:", ethers.formatEther(balance), "ETH");
            console.log("Total needed:", ethers.formatEther(ethNeeded), "ETH");
            console.log("Missing:", ethers.formatEther(ethNeeded - balance), "ETH");
            console.log("Please add more ETH to continue");
            process.exit(1);
        }

        // Get contract instances
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = XGToken.attach(XGT_ADDRESS);
        
        // Amount to add - maintaining price ratio
        // If 0.05 ETH = 40M tokens, then 0.005 ETH = 4M tokens
        // This maintains $0.0000025 per token
        const tokenAmount = ethers.parseEther("4000000"); // 4M tokens
        const ethAmount = ethers.parseEther("0.005"); // 0.005 ETH for liquidity

        console.log("\nPrice Check:");
        console.log("ETH/Token ratio maintained at $0.0000025 per token");
        console.log("Original plan: 40M tokens : 0.05 ETH");
        console.log("Reduced plan: 4M tokens : 0.005 ETH");

        // Approve router
        console.log("\nApproving Uniswap Router...");
        const approveTx = await xgt.approve(UNISWAP_ROUTER, tokenAmount);
        await approveTx.wait();
        console.log("Approval confirmed!");

        // Get Router contract
        const routerAbi = [
            "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)"
        ];
        const router = new ethers.Contract(UNISWAP_ROUTER, routerAbi, deployer);

        // Add liquidity
        console.log("\nAdding liquidity...");
        console.log("Token Amount:", ethers.formatEther(tokenAmount), "XGT");
        console.log("ETH Amount:", ethers.formatEther(ethAmount), "ETH");

        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
        const tx = await router.addLiquidityETH(
            XGT_ADDRESS,
            tokenAmount,
            tokenAmount,
            ethAmount,
            deployer.address,
            deadline,
            { value: ethAmount, gasLimit: 300000 }
        );

        console.log("\nTransaction hash:", tx.hash);
        console.log("Waiting for confirmation...");
        await tx.wait();

        console.log("\nLiquidity added successfully!");
        console.log("You can now trade XGT on Uniswap!");
        console.log("Uniswap pair:", `https://app.uniswap.org/#/add/v2/ETH/${XGT_ADDRESS}`);
        
    } catch (error) {
        console.error("\nFailed to add liquidity!");
        console.error(error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
