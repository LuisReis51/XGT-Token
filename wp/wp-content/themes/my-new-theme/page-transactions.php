<?php
/* Template Name: Transactions Page */
get_header(); ?>

<main class="main transactions-page">
    <section class="transactions">
        <div class="terminal-header">
            <div class="terminal-buttons">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="terminal-title">XGT Transaction Terminal</div>
        </div>

        <div class="terminal-content">
            <div class="ascii-art">
                <pre>
     __   __ ______ _______
     \ \ / /|  ____|__   __|
      \ V / | |__     | |
       > G  |  __|    | |
      / . \ | |____   | |
     /_/ \_\|______|  |_|
                </pre>
            </div>

            <div id="wallet-connection" class="terminal-section">
                <div class="terminal-prompt">> System Status: <span class="blink">_</span></div>
                <button id="connect-wallet" class="terminal-button">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-32.svg" alt="XGT Logo" class="xgt-logo-button"> Initialize Wallet Connection
                </button>
                <div id="wallet-status" class="terminal-status">STATUS: DISCONNECTED</div>
            </div>

            <div id="transactions-list" class="transactions-list">
                <!-- Transactions will be loaded here via JavaScript -->
            </div>
        </div>
    </section>
</main>

<style>
.transactions-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    background: #0a0a0a;
    color: #00ff00;
    min-height: 100vh;
    font-family: 'Courier New', monospace;
}

.transactions {
    background: #000000;
    border: 1px solid #00ff00;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
}

.terminal-header {
    background: #1a1a1a;
    padding: 10px;
    border-bottom: 1px solid #00ff00;
    display: flex;
    align-items: center;
}

.terminal-buttons {
    display: flex;
    gap: 5px;
    margin-right: 15px;
}

.terminal-buttons span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #333;
}

.terminal-buttons span:nth-child(1) { background: #ff5f56; }
.terminal-buttons span:nth-child(2) { background: #ffbd2e; }
.terminal-buttons span:nth-child(3) { background: #27c93f; }

.terminal-title {
    color: #00ff00;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.terminal-content {
    padding: 20px;
}

.ascii-art {
    color: #00ff00;
    text-align: center;
    margin-bottom: 20px;
    font-size: 12px;
}

.terminal-section {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #00ff00;
    background: rgba(0, 255, 0, 0.05);
}

.terminal-prompt {
    color: #00ff00;
    margin-bottom: 10px;
}

.terminal-button {
    background: #000;
    color: #00ff00;
    border: 1px solid #00ff00;
    padding: 10px 20px;
    font-family: 'Courier New', monospace;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.terminal-button:hover {
    background: #00ff00;
    color: #000;
}

.terminal-status {
    margin-top: 10px;
    color: #888;
}

.transaction-item {
    margin: 15px 0;
    padding: 15px;
    border: 1px solid #00ff00;
    background: rgba(0, 255, 0, 0.05);
    font-size: 14px;
    position: relative;
    overflow: hidden;
}

.transaction-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
}

.transaction-item .hash {
    color: #00ff00;
    font-family: monospace;
    margin-bottom: 10px;
}

.transaction-item .hash a {
    color: #00ff00;
    text-decoration: none;
}

.transaction-item .hash a:hover {
    text-decoration: underline;
}

.transaction-item .details {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    margin-top: 10px;
}

.transaction-item .label {
    color: #888;
}

.transaction-item .value {
    color: #00ff00;
}

.transaction-item .amount {
    font-size: 1.2em;
    text-align: right;
    margin-top: 10px;
    font-weight: bold;
}

.transaction-item .amount.sent {
    color: #ff4444;
}

.transaction-item .amount.received {
    color: #00ff00;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.blink {
    animation: blink 1s infinite;
}

.loading {
    text-align: center;
    padding: 2rem;
    color: #00ff00;
    font-style: italic;
}

/* Matrix-style background animation */
.transaction-item {
    position: relative;
}

.transaction-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px) 0 0 / 50px 50px;
    pointer-events: none;
    opacity: 0.1;
}
</style>

<?php get_footer(); ?>
