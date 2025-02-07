(function($) {
    'use strict';

    const XGT_ABI = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint256)",
        "function transfer(address, uint256) returns (bool)",
        "function mine() public",
        "function lastMinedBlockByMiner(address) view returns (uint256)",
        "function blockReward() view returns (uint256)",
        "function maxSupply() view returns (uint256)"
    ];

    class XGTMining {
        constructor() {
            // Check for MetaMask
            if (typeof window.ethereum !== 'undefined') {
                console.log('MetaMask is installed!');
                this.ethereum = window.ethereum;
            } else {
                console.log('MetaMask is not installed');
                this.showNotification('Please install MetaMask to use this feature', true);
                return;
            }

            this.provider = null;
            this.signer = null;
            this.contract = null;
            this.currentAccount = null;
            this.isConnected = false;
            this.miningInterval = null;
            this.progressValue = 0;

            if (this.initializeElements()) {
                this.initializeEventListeners();
                this.checkPreviousConnection();
            }
        }

        initializeElements() {
            try {
                this.connectButton = document.getElementById('connect-wallet');
                this.mineButton = document.getElementById('start-mining');
                this.walletStatus = document.getElementById('wallet-status');
                this.miningStatus = document.getElementById('mining-status');
                this.miningProgress = document.getElementById('mining-progress');

                if (!this.connectButton || !this.mineButton || !this.walletStatus || 
                    !this.miningStatus || !this.miningProgress) {
                    console.error('Required UI elements not found:', {
                        connectButton: this.connectButton,
                        mineButton: this.mineButton,
                        walletStatus: this.walletStatus,
                        miningStatus: this.miningStatus,
                        miningProgress: this.miningProgress
                    });
                    return false;
                }
                return true;
            } catch (error) {
                console.error('Error initializing elements:', error);
                return false;
            }
        }

        initializeEventListeners() {
            this.connectButton.addEventListener('click', () => this.connectWallet());
            this.mineButton.addEventListener('click', () => this.startMining());
        }

        async checkPreviousConnection() {
            try {
                const accounts = await this.ethereum.request({
                    method: 'eth_accounts'
                });
                
                console.log('Checking accounts:', accounts);
                
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
                
                console.log('Connecting accounts:', accounts);
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
                // Initialize Web3 provider
                this.provider = new ethers.providers.Web3Provider(this.ethereum);
                await this.provider.ready;
                
                // Get signer
                this.signer = this.provider.getSigner();
                const network = await this.provider.getNetwork();
                console.log('Connected to network:', network);

                // Initialize contract
                this.contract = new ethers.Contract(
                    miningData.contract_address,
                    XGT_ABI,
                    this.signer
                );

                // Update UI
                this.connectButton.innerHTML = '<img src="' + miningData.logoUrl + '" alt="XGT Logo" class="xgt-logo-button"> Connected';
                this.mineButton.disabled = false;
                this.walletStatus.innerHTML = 'Connected to ' + this.currentAccount.substring(0, 6) + '...';
                this.isConnected = true;

                // Setup listeners
                this.ethereum.on('accountsChanged', (accts) => this.handleAccountsChanged(accts));
                this.ethereum.on('chainChanged', () => window.location.reload());
                this.ethereum.on('disconnect', () => this.disconnectWallet());

                await this.updateUI();
                this.showNotification('Wallet connected successfully!');
            } catch (error) {
                console.error('Contract initialization error:', error);
                this.showNotification('Error initializing contract: ' + error.message, true);
                await this.disconnectWallet();
            }
        }

        async disconnectWallet() {
            this.provider = null;
            this.signer = null;
            this.contract = null;
            this.currentAccount = null;
            this.isConnected = false;
            
            this.connectButton.innerHTML = '<img src="' + miningData.logoUrl + '" alt="XGT Logo" class="xgt-logo-button"> Connect Wallet';
            this.mineButton.disabled = true;
            this.walletStatus.textContent = 'Not Connected';
            this.miningProgress.style.width = '0%';
            
            if (this.miningInterval) {
                clearInterval(this.miningInterval);
            }
        }

        showNotification(message, isError = false) {
            this.miningStatus.textContent = message;
            this.miningStatus.style.borderColor = isError ? '#f44336' : '#4CAF50';
            this.miningStatus.classList.add('show');
            
            setTimeout(() => {
                this.miningStatus.classList.remove('show');
            }, 5000);
        }

        async updateUI() {
            if (!this.isConnected) return;

            try {
                const balance = await this.contract.balanceOf(this.currentAccount);
                const formattedBalance = ethers.utils.formatEther(balance);
                this.walletStatus.textContent = `Balance: ${parseFloat(formattedBalance).toFixed(2)} XGT`;

                const reward = await this.contract.blockReward();
                this.miningStatus.textContent = `Mining Reward: ${ethers.utils.formatEther(reward)} XGT`;

                const lastMined = await this.contract.lastMinedBlockByMiner(this.currentAccount);
                const currentBlock = await this.provider.getBlockNumber();
                const blocksPassed = currentBlock - lastMined;

                if (blocksPassed >= 5) {
                    this.miningStatus.textContent = 'Ready to Mine!';
                    this.mineButton.disabled = false;
                } else {
                    const blocksToWait = 5 - blocksPassed;
                    this.miningStatus.textContent = `${blocksToWait} blocks remaining`;
                    this.mineButton.disabled = true;
                }
            } catch (error) {
                console.error('Error updating UI:', error);
                this.showNotification('Error updating mining status', true);
            }
        }

        async startMining() {
            if (!this.isConnected) {
                this.showNotification('Please connect your wallet first', true);
                return;
            }

            this.mineButton.disabled = true;
            this.progressValue = 0;
            this.miningProgress.style.width = '0%';

            this.miningInterval = setInterval(() => {
                this.progressValue = Math.min(99, this.progressValue + 1);
                this.miningProgress.style.width = this.progressValue + '%';
            }, 100);

            try {
                const tx = await this.contract.mine();
                await tx.wait();

                clearInterval(this.miningInterval);
                this.progressValue = 100;
                this.miningProgress.style.width = '100%';

                this.showNotification('Mining successful! XGT tokens added to your balance.');
                await this.updateUI();

                setTimeout(() => {
                    this.progressValue = 0;
                    this.miningProgress.style.width = '0%';
                }, 2000);
            } catch (error) {
                clearInterval(this.miningInterval);
                this.progressValue = 0;
                this.miningProgress.style.width = '0%';
                this.mineButton.disabled = false;

                console.error('Mining error:', error);
                this.showNotification('Mining failed: ' + (error.data?.message || error.message), true);
            }
        }
    }

    // Initialize when DOM is ready
    $(document).ready(() => {
        window.xgtMining = new XGTMining();
    });

})(jQuery);
