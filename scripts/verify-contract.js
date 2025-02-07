const { ethers } = require("hardhat");

async function main() {
    try {
        const [owner] = await ethers.getSigners();
        console.log("Testing with owner account:", owner.address);

        // Get the deployed contract
        const contractAddress = "0xcF9C2Cce6082787131fdbe727cff544942391290"; // BSC Testnet deployment
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = XGToken.attach(contractAddress);

        console.log("\n=== Basic Contract Information ===");
        const name = await xgt.name();
        const symbol = await xgt.symbol();
        const decimals = await xgt.decimals();
        const totalSupply = await xgt.totalSupply();
        const maxSupply = await xgt.maxSupply();
        const blockReward = await xgt.blockReward();

        console.log(`Name: ${name}`);
        console.log(`Symbol: ${symbol}`);
        console.log(`Decimals: ${decimals}`);
        console.log(`Total Supply: ${ethers.formatEther(totalSupply)} XGT`);
        console.log(`Max Supply: ${ethers.formatEther(maxSupply)} XGT`);
        console.log(`Block Reward: ${ethers.formatEther(blockReward)} XGT`);

        console.log("\n=== Distribution Information ===");
        const initialLiquidity = await xgt.INITIAL_LIQUIDITY();
        const teamSupply = await xgt.TEAM_SUPPLY();
        const reserveSupply = await xgt.RESERVE_SUPPLY();
        const minableSupply = await xgt.MINABLE_SUPPLY();

        console.log(`Initial Liquidity (5%): ${ethers.formatEther(initialLiquidity)} XGT`);
        console.log(`Team Supply (20%): ${ethers.formatEther(teamSupply)} XGT`);
        console.log(`Reserve Supply (25%): ${ethers.formatEther(reserveSupply)} XGT`);
        console.log(`Minable Supply (50%): ${ethers.formatEther(minableSupply)} XGT`);

        console.log("\n=== Mining Settings ===");
        const lastBlock = await xgt.lastMinedBlock();
        const currentBlock = await ethers.provider.getBlockNumber();
        console.log(`Last Mined Block: ${lastBlock}`);
        console.log(`Current Block: ${currentBlock}`);
        
        console.log("\n=== Owner Balance ===");
        const ownerBalance = await xgt.balanceOf(owner.address);
        console.log(`Owner Balance: ${ethers.formatEther(ownerBalance)} XGT`);

        console.log("\nAll basic contract functions verified successfully!");

    } catch (error) {
        console.error("Verification failed:", error);
    }
}

main();
