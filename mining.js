const XGT_ADDRESS = '0x654E38A4516F5476D723D770382A5EaF8Bae0e0D';
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
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.isConnected = false;
        this.miningInterval = null;
        this.progressValue = 0;

        this.initializeElements();
        this.initializeEventListeners();
        this.checkPreviousConnection();
    }

    initializeElements() {
        this.connectButton = document.getElementById('connectWalletBtn');
        this.mineButton = document.getElementById('mineButton');
        this.balanceElement = document.getElementById('balance');
        this.nextMiningElement = document.getElementById('nextMining');
        this.miningRewardElement = document.getElementById('miningReward');
        this.progressBar = document.getElementById('progressBar');
        this.notification = document.getElementById('notification');
        this.notificationText = document.getElementById('notificationText');
    }

    initializeEventListeners() {
        this.connectButton.addEventListener('click', () => this.connectWallet());
        this.mineButton.addEventListener('click', () => this.startMining());

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.handleDisconnect();
                } else {
                    this.connectWallet();
                }
            });

            window.ethereum.on('chainChanged', () => {
                this.connectWallet();
            });
        }
    }

    checkPreviousConnection() {
        if (window.ethereum && window.ethereum.selectedAddress) {
            this.connectWallet();
        }
    }

    showNotification(message, isError) {
        this.notificationText.textContent = message;
        this.notification.style.borderColor = isError ? '#f44336' : '#4CAF50';
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 5000);
    }

    connectWallet() {
        if (!window.ethereum) {
            this.showNotification('Please install MetaMask!', true);
            return;
        }

        window.ethereum.request({ method: 'accounts' }).then((accounts) => {
            if (!accounts || accounts.length === 0) {
                window.ethereum.request({
                    method: 'eth_requestAccounts'
                }).then((accounts) => {
                    this.handleConnection(accounts);
                }).catch((error) => {
                    console.error('Error requesting accounts:', error);
                    this.showNotification('Error requesting accounts', true);
                });
            } else {
                this.handleConnection(accounts);
            }
        }).catch((error) => {
            console.error('Error getting accounts:', error);
            this.showNotification('Error getting accounts', true);
        });
    }

    handleConnection(accounts) {
        window.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
            if (chainId !== '0x38') { // BSC Mainnet
                window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                }).then(() => {
                    this.setupContract(accounts);
                }).catch((switchError) => {
                    if (switchError.code === 4902) {
                        window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x38',
                                chainName: 'Binance Smart Chain',
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                blockExplorerUrls: ['https://bscscan.com/']
                            }]
                        }).then(() => {
                            this.setupContract(accounts);
                        }).catch((error) => {
                            console.error('Error adding BSC to MetaMask:', error);
                            this.showNotification('Error adding BSC to MetaMask', true);
                        });
                    } else {
                        console.error('Error switching to BSC:', switchError);
                        this.showNotification('Error switching to BSC', true);
                    }
                });
            } else {
                this.setupContract(accounts);
            }
        }).catch((error) => {
            console.error('Error getting chain ID:', error);
            this.showNotification('Error getting chain ID', true);
        });
    }

    setupContract(accounts) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.contract = new ethers.Contract(XGT_ADDRESS, XGT_ABI, this.signer);
        
        this.connectButton.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
        this.mineButton.disabled = false;
        this.isConnected = true;

        this.updateUI();
        this.startUIUpdateInterval();
        
        this.showNotification('Wallet connected successfully!');
    }

    handleDisconnect() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.isConnected = false;
        
        this.connectButton.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
        this.mineButton.disabled = true;
        this.balanceElement.textContent = '0.00 XGT';
        this.nextMiningElement.textContent = 'Connect Wallet';
        this.miningRewardElement.textContent = 'Connect Wallet';
        
        if (this.miningInterval) {
            clearInterval(this.miningInterval);
        }
    }

    updateUI() {
        if (!this.isConnected) return;

        const address = this.signer.getAddress();
        
        this.contract.balanceOf(address).then((balance) => {
            const formattedBalance = ethers.utils.formatEther(balance);
            this.balanceElement.textContent = `${parseFloat(formattedBalance).toFixed(2)} XGT`;
        }).catch((error) => {
            console.error('Error updating balance:', error);
            this.showNotification('Error updating balance', true);
        });

        this.contract.blockReward().then((reward) => {
            this.miningRewardElement.textContent = `${ethers.utils.formatEther(reward)} XGT`;
        }).catch((error) => {
            console.error('Error updating mining reward:', error);
            this.showNotification('Error updating mining reward', true);
        });

        this.contract.lastMinedBlockByMiner(address).then((lastMined) => {
            this.provider.getBlockNumber().then((currentBlock) => {
                const blocksPassed = currentBlock - lastMined;
                
                if (blocksPassed >= 5) {
                    this.nextMiningElement.textContent = 'Ready to Mine!';
                    this.mineButton.disabled = false;
                } else {
                    const blocksToWait = 5 - blocksPassed;
                    this.nextMiningElement.textContent = `${blocksToWait} blocks remaining`;
                    this.mineButton.disabled = true;
                }
            }).catch((error) => {
                console.error('Error getting current block number:', error);
                this.showNotification('Error getting current block number', true);
            });
        }).catch((error) => {
            console.error('Error updating last mined block:', error);
            this.showNotification('Error updating last mined block', true);
        });
    }

    startUIUpdateInterval() {
        // Update UI every 15 seconds
        setInterval(() => this.updateUI(), 15000);
    }

    startMining() {
        if (!this.isConnected) {
            this.showNotification('Please connect your wallet first', true);
            return;
        }

        this.mineButton.disabled = true;
        this.progressValue = 0;
        this.updateProgressBar();

        // Start progress animation
        this.miningInterval = setInterval(() => {
            this.progressValue = (this.progressValue + 1) % 100;
            this.progressBar.style.width = this.progressValue + '%';
        }, 100);

        // Send mining transaction
        this.contract.mine().then((tx) => {
            this.showNotification('Mining transaction submitted...');
            tx.wait().then(() => {
                // Clear mining animation
                clearInterval(this.miningInterval);
                this.progressValue = 100;
                this.progressBar.style.width = this.progressValue + '%';

                this.showNotification('Mining successful! XGT tokens added to your balance.');
                this.updateUI();

                // Reset progress after 2 seconds
                setTimeout(() => {
                    this.progressValue = 0;
                    this.progressBar.style.width = this.progressValue + '%';
                }, 2000);
            }).catch((error) => {
                clearInterval(this.miningInterval);
                this.progressValue = 0;
                this.progressBar.style.width = this.progressValue + '%';
                this.mineButton.disabled = false;
                
                console.error('Mining error:', error);
                this.showNotification('Mining failed: ' + (error.message || 'Unknown error'), true);
            });
        }).catch((error) => {
            clearInterval(this.miningInterval);
            this.progressValue = 0;
            this.progressBar.style.width = this.progressValue + '%';
            this.mineButton.disabled = false;
            
            console.error('Mining error:', error);
            this.showNotification('Mining failed: ' + (error.message || 'Unknown error'), true);
        });
    }

    updateProgressBar() {
        // Removed
    }
}

// Initialize the mining interface
(function() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMining);
    } else {
        initMining();
    }

    function initMining() {
        const xgtMining = new XGTMining();
    }
})();
