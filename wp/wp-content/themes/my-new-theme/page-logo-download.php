<?php
/**
 * Template Name: Logo Download
 */

if (isset($_GET['download'])) {
    // Set headers for SVG download
    header('Content-Type: image/svg+xml');
    header('Content-Disposition: attachment; filename="xgt-logo-32.svg"');
    header('Content-Length: ' . filesize(get_template_directory() . '/assets/images/logo-32.svg'));
    header('Cache-Control: no-cache');

    // Output the SVG file
    readfile(get_template_directory() . '/assets/images/logo-32.svg');
    exit;
} else {
    get_header();
    ?>

    <main class="logo-download-page">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body text-center">
                            <h1>XGT Token Logo</h1>
                            <div class="logo-preview my-4">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-32.svg" alt="XGT Token Logo" style="width: 128px; height: 128px;">
                            </div>
                            <p>Official XGT Token logo (32x32 SVG)</p>
                            <a href="?download=1" class="btn btn-primary btn-lg">Download Logo</a>
                            <div class="mt-4">
                                <small class="text-muted">For official use and listing purposes only</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <style>
    .logo-download-page {
        padding: 4rem 0;
        background: #f8f9fa;
        min-height: calc(100vh - 76px);
    }
    .card {
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .logo-preview {
        background: #fff;
        padding: 2rem;
        border-radius: 10px;
        display: inline-block;
    }
    .logo-preview img {
        display: block;
        margin: 0 auto;
    }
    </style>

    <?php
    get_footer();
}
?>
