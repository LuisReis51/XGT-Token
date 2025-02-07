(function($) {
    'use strict';

    class WalletConnect {
        constructor() {
            if (typeof window.ethereum === 'undefined') {
                console.log('MetaMask not installed');
                this.showNotification('Please install MetaMask to use this feature', true);
                return;
            }

            this.ethereum = window.ethereum;
            this.provider = null;
            this.signer = null;
            this.currentAccount = null;
            this.isConnected = false;

            this.connectButton = document.getElementById('connect-wallet');
            this.walletStatus = document.getElementById('wallet-status');

            if (this.connectButton && this.walletStatus) {
                this.connectButton.addEventListener('click', () => this.connectWallet());
                this.checkPreviousConnection();
            }
        }

        async checkPreviousConnection() {
            try {
                const accounts = await this.ethereum.request({
                    method: 'eth_accounts'
                });
                
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
                if (error.code === 4001) {
                    this.showNotification('Please connect your wallet to continue', true);
                } else {
                    this.showNotification('Error connecting wallet: ' + error.message, true);
                }
            }
        }

        async handleAccountsChanged(accounts) {
            if (!accounts?.length) {
                await this.disconnectWallet();
                return;
            }

            this.currentAccount = accounts[0];
            console.log('Setting up account:', this.currentAccount);

            try {
                this.provider = new ethers.providers.Web3Provider(this.ethereum);
                this.signer = this.provider.getSigner();

                // Update UI
                this.connectButton.innerHTML = '<img src="' + miningData.logoUrl + '" alt="XGT Logo" class="xgt-logo-button"> Connected';
                this.walletStatus.innerHTML = '<p>Connected to ' + this.currentAccount.substring(0, 6) + '...</p>';
                this.isConnected = true;

                // Setup listeners
                this.ethereum.on('accountsChanged', (accts) => this.handleAccountsChanged(accts));
                this.ethereum.on('chainChanged', () => window.location.reload());
                this.ethereum.on('disconnect', () => this.disconnectWallet());

            } catch (error) {
                console.error('Wallet connection error:', error);
                this.showNotification('Error connecting wallet: ' + error.message, true);
                await this.disconnectWallet();
            }
        }

        async disconnectWallet() {
            this.provider = null;
            this.signer = null;
            this.currentAccount = null;
            this.isConnected = false;
            
            this.connectButton.innerHTML = '<img src="' + miningData.logoUrl + '" alt="XGT Logo" class="xgt-logo-button"> Connect Wallet';
            this.walletStatus.innerHTML = '<p>Status: Not connected</p>';
        }

        showNotification(message, isError = false) {
            this.walletStatus.innerHTML = '<p style="color: ' + (isError ? '#f44336' : '#4CAF50') + '">' + message + '</p>';
        }
    }

    // Initialize when DOM is ready
    $(document).ready(() => {
        window.walletConnect = new WalletConnect();
    });

})(jQuery);
