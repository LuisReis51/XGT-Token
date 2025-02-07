const { ethers } = require("hardhat");

async function main() {
    const [signer] = await ethers.getSigners();
    const message = "[BscScan.com 20/01/2025 20:27:21] I, hereby verify that I am the owner/creator of the address [0x654E38A4516F5476D723D770382A5EaF8Bae0e0D]";
    
    console.log("Signing with address:", signer.address);
    const signature = await signer.signMessage(message);
    
    console.log("\nMessage:", message);
    console.log("\nSignature:", signature);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
