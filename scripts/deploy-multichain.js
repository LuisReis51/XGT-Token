const { ethers } = require("hardhat");

const ROUTER_ADDRESSES = {
    polygon: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",  // QuickSwap
    bsc: "0x10ED43C718714eb63d5aA57B78B54704E256024E",     // PancakeSwap
    arbitrum: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"  // SushiSwap
};

const INITIAL_LIQUIDITY = {
    token: ethers.parseEther("4000000000"),  // 4B tokens (5% of supply)
    native: {
        polygon: ethers.parseEther("50"),     // 50 MATIC (~$40)
        bsc: ethers.parseEther("0.1"),        // 0.1 BNB (~$30)
        arbitrum: ethers.parseEther("0.01")   // 0.01 ETH (~$25)
    }
};

async function main() {
    try {
        // Get network information
        const network = await ethers.provider.getNetwork();
        const networkName = network.name === 'unknown' ? 'hardhat' : network.name;
        console.log(`Deploying to ${networkName}...`);

        // Get the deployer's address
        const [deployer] = await ethers.getSigners();
        const balance = await deployer.provider.getBalance(deployer.address);
        console.log("Deploying from:", deployer.address);
        console.log("Account balance:", ethers.formatEther(balance));

        // Deploy XGToken
        console.log("\nDeploying XGToken...");
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = await XGToken.deploy();
        await xgt.waitForDeployment();
        
        const xgtAddress = await xgt.getAddress();
        console.log("XGToken deployed to:", xgtAddress);

        // Set up liquidity if on supported network
        if (ROUTER_ADDRESSES[networkName]) {
            console.log("\nSetting up initial liquidity...");
            const routerAddress = ROUTER_ADDRESSES[networkName];
            const tokenAmount = INITIAL_LIQUIDITY.token;
            const nativeAmount = INITIAL_LIQUIDITY.native[networkName];

            console.log(`Approving ${ethers.formatEther(tokenAmount)} tokens for router...`);
            const approveTx = await xgt.approve(routerAddress, tokenAmount);
            await approveTx.wait();
            console.log("Approval confirmed in block:", approveTx.blockNumber);

            // Note: Actual liquidity addition would need to be done through the DEX interface
            console.log(`\nNext steps:`);
            console.log(`1. Go to the DEX website for ${networkName}`);
            console.log(`2. Create pair with token address: ${xgtAddress}`);
            console.log(`3. Add initial liquidity:`);
            console.log(`   - ${ethers.formatEther(tokenAmount)} XGT`);
            console.log(`   - ${ethers.formatEther(nativeAmount)} ${networkName.toUpperCase()}`);
        }

        console.log("\nDeployment complete!");
    } catch (error) {
        console.error("Deployment failed:", error);
        process.exitCode = 1;
    }
}

main();
