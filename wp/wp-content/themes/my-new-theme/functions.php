<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Enqueue scripts and styles
function enqueue_mining_scripts() {
    // Only load on mining page
    if (!is_page('mining')) {
        return;
    }

    // Ethers.js from unpkg
    wp_enqueue_script(
        'ethers-js',
        'https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js',
        array('jquery'),
        '5.7.2',
        true
    );

    // Mining JS with proper dependencies
    wp_enqueue_script(
        'mining-js',
        get_template_directory_uri() . '/assets/js/mining.js',
        array('jquery', 'ethers-js'),
        '1.0.1',
        true
    );

    // Localize script with contract data
    wp_localize_script('mining-js', 'miningData', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('mining_nonce'),
        'contract_address' => '0x654E38A4516F5476D723D770382A5EaF8Bae0e0D',
        'network' => array(
            'chainId' => '0x38', // BSC Mainnet
            'chainName' => 'Binance Smart Chain',
            'nativeCurrency' => array(
                'name' => 'BNB',
                'symbol' => 'BNB',
                'decimals' => 18
            ),
            'rpcUrls' => array('https://bsc-dataseed.binance.org/'),
            'blockExplorerUrls' => array('https://bscscan.com/')
        ),
        'logoUrl' => get_template_directory_uri() . '/assets/images/logo-32.svg'
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_mining_scripts');

function enqueue_wallet_scripts() {
    // Only load on XGT page
    if (!is_page('xgt')) {
        return;
    }

    // Ethers.js from unpkg
    wp_enqueue_script(
        'ethers-js',
        'https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js',
        array('jquery'),
        '5.7.2',
        true
    );

    // Wallet JS with proper dependencies
    wp_enqueue_script(
        'wallet-js',
        get_template_directory_uri() . '/assets/js/wallet.js',
        array('jquery', 'ethers-js'),
        '1.0.0',
        true
    );

    // Localize script with data
    wp_localize_script('wallet-js', 'miningData', array(
        'logoUrl' => get_template_directory_uri() . '/assets/images/logo-32.svg'
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_wallet_scripts');

function enqueue_transactions_scripts() {
    // Only load on transactions page
    if (!is_page('transactions')) {
        return;
    }

    // Ethers.js from unpkg
    wp_enqueue_script(
        'ethers-js',
        'https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js',
        array('jquery'),
        '5.7.2',
        true
    );

    // Transactions JS
    wp_enqueue_script(
        'transactions-js',
        get_template_directory_uri() . '/assets/js/transactions.js',
        array('jquery', 'ethers-js'),
        '1.0.0',
        true
    );

    // Localize script with data
    wp_localize_script('transactions-js', 'transactionData', array(
        'contract_address' => '0x654E38A4516F5476D723D770382A5EaF8Bae0e0D',
        'network' => array(
            'chainId' => '0x38', // BSC Mainnet
            'chainName' => 'Binance Smart Chain',
            'nativeCurrency' => array(
                'name' => 'BNB',
                'symbol' => 'BNB',
                'decimals' => 18
            ),
            'rpcUrls' => array('https://bsc-dataseed.binance.org/'),
            'blockExplorerUrls' => array('https://bscscan.com/')
        ),
        'logoUrl' => get_template_directory_uri() . '/assets/images/logo-32.svg'
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_transactions_scripts');

function enqueue_token_page_scripts() {
    // Only load on token page
    if (!is_page('token') && !is_page_template('page-token.php')) {
        return;
    }

    // Bootstrap CSS
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        array(),
        '5.3.0'
    );

    // Token page specific styles
    wp_enqueue_style(
        'token-page-css',
        get_template_directory_uri() . '/assets/css/token-page.css',
        array('bootstrap-css'),
        '1.0.0'
    );

    // Bootstrap JS
    wp_enqueue_script(
        'bootstrap-js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
        array('jquery'),
        '5.3.0',
        true
    );

    // Web3.js
    wp_enqueue_script(
        'web3-js',
        'https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js',
        array(),
        '1.5.2',
        true
    );

    // Token page specific JS
    wp_enqueue_script(
        'token-page-js',
        get_template_directory_uri() . '/assets/js/token-page.js',
        array('jquery', 'web3-js'),
        '1.0.0',
        true
    );

    // Localize script with token data
    wp_localize_script('token-page-js', 'tokenData', array(
        'contract_address' => '0x654E38A4516F5476D723D770382A5EaF8Bae0e0D',
        'network' => array(
            'chainId' => '0x38',
            'chainName' => 'Binance Smart Chain',
            'rpcUrls' => array('https://bsc-dataseed.binance.org/'),
            'blockExplorerUrls' => array('https://bscscan.com/')
        ),
        'logoUrl' => get_template_directory_uri() . '/assets/images/logo-32.svg'
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_token_page_scripts');

// Register Receipt Custom Post Type
function register_receipt_post_type() {
    $labels = array(
        'name'               => 'Receipts',
        'singular_name'      => 'Receipt',
        'menu_name'          => 'Receipts',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Receipt',
        'edit_item'          => 'Edit Receipt',
        'new_item'           => 'New Receipt',
        'view_item'          => 'View Receipt',
        'search_items'       => 'Search Receipts',
        'not_found'          => 'No receipts found',
        'not_found_in_trash' => 'No receipts found in Trash'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'query_var'           => true,
        'rewrite'             => array('slug' => 'receipt'),
        'capability_type'     => 'post',
        'hierarchical'        => false,
        'menu_position'       => 5,
        'supports'            => array('title', 'custom-fields'),
        'menu_icon'           => 'dashicons-media-text'
    );

    register_post_type('receipt', $args);

    // Register custom fields
    register_meta('post', 'transaction_id', array(
        'type' => 'string',
        'description' => 'Transaction ID',
        'single' => true,
        'show_in_rest' => true,
    ));

    register_meta('post', 'date', array(
        'type' => 'string',
        'description' => 'Transaction Date',
        'single' => true,
        'show_in_rest' => true,
    ));

    register_meta('post', 'amount', array(
        'type' => 'string',
        'description' => 'Transaction Amount',
        'single' => true,
        'show_in_rest' => true,
    ));

    register_meta('post', 'sender', array(
        'type' => 'string',
        'description' => 'Sender Address',
        'single' => true,
        'show_in_rest' => true,
    ));

    register_meta('post', 'receiver', array(
        'type' => 'string',
        'description' => 'Receiver Address',
        'single' => true,
        'show_in_rest' => true,
    ));
}
add_action('init', 'register_receipt_post_type');

function clean_receipts() {
    $args = array(
        'post_type' => 'receipt',
        'posts_per_page' => -1,
        'meta_query' => array(
            'relation' => 'OR',
            array(
                'key' => 'transaction_id',
                'compare' => 'NOT EXISTS'
            ),
            array(
                'key' => 'transaction_id',
                'value' => '',
                'compare' => '='
            )
        )
    );

    $query = new WP_Query($args);
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            wp_delete_post(get_the_ID(), true);
        }
    }
    wp_reset_postdata();
}
add_action('init', 'clean_receipts');

// Email configuration
function configure_smtp_email() {
    add_filter('wp_mail_from', function($email) {
        return 'contact@excaliburglobal.farm';
    });
    
    add_filter('wp_mail_from_name', function($name) {
        return 'XGT Token Team';
    });
}
add_action('init', 'configure_smtp_email');

// Add theme support
function my_new_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption'
    ));
    add_theme_support('menus');
    add_theme_support('page-templates');
    add_page_template('page-token.php', 'Token Page');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'footer' => 'Footer Menu'
    ));
}
add_action('after_setup_theme', 'my_new_theme_setup');

// Fix page templates and redirects
function fix_page_templates($template) {
    if (is_page('receipts')) {
        $new_template = locate_template(array('page-receipts.php'));
        if ('' != $new_template) {
            return $new_template;
        }
    }
    return $template;
}
add_filter('template_include', 'fix_page_templates', 99);

// Add rewrite rules
function add_custom_rewrite_rules() {
    add_rewrite_rule('^receipts/?$', 'index.php?pagename=receipts', 'top');
    flush_rewrite_rules();
}
add_action('init', 'add_custom_rewrite_rules');
