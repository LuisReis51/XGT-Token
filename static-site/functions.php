<?php
function excalibur_scripts() {
    // Enqueue styles
    wp_enqueue_style('excalibur-reset', get_template_directory_uri() . '/css/reset.css');
    wp_enqueue_style('excalibur-style', get_template_directory_uri() . '/css/style.css');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

    // Enqueue scripts
    wp_enqueue_script('web3', 'https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js', array(), null, true);
    wp_enqueue_script('excalibur-main', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true);
    wp_enqueue_script('excalibur-web3', get_template_directory_uri() . '/js/web3.js', array('web3'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'excalibur_scripts');

// Add theme support
function excalibur_setup() {
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'excalibur_setup');
?>
