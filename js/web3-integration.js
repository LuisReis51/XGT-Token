// Web3 Integration
class XGTWeb3 {
    constructor() {
        this.web3 = null;
        this.account = null;
        this.init();
    }

    async init() {
        // Add event listener for connect wallet button
        const connectButton = document.getElementById('connect-wallet');
        if (connectButton) {
            connectButton.addEventListener('click', () => this.connectWallet());
        }

        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            // Check if already connected
            const accounts = await this.web3.eth.getAccounts();
            if (accounts.length > 0) {
                this.account = accounts[0];
                this.updateUI(true);
            }
        } else {
            console.log('Please install MetaMask');
            if (connectButton) {
                connectButton.textContent = 'Install MetaMask';
                connectButton.addEventListener('click', () => {
                    window.open('https://metamask.io', '_blank');
                });
            }
        }
    }

    async connectWallet() {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            this.account = accounts[0];
            this.updateUI(true);
            
            // Add account change listener
            window.ethereum.on('accountsChanged', (accounts) => {
                this.account = accounts[0];
                this.updateUI(accounts.length > 0);
            });
        } catch (error) {
            console.error('User denied account access');
        }
    }

    updateUI(connected) {
        const connectButton = document.getElementById('connect-wallet');
        const balanceDisplay = document.getElementById('xgt-balance');
        
        if (connected) {
            // Update button
            if (connectButton) {
                connectButton.textContent = this.account.slice(0, 6) + '...' + 
                                         this.account.slice(-4);
                connectButton.classList.add('connected');
            }
            
            // Update balance
            if (balanceDisplay) {
                // Here you would typically call your token contract
                // For demo, showing placeholder
                balanceDisplay.textContent = '1000.00 XGT';
            }
        } else {
            if (connectButton) {
                connectButton.textContent = 'Connect Wallet';
                connectButton.classList.remove('connected');
            }
            if (balanceDisplay) {
                balanceDisplay.textContent = '0.00 XGT';
            }
        }
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.xgtWeb3 = new XGTWeb3();
});
