// This file contains JavaScript code for the website, handling interactivity, wallet connectivity, and mining capabilities.

document.addEventListener('DOMContentLoaded', function() {
    const connectButton = document.getElementById('connect-wallet');
    const miningButton = document.getElementById('start-mining');
    const walletAddressDisplay = document.getElementById('wallet-address');

    // Function to connect to the wallet
    connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                walletAddressDisplay.textContent = `Connected: ${walletAddress}`;
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('Please install a wallet extension like MetaMask to connect.');
        }
    });

    // Function to start mining
    miningButton.addEventListener('click', () => {
        // Placeholder for mining logic
        alert('Mining session started! Check your wallet for XGT tokens.');
    });
});