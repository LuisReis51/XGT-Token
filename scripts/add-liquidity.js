const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
    try {
        console.log("Starting liquidity addition process on BSC mainnet...");
        
        const [deployer] = await hre.ethers.getSigners();
        console.log("Using account:", deployer.address);
        
        // Contract addresses for BSC mainnet
        const XGT_ADDRESS = "0x654E38A4516F5476D723D770382A5EaF8Bae0e0D";
        const ROUTER_ADDRESS = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap Router v2
        
        console.log("Loading contracts...");
        
        // Get contract instances
        const XGToken = await hre.ethers.getContractFactory("XGToken");
        const xgt = await XGToken.attach(XGT_ADDRESS);
        
        // Amount of tokens for liquidity (400M tokens for 0.05 BNB)
        const tokenAmount = ethers.utils.parseUnits("400000000", 18); // 400M tokens
        
        // Amount of BNB (0.05 BNB for initial liquidity)
        const bnbAmount = ethers.utils.parseUnits("0.05", 18); // 0.05 BNB
        
        console.log(`Approving ${ethers.utils.formatUnits(tokenAmount, 18)} tokens for PancakeSwap...`);
        const approveTx = await xgt.approve(ROUTER_ADDRESS, tokenAmount);
        await approveTx.wait();
        console.log("Approval confirmed in block:", approveTx.blockNumber);
        
        console.log("Adding liquidity...");
        console.log(`Token Amount: ${ethers.utils.formatUnits(tokenAmount, 18)} XGT`);
        console.log(`BNB Amount: ${ethers.utils.formatUnits(bnbAmount, 18)} BNB`);
        
        // Get router contract using the interface
        const routerABI = [
            "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)"
        ];
        const router = new hre.ethers.Contract(ROUTER_ADDRESS, routerABI, deployer);
        
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes
        
        // Calculate minimum amounts (95% of desired amounts)
        const minTokenAmount = tokenAmount.mul(95).div(100);
        const minBnbAmount = bnbAmount.mul(95).div(100);
        
        const addLiquidityTx = await router.addLiquidityETH(
            XGT_ADDRESS,
            tokenAmount,
            minTokenAmount,
            minBnbAmount,
            deployer.address,
            deadline,
            { value: bnbAmount }
        );
        
        const receipt = await addLiquidityTx.wait();
        console.log("Liquidity added! Transaction hash:", addLiquidityTx.hash);
        
        // Get the pair address from the event logs
        const factory = new hre.ethers.Contract(
            "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", // PancakeSwap Factory
            ["event PairCreated(address indexed token0, address indexed token1, address pair, uint)"],
            deployer
        );
        
        const filter = factory.filters.PairCreated(XGT_ADDRESS, null);
        const events = await factory.queryFilter(filter);
        
        if (events.length > 0) {
            const pairAddress = events[0].args.pair;
            console.log("PancakeSwap pair address:", pairAddress);
            console.log("Add this address to your mining.html PANCAKE_PAIR constant");
        }
        
        console.log("Liquidity addition completed successfully!");
    } catch (error) {
        console.error("Error adding liquidity:", error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
