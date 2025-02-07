const { ethers } = require("hardhat");

async function main() {
    try {
        // Get signer
        const [signer] = await ethers.getSigners();
        console.log("Sending from:", signer.address);

        // Receiving address - REPLACE WITH THE ADDRESS YOU WANT TO SEND TO
        const receivingAddress = "ENTER_RECEIVING_ADDRESS";
        
        // Amount to send (0.138 ETH)
        const amount = ethers.parseEther("0.138");

        // Create transaction
        const tx = await signer.sendTransaction({
            to: receivingAddress,
            value: amount
        });

        console.log("Sending 0.138 SepETH...");
        console.log("Transaction hash:", tx.hash);

        // Wait for transaction
        await tx.wait();
        console.log("Transfer complete!");
        
    } catch (error) {
        console.error("Error transferring ETH:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
