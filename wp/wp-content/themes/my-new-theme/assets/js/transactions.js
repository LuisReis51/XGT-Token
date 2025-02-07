(function($) {
    'use strict';

    class TransactionManager {
        constructor() {
            if (typeof window.ethereum === 'undefined') {
                console.log('MetaMask not installed');
                this.showNotification('Please install MetaMask to view transactions', true);
                return;
            }

            this.ethereum = window.ethereum;
            this.provider = null;
            this.signer = null;
            this.currentAccount = null;
            this.isConnected = false;

            this.connectButton = document.getElementById('connect-wallet');
            this.walletStatus = document.getElementById('wallet-status');
            this.transactionsList = document.getElementById('transactions-list');

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
                    this.showNotification('Please connect your wallet to view transactions', true);
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
                this.connectButton.innerHTML = '<img src="' + transactionData.logoUrl + '" alt="XGT Logo" class="xgt-logo-button"> Connected';
                this.walletStatus.textContent = 'STATUS: CONNECTED TO ' + this.currentAccount.substring(0, 6) + '...';
                this.isConnected = true;

                // Setup listeners
                this.ethereum.on('accountsChanged', (accts) => this.handleAccountsChanged(accts));
                this.ethereum.on('chainChanged', () => window.location.reload());
                this.ethereum.on('disconnect', () => this.disconnectWallet());

                // Load transactions
                await this.loadTransactions();

            } catch (error) {
                console.error('Wallet connection error:', error);
                this.showNotification('Error connecting wallet: ' + error.message, true);
                await this.disconnectWallet();
            }
        }

        async loadTransactions() {
            if (!this.isConnected) return;

            this.transactionsList.innerHTML = '<div class="loading">> Initializing blockchain scan...</div>';

            try {
                const latestBlock = await this.provider.getBlockNumber();
                const contract = new ethers.Contract(
                    transactionData.contract_address,
                    ['event Transfer(address indexed from, address indexed to, uint256 value)'],
                    this.provider
                );

                const sentFilter = contract.filters.Transfer(this.currentAccount, null);
                const receivedFilter = contract.filters.Transfer(null, this.currentAccount);

                const [sentEvents, receivedEvents] = await Promise.all([
                    contract.queryFilter(sentFilter, latestBlock - 10000, latestBlock),
                    contract.queryFilter(receivedFilter, latestBlock - 10000, latestBlock)
                ]);

                const allEvents = [...sentEvents, ...receivedEvents].sort((a, b) => b.blockNumber - a.blockNumber);

                if (allEvents.length === 0) {
                    this.transactionsList.innerHTML = '<div class="loading">> No transaction records found in database</div>';
                    return;
                }

                const transactionsHtml = await Promise.all(allEvents.map(async (event, index) => {
                    const block = await event.getBlock();
                    const date = new Date(block.timestamp * 1000);
                    const amount = ethers.utils.formatEther(event.args.value);
                    const isSent = event.args.from.toLowerCase() === this.currentAccount.toLowerCase();

                    return `
                        <div class="transaction-item">
                            <div class="hash">
                                > TRANSACTION_${(index + 1).toString().padStart(3, '0')} [${date.toISOString()}]
                                <a href="${transactionData.network.blockExplorerUrls[0]}/tx/${event.transactionHash}" target="_blank">
                                    0x${event.transactionHash}
                                </a>
                            </div>
                            <div class="details">
                                <div class="label">BLOCK_HEIGHT:</div>
                                <div class="value">${event.blockNumber}</div>
                                
                                <div class="label">FROM_ADDR:</div>
                                <div class="value">${event.args.from}</div>
                                
                                <div class="label">TO_ADDR:</div>
                                <div class="value">${event.args.to}</div>
                                
                                <div class="label">GAS_USED:</div>
                                <div class="value">${event.gasLimit.toString()}</div>
                            </div>
                            <div class="amount ${isSent ? 'sent' : 'received'}">
                                ${isSent ? '[-]' : '[+]'} ${amount} XGT
                            </div>
                        </div>
                    `;
                }));

                this.transactionsList.innerHTML = `
                    <div class="terminal-section">
                        <div class="terminal-prompt">> Found ${allEvents.length} transaction(s)</div>
                        ${transactionsHtml.join('')}
                    </div>
                `;

            } catch (error) {
                console.error('Error loading transactions:', error);
                this.transactionsList.innerHTML = '<div class="loading">> ERROR: Failed to access blockchain data</div>';
            }
        }

        async disconnectWallet() {
            this.provider = null;
            this.signer = null;
            this.currentAccount = null;
            this.isConnected = false;
            
            this.connectButton.innerHTML = '<img src="' + transactionData.logoUrl + '" alt="XGT Logo" class="xgt-logo-button"> Initialize Wallet Connection';
            this.walletStatus.textContent = 'STATUS: DISCONNECTED';
            this.transactionsList.innerHTML = '';
        }

        showNotification(message, isError = false) {
            this.walletStatus.textContent = message;
            this.walletStatus.style.color = isError ? '#ff4444' : '#00ff00';
        }
    }

    // Initialize when DOM is ready
    $(document).ready(() => {
        window.transactionManager = new TransactionManager();
    });

})(jQuery);
