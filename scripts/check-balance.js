const { ethers } = require("hardhat");

async function main() {
    try {
        const address = "0xC98EDFBff1aa90EaD7B1A7F5662c41C8Ee75b3e4";  // Fixed checksum
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = XGToken.attach("0xcF9C2Cce6082787131fdbe727cff544942391290");

        const balance = await xgt.balanceOf(address);
        console.log(`Balance for ${address}: ${ethers.formatEther(balance)} XGT`);

        const totalSupply = await xgt.totalSupply();
        console.log(`Total Supply: ${ethers.formatEther(totalSupply)} XGT`);

    } catch (error) {
        console.error("Error:", error);
    }
}

main();
