// XGT Token Integration
const XGT_CONTRACT_ADDRESS = '0x...'; // Replace with actual contract address
const XGT_ABI = []; // Replace with actual ABI

class XGTIntegration {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.init();
    }

    async init() {
        if (typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.account = (await this.web3.eth.getAccounts())[0];
                this.contract = new this.web3.eth.Contract(XGT_ABI, XGT_CONTRACT_ADDRESS);
                this.setupEventListeners();
                this.updateUI();
            } catch (error) {
                console.error('User denied account access');
            }
        }
    }

    setupEventListeners() {
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            this.account = accounts[0];
            this.updateUI();
        });

        // Listen for network changes
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }

    async updateUI() {
        if (this.account) {
            const balance = await this.getBalance();
            document.getElementById('xgt-balance').textContent = this.web3.utils.fromWei(balance, 'ether');
        }
    }

    async getBalance() {
        try {
            return await this.contract.methods.balanceOf(this.account).call();
        } catch (error) {
            console.error('Error fetching balance:', error);
            return '0';
        }
    }

    // Farming Rewards
    async claimFarmingRewards(farmerId, sustainabilityScore) {
        try {
            await this.contract.methods.claimFarmingRewards(farmerId, sustainabilityScore)
                .send({ from: this.account });
        } catch (error) {
            console.error('Error claiming farming rewards:', error);
        }
    }

    // Community Development
    async contributeToCommunity(projectId, amount) {
        try {
            const weiAmount = this.web3.utils.toWei(amount.toString(), 'ether');
            await this.contract.methods.contributeToCommunity(projectId)
                .send({ from: this.account, value: weiAmount });
        } catch (error) {
            console.error('Error contributing to community:', error);
        }
    }

    // Supply Chain Tracking
    async registerProduct(productId, productData) {
        try {
            await this.contract.methods.registerProduct(productId, productData)
                .send({ from: this.account });
        } catch (error) {
            console.error('Error registering product:', error);
        }
    }

    // Governance
    async submitProposal(proposalId, description) {
        try {
            await this.contract.methods.submitProposal(proposalId, description)
                .send({ from: this.account });
        } catch (error) {
            console.error('Error submitting proposal:', error);
        }
    }

    async vote(proposalId, support) {
        try {
            await this.contract.methods.vote(proposalId, support)
                .send({ from: this.account });
        } catch (error) {
            console.error('Error voting:', error);
        }
    }
}

// Initialize XGT Integration
document.addEventListener('DOMContentLoaded', () => {
    window.xgtIntegration = new XGTIntegration();
});
