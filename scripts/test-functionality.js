const { ethers } = require("hardhat");

async function main() {
    try {
        const [owner, user1] = await ethers.getSigners();
        console.log("Testing with accounts:");
        console.log("Owner:", owner.address);
        console.log("User1:", user1.address);

        // Get the deployed contract
        const contractAddress = "0xcF9C2Cce6082787131fdbe727cff544942391290"; // BSC Testnet deployment
        const XGToken = await ethers.getContractFactory("XGToken");
        const xgt = XGToken.attach(contractAddress);

        console.log("\n1. Testing Initial Distribution:");
        const totalSupply = await xgt.totalSupply();
        console.log("Total Supply:", ethers.formatEther(totalSupply), "XGT");
        
        const ownerBalance = await xgt.balanceOf(owner.address);
        console.log("Owner Balance:", ethers.formatEther(ownerBalance), "XGT");

        console.log("\n2. Testing Transfer:");
        const transferAmount = ethers.parseEther("1000000"); // 1M tokens
        console.log("Transferring", ethers.formatEther(transferAmount), "XGT to User1");
        const transferTx = await xgt.transfer(user1.address, transferAmount);
        await transferTx.wait();
        
        const user1Balance = await xgt.balanceOf(user1.address);
        console.log("User1 Balance after transfer:", ethers.formatEther(user1Balance), "XGT");

        console.log("\n3. Testing Mining:");
        console.log("Initial block number:", await ethers.provider.getBlockNumber());
        
        // Try mining with user1
        const xgtAsUser1 = xgt.connect(user1);
        try {
            const mineTx = await xgtAsUser1.mine();
            await mineTx.wait();
            console.log("Mining successful!");
            
            const newUser1Balance = await xgt.balanceOf(user1.address);
            console.log("User1 Balance after mining:", ethers.formatEther(newUser1Balance), "XGT");
        } catch (error) {
            console.log("Mining failed:", error.message);
        }

        // Try mining again immediately (should fail due to 5-block requirement)
        try {
            const mineTx2 = await xgtAsUser1.mine();
            await mineTx2.wait();
            console.log("Second mining attempt successful (unexpected)!");
        } catch (error) {
            console.log("Second mining attempt failed as expected:", error.message);
        }

        console.log("\n4. Testing Supply Limits:");
        const maxSupply = await xgt.maxSupply();
        const currentSupply = await xgt.totalSupply();
        console.log("Max Supply:", ethers.formatEther(maxSupply), "XGT");
        console.log("Current Supply:", ethers.formatEther(currentSupply), "XGT");
        console.log("Remaining Minable:", ethers.formatEther(maxSupply - currentSupply), "XGT");

    } catch (error) {
        console.error("Test failed:", error);
    }
}

main();
