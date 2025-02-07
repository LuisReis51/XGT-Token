class TokenPage {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.isConnected = false;

        // Initialize elements
        this.connectButton = document.getElementById('connect-wallet');
        this.walletStatus = document.getElementById('wallet-status');
        this.mineButton = document.getElementById('mine-button');
        this.miningControls = document.getElementById('mining-controls');
        this.nextBlock = document.getElementById('next-block');
        this.blocksWait = document.getElementById('blocks-wait');
        this.currentReward = document.getElementById('current-reward');

        // Price elements
        this.priceElement = document.getElementById('xgt-price');
        this.marketCapElement = document.getElementById('market-cap');
        this.volumeElement = document.getElementById('volume');
        this.holdersElement = document.getElementById('holders');

        this.init();
    }

    async init() {
        if (typeof window.ethereum === 'undefined') {
            console.log('MetaMask not installed');
            this.showNotification('Please install MetaMask to interact with the token', true);
            return;
        }

        this.ethereum = window.ethereum;
        await this.setupEventListeners();
        await this.loadTokenStats();
        await this.checkPreviousConnection();
    }

    async setupEventListeners() {
        if (this.connectButton) {
            this.connectButton.addEventListener('click', () => this.connectWallet());
        }

        if (this.mineButton) {
            this.mineButton.addEventListener('click', () => this.startMining());
        }

        // Wallet events
        this.ethereum.on('accountsChanged', (accounts) => this.handleAccountsChanged(accounts));
        this.ethereum.on('chainChanged', () => window.location.reload());
        this.ethereum.on('disconnect', () => this.handleDisconnect());
    }

    async checkPreviousConnection() {
        try {
            const accounts = await this.ethereum.request({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
                await this.handleAccountsChanged(accounts);
            }
        } catch (error) {
            console.error('Error checking connection:', error);
        }
    }

    async connectWallet() {
        try {
            const accounts = await this.ethereum.request({
                method: 'eth_requestAccounts'
            });
            await this.handleAccountsChanged(accounts);
        } catch (error) {
            console.error('Connection error:', error);
            this.showNotification(error.message, true);
        }
    }

    async handleAccountsChanged(accounts) {
        if (!accounts?.length) {
            await this.handleDisconnect();
            return;
        }

        this.account = accounts[0];
        this.web3 = new Web3(this.ethereum);
        
        // Update UI
        this.connectButton.innerHTML = `<img src="${tokenData.logoUrl}" alt="XGT Logo" class="xgt-logo-button"> Connected`;
        this.walletStatus.textContent = `STATUS: CONNECTED TO ${this.account.substring(0, 6)}...`;
        this.isConnected = true;

        // Show mining controls
        if (this.miningControls) {
            this.miningControls.style.display = 'block';
        }

        await this.loadMiningStats();
    }

    async handleDisconnect() {
        this.account = null;
        this.isConnected = false;
        
        // Update UI
        if (this.connectButton) {
            this.connectButton.innerHTML = `<img src="${tokenData.logoUrl}" alt="XGT Logo" class="xgt-logo-button"> Connect Wallet`;
        }
        if (this.walletStatus) {
            this.walletStatus.textContent = 'STATUS: DISCONNECTED';
        }
        if (this.miningControls) {
            this.miningControls.style.display = 'none';
        }
    }

    async loadTokenStats() {
        try {
            // In a production environment, these would be fetched from an API
            const response = await fetch('https://api.pancakeswap.info/api/v2/tokens/' + tokenData.contract_address);
            const data = await response.json();

            if (this.priceElement) {
                this.priceElement.textContent = '$' + parseFloat(data.data.price).toFixed(8);
            }
            if (this.marketCapElement) {
                this.marketCapElement.textContent = '$' + this.formatNumber(data.data.price * 80000000000);
            }
            if (this.volumeElement) {
                this.volumeElement.textContent = '$' + this.formatNumber(data.data.volume24h);
            }
            // Holders would be fetched from BSCScan API in production
            if (this.holdersElement) {
                this.holdersElement.textContent = 'Loading...';
            }
        } catch (error) {
            console.error('Error loading token stats:', error);
        }
    }

    async loadMiningStats() {
        if (!this.isConnected) return;

        try {
            const contract = new this.web3.eth.Contract(tokenABI, tokenData.contract_address);
            const stats = await contract.methods.getMiningStats(this.account).call();

            if (this.nextBlock) {
                this.nextBlock.textContent = stats.nextMiningBlock;
            }
            if (this.blocksWait) {
                this.blocksWait.textContent = stats.blocksToWait;
            }
            if (this.currentReward) {
                this.currentReward.textContent = this.web3.utils.fromWei(stats.currentReward, 'ether');
            }

            // Enable/disable mine button
            if (this.mineButton) {
                this.mineButton.disabled = parseInt(stats.blocksToWait) > 0;
            }
        } catch (error) {
            console.error('Error loading mining stats:', error);
        }
    }

    async startMining() {
        if (!this.isConnected) {
            this.showNotification('Please connect your wallet first', true);
            return;
        }

        try {
            const contract = new this.web3.eth.Contract(tokenABI, tokenData.contract_address);
            await contract.methods.mine().send({ from: this.account });
            this.showNotification('Mining successful! Tokens have been added to your wallet.', false);
            await this.loadMiningStats();
        } catch (error) {
            console.error('Mining error:', error);
            this.showNotification(error.message, true);
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0
        }).format(num);
    }

    showNotification(message, isError = false) {
        // Implementation depends on your notification system
        console.log(isError ? 'Error:' : 'Success:', message);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.tokenPage = new TokenPage();
});
