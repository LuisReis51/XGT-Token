const { ethers } = require("hardhat");

async function main() {
    try {
        // Contract address on Sepolia
        const XGT_ADDRESS = "0x654E38A4516F5476D723D770382A5EaF8Bae0e0D";
        
        // Get signer
        const [signer] = await ethers.getSigners();
        console.log("Mining with address:", signer.address);
        
        // Get contract
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = await XGToken.attach(XGT_ADDRESS);
        
        // Get current balance
        const balanceBefore = await xgt.balanceOf(signer.address);
        console.log("Balance before mining:", ethers.formatEther(balanceBefore), "XGT");
        
        // Mine tokens
        console.log("\nMining tokens...");
        const mineTx = await xgt.mine();
        await mineTx.wait();
        
        // Get new balance
        const balanceAfter = await xgt.balanceOf(signer.address);
        console.log("\nMining successful!");
        console.log("Balance after mining:", ethers.formatEther(balanceAfter), "XGT");
        console.log("Tokens mined:", ethers.formatEther(balanceAfter - balanceBefore), "XGT");
        
    } catch (error) {
        if (error.message.includes("Must wait 5 blocks")) {
            console.log("\nError: Must wait 5 blocks between mining attempts.");
            console.log("Please wait a few minutes and try again.");
        } else if (error.message.includes("Mining cap reached")) {
            console.log("\nError: Mining cap has been reached.");
            console.log("No more tokens can be mined.");
        } else {
            console.error("\nError mining tokens:", error.message);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
