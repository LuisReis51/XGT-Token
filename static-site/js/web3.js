// Web3 Integration
class XGTWeb3 {
    constructor() {
        this.web3 = null;
        this.account = null;
        this.init();
    }

    async init() {
        const connectButton = document.getElementById('connect-wallet');
        
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            
            // Check if already connected
            try {
                const accounts = await this.web3.eth.getAccounts();
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    this.updateUI(true);
                }
            } catch (error) {
                console.error('Error checking accounts:', error);
            }

            // Setup connect button
            connectButton.addEventListener('click', () => this.connectWallet());

            // Setup event listeners
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    this.updateUI(true);
                } else {
                    this.account = null;
                    this.updateUI(false);
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });

        } else {
            connectButton.textContent = 'Install MetaMask';
            connectButton.addEventListener('click', () => {
                window.open('https://metamask.io', '_blank');
            });
        }
    }

    async connectWallet() {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            this.account = accounts[0];
            this.updateUI(true);
            await this.updateBalance();
        } catch (error) {
            console.error('User denied account access');
        }
    }

    async updateBalance() {
        if (!this.account) return;

        try {
            // Replace with actual token contract call
            const balance = '1000.00'; // Placeholder
            document.getElementById('xgt-balance').textContent = `${balance} XGT`;
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }

    updateUI(connected) {
        const connectButton = document.getElementById('connect-wallet');
        const balanceDisplay = document.getElementById('xgt-balance');
        
        if (connected && this.account) {
            connectButton.textContent = `${this.account.slice(0, 6)}...${this.account.slice(-4)}`;
            connectButton.classList.add('connected');
            this.updateBalance();
        } else {
            connectButton.textContent = 'Connect Wallet';
            connectButton.classList.remove('connected');
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
