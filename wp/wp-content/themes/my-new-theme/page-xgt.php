<?php get_header(); ?>

<main class="main xgt-dark-theme">
    <section class="documentation">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/xgt-logo-256.png" alt="XGT Logo" class="xgt-logo-top">
        <h1>XG Token (XGT) Documentation</h1>
        <p>XG Token (XGT) is a minable BEP-20 token on the Binance Smart Chain, designed to support global food security and sustainable development initiatives.</p>
        <h2 class="xgt-heading">Token Details</h2>
        <ul>
            <li><strong>Token Name:</strong> XG Token</li>
            <li><strong>Symbol:</strong> XGT</li>
            <li><strong>Decimals:</strong> 18</li>
            <li><strong>Contract Address:</strong> 0x654E38A4516F5476D723D770382A5EaF8Bae0e0D</li>
        </ul>
        <h2 class="xgt-heading">How to Use XGT</h2>
        <p>Instructions on how to use the XGT token...</p>
    </section>

    <section class="wallet-hookup">
        <h2 class="xgt-heading">Connect Your Wallet</h2>
        <div class="wallet-connection">
            <button id="connect-wallet" class="btn btn-blue">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-32.svg" alt="XGT Logo" class="xgt-logo-button"> Connect Wallet
            </button>
            <div id="wallet-status" class="wallet-status">
                <p>Status: Not connected</p>
            </div>
        </div>

        <div id="mining-content" class="mining-content">
            <button id="start-mining" class="btn btn-green" disabled>Start Mining</button>
            <div id="mining-status" class="mining-status">
                <div class="progress-bar">
                    <div id="mining-progress" class="mining-progress"></div>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
.xgt-dark-theme {
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 2rem;
}

.documentation {
    max-width: 800px;
    margin: 0 auto;
}

.xgt-logo-top {
    display: block;
    margin: 0 auto 2rem;
    max-width: 256px;
}

.xgt-heading {
    color: #4CAF50;
    margin: 2rem 0 1rem;
}

.wallet-hookup {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #2a2a2a;
    border-radius: 10px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
}

.btn-blue {
    background-color: #007bff;
    color: white;
}

.btn-green {
    background-color: #28a745;
    color: white;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.wallet-connection {
    margin: 20px 0;
}

.wallet-status {
    margin-top: 10px;
    font-size: 14px;
    color: #aaa;
}

.mining-status {
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
    height: 20px;
}

.mining-progress {
    height: 100%;
    background-color: #4CAF50;
    transition: width 0.3s ease;
    width: 0%;
}

.progress-bar {
    width: 100%;
    background-color: #333;
    border-radius: 10px;
    overflow: hidden;
}

.show {
    opacity: 1;
    visibility: visible;
}
</style>

<?php get_footer(); ?>
