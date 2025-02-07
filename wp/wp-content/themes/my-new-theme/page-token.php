<?php
/**
 * Template Name: Token Page
 * 
 * This is the template that displays the XGT token page.
 */

get_header(); ?>

<main class="token-landing">
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1>XGT Token</h1>
                    <h2>Excalibur Global Trading</h2>
                    <p class="lead">Revolutionizing DeFi with Dual-Mining Technology</p>
                    <div class="hero-buttons">
                        <a href="#" class="btn btn-primary btn-lg" id="buy-xgt">Buy XGT</a>
                        <a href="#" class="btn btn-outline-primary btn-lg" id="start-mining">Start Mining</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/xgt-hero.png" alt="XGT Platform" class="img-fluid">
                </div>
            </div>
        </div>
    </section>

    <!-- Token Stats -->
    <section class="token-stats">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="stat-card">
                        <h3>Current Price</h3>
                        <p id="xgt-price">Loading...</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card">
                        <h3>Market Cap</h3>
                        <p id="market-cap">Loading...</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card">
                        <h3>24h Volume</h3>
                        <p id="volume">Loading...</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat-card">
                        <h3>Holders</h3>
                        <p id="holders">Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
        <div class="container">
            <h2 class="section-title">About XGT Token</h2>
            <div class="row">
                <div class="col-md-6">
                    <h3>What is XGT?</h3>
                    <p>XGT (Excalibur Global Trading) operates a dual-mining system with 80B max supply and 1000 XGT/block rewards. Our platform combines traditional mining with DeFi capabilities, creating a unique ecosystem for traders and miners alike.</p>
                </div>
                <div class="col-md-6">
                    <h3>Key Features</h3>
                    <ul class="feature-list">
                        <li>Dual-Mining System</li>
                        <li>Auto-Liquidity Generation</li>
                        <li>Deflationary Mechanism</li>
                        <li>Dynamic Reward Scaling</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Tokenomics Section -->
    <section id="tokenomics" class="section bg-light">
        <div class="container">
            <h2 class="section-title">Tokenomics</h2>
            <div class="row">
                <div class="col-md-6">
                    <div class="tokenomics-card">
                        <h3>Token Distribution</h3>
                        <ul>
                            <li>Initial Liquidity: 5% (4B XGT)</li>
                            <li>Team/Development: 20% (16B XGT)</li>
                            <li>Project Reserve: 25% (20B XGT)</li>
                            <li>Minable Supply: 50% (40B XGT)</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="tokenomics-card">
                        <h3>Token Details</h3>
                        <ul>
                            <li>Max Supply: 80 Billion XGT</li>
                            <li>Block Reward: 1000 XGT</li>
                            <li>Network: Binance Smart Chain</li>
                            <li>Token Standard: BEP-20</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Mining Section -->
    <section id="mining" class="section">
        <div class="container">
            <h2 class="section-title">Start Mining XGT</h2>
            <div class="mining-interface">
                <div class="wallet-connection">
                    <button id="connect-wallet" class="btn btn-primary">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-32.svg" alt="XGT Logo" class="xgt-logo-button"> Connect Wallet
                    </button>
                    <div id="wallet-status" class="wallet-status">STATUS: DISCONNECTED</div>
                </div>
                <div id="mining-controls" class="mining-controls" style="display: none;">
                    <div class="mining-stats">
                        <div>Next Mining Block: <span id="next-block">-</span></div>
                        <div>Blocks to Wait: <span id="blocks-wait">-</span></div>
                        <div>Current Reward: <span id="current-reward">-</span> XGT</div>
                    </div>
                    <button id="mine-button" class="btn btn-success" disabled>Start Mining</button>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Join the XGT Community</h2>
            <p>Be part of the future of decentralized trading and mining</p>
            <div class="social-links">
                <a href="https://t.me/XGTToken" target="_blank" class="btn btn-outline-light">Telegram</a>
                <a href="https://twitter.com/XGTToken" target="_blank" class="btn btn-outline-light">Twitter</a>
                <a href="https://discord.gg/XGTToken" target="_blank" class="btn btn-outline-light">Discord</a>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
