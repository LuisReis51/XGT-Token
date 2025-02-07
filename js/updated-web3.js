// Web3 Integration with Footer Wallet
class XGTWeb3 {
    constructor() {
        this.web3 = null;
        this.account = null;
        this.isConnected = false;
        this.init();
        this.setupScrolling();
    }

    setupScrolling() {
        // Handle smooth scrolling for Explore button
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    async init() {
        const connectButton = document.getElementById('connect-wallet');
        if (!connectButton) return;

        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            
            // Check if already connected
            try {
                const accounts = await this.web3.eth.getAccounts();
                if (accounts.length > 0) {
                    this.account = accounts[0];
                    this.isConnected = true;
                    this.updateUI();
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
                    this.isConnected = true;
                } else {
                    this.account = null;
                    this.isConnected = false;
                }
                this.updateUI();
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
        if (!this.web3) return;

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            this.account = accounts[0];
            this.isConnected = true;
            this.updateUI();
            
            // Get and display token balance
            await this.updateBalance();
        } catch (error) {
            console.error('User denied account access');
        }
    }

    async updateBalance() {
        if (!this.account) return;

        try {
            // Replace with your actual token contract call
            const balance = '1000.00'; // Placeholder
            document.getElementById('xgt-balance').textContent = `${balance} XGT`;
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }

    updateUI() {
        const connectButton = document.getElementById('connect-wallet');
        if (!connectButton) return;

        if (this.isConnected && this.account) {
            connectButton.textContent = `${this.account.slice(0, 6)}...${this.account.slice(-4)}`;
            connectButton.classList.add('connected');
            this.updateBalance();
        } else {
            connectButton.textContent = 'Connect Wallet';
            connectButton.classList.remove('connected');
            document.getElementById('xgt-balance').textContent = '0.00 XGT';
        }
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.xgtWeb3 = new XGTWeb3();
});
