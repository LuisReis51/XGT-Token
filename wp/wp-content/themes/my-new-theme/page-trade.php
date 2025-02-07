<?php
/**
 * Template Name: Trade XGT
 * 
 * This is the template for XGT trading interface.
 */

get_header(); ?>

<main class="trade-page">
    <div class="container">
        <div class="row">
            <!-- Trading Interface -->
            <div class="col-lg-8">
                <div class="trade-card">
                    <div class="trade-header">
                        <h2>Trade XGT</h2>
                        <div class="price-info">
                            <span class="current-price">Current Price: <span id="xgt-price">Loading...</span></span>
                            <span class="price-change">24h Change: <span id="price-change">Loading...</span></span>
                        </div>
                    </div>

                    <div class="trade-form">
                        <div class="form-group">
                            <label>From</label>
                            <div class="token-input">
                                <input type="number" id="from-amount" class="form-control" placeholder="0.0">
                                <select id="from-token" class="token-select">
                                    <option value="bnb">BNB</option>
                                    <option value="xgt">XGT</option>
                                </select>
                            </div>
                        </div>

                        <div class="swap-direction">
                            <button id="swap-direction" class="btn btn-link">
                                <i class="fas fa-exchange-alt"></i>
                            </button>
                        </div>

                        <div class="form-group">
                            <label>To</label>
                            <div class="token-input">
                                <input type="number" id="to-amount" class="form-control" placeholder="0.0">
                                <select id="to-token" class="token-select">
                                    <option value="xgt">XGT</option>
                                    <option value="bnb">BNB</option>
                                </select>
                            </div>
                        </div>

                        <div class="trade-info">
                            <div class="info-row">
                                <span>Price Impact</span>
                                <span id="price-impact">-</span>
                            </div>
                            <div class="info-row">
                                <span>Minimum Received</span>
                                <span id="min-received">-</span>
                            </div>
                            <div class="info-row">
                                <span>Liquidity Provider Fee</span>
                                <span>0.25%</span>
                            </div>
                        </div>

                        <button id="connect-wallet-trade" class="btn btn-primary btn-lg btn-block">Connect Wallet</button>
                        <button id="swap-button" class="btn btn-success btn-lg btn-block" style="display: none;">Swap</button>
                    </div>
                </div>
            </div>

            <!-- Trading Stats -->
            <div class="col-lg-4">
                <div class="stats-card">
                    <h3>Trading Statistics</h3>
                    <div class="stat-row">
                        <span>24h Volume</span>
                        <span id="trading-volume">Loading...</span>
                    </div>
                    <div class="stat-row">
                        <span>Liquidity</span>
                        <span id="liquidity">Loading...</span>
                    </div>
                    <div class="stat-row">
                        <span>Market Cap</span>
                        <span id="market-cap">Loading...</span>
                    </div>
                    <div class="stat-row">
                        <span>Circulating Supply</span>
                        <span id="circulating-supply">Loading...</span>
                    </div>
                </div>

                <div class="info-card">
                    <h3>Trading Guide</h3>
                    <div class="guide-steps">
                        <div class="step">
                            <span class="step-number">1</span>
                            <p>Connect your wallet using MetaMask or Trust Wallet</p>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <p>Enter the amount you want to trade</p>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <p>Review the transaction details</p>
                        </div>
                        <div class="step">
                            <span class="step-number">4</span>
                            <p>Confirm the transaction in your wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
.trade-page {
    padding: 2rem 0;
    background: #f8f9fa;
    min-height: calc(100vh - 76px);
}

.trade-card, .stats-card, .info-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.trade-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.price-info {
    text-align: right;
}

.current-price {
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
}

.price-change {
    font-size: 0.9rem;
}

.token-input {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.token-select {
    width: 100px;
}

.swap-direction {
    text-align: center;
    margin: 1rem 0;
}

.trade-info {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.info-row:last-child {
    margin-bottom: 0;
}

.stats-card .stat-row {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
}

.stats-card .stat-row:last-child {
    border-bottom: none;
}

.guide-steps .step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.step-number {
    background: #007bff;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    flex-shrink: 0;
}

.btn-block {
    width: 100%;
    margin-top: 1rem;
}
</style>

<?php get_footer(); ?>
