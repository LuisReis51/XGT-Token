<?php
function enqueue_xgt_scripts() {
    wp_enqueue_script('web3', 'https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js', array(), null, true);
    wp_enqueue_script('xgt-integration', get_template_directory_uri() . '/js/xgt-integration.js', array('web3'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_xgt_scripts');
?>
