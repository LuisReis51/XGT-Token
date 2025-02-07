<?php
/* Template Name: Receipts Page */
get_header(); ?>

<main class="main receipts-page">
    <section class="receipts">
        <h1>Crypto Transaction Receipts</h1>
        <div id="receipts-content">
            <?php
            $args = array(
                'post_type' => 'receipt',
                'posts_per_page' => -1
            );
            $receipts = new WP_Query($args);
            if ($receipts->have_posts()) :
                while ($receipts->have_posts()) : $receipts->the_post(); ?>
                    <div class="receipt">
                        <h2><?php the_title(); ?></h2>
                        <p><strong>Transaction ID:</strong> <?php echo get_post_meta(get_the_ID(), 'transaction_id', true); ?></p>
                        <p><strong>Date:</strong> <?php echo get_post_meta(get_the_ID(), 'date', true); ?></p>
                        <p><strong>Amount:</strong> <?php echo get_post_meta(get_the_ID(), 'amount', true); ?></p>
                        <p><strong>Sender:</strong> <?php echo get_post_meta(get_the_ID(), 'sender', true); ?></p>
                        <p><strong>Receiver:</strong> <?php echo get_post_meta(get_the_ID(), 'receiver', true); ?></p>
                    </div>
                <?php endwhile;
            else :
                echo '<p>No receipts found.</p>';
            endif;
            wp_reset_postdata();
            ?>
        </div>
    </section>
</main>

<style>
.receipts-page {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.receipt {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.receipt h2 {
    color: #333;
    margin-bottom: 1rem;
}

.receipt p {
    margin: 0.5rem 0;
    color: #666;
}

.receipt strong {
    color: #333;
}
</style>

<?php get_footer(); ?>
