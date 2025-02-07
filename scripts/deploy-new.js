const { ethers } = require("hardhat");

async function main() {
    try {
        console.log("Starting deployment...");
        
        // Get the deployer's address
        const [deployer] = await ethers.getSigners();
        console.log("Deploying with account:", deployer.address);
        
        // Deploy XGToken
        console.log("\nDeploying XGToken...");
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = await XGToken.deploy();
        await xgt.waitForDeployment();
        
        const xgtAddress = await xgt.getAddress();
        console.log("XGToken deployed to:", xgtAddress);
        
        // Verify the deployment
        console.log("\nContract deployment completed!");
        console.log("Token Address:", xgtAddress);
        console.log("\nNext steps:");
        console.log("1. Save this token address");
        console.log("2. Add some initial liquidity");
        console.log("3. Update the token address in all dashboard files");
        
    } catch (error) {
        console.error("\nDeployment failed!");
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
