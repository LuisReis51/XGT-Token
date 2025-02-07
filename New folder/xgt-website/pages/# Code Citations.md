# Code Citations

## License: GPL_2_0
https://github.com/Automattic/themes/tree/50a815c05939b6c6fc6e1a2bb83ee79a2ff22978/mpho/templates/404.html

```
":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<main class="wp-block-group" style="margin-top:var(--wp
```


## License: GPL_2_0
https://github.com/Automattic/themes/tree/50a815c05939b6c6fc6e1a2bb83ee79a2ff22978/didone/templates/404.html

```
:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<main class="wp-block-group" style="margin-top:var(--wp--preset-
```


## License: unknown
https://github.com/luiselcue/stepup/tree/3ca5c5c28f70eeae3d4cb6d35139930b085da4f3/parts/stepup-footer.html

```
-spacing--60)">
    <!-- wp:group {"align":"full","layout":{"type":"default"}} -->
    <div class="wp-block-group alignfull">
        <
```

## License: GPL_2_0
https://github.com/Automattic/themes/tree/50a815c05939b6c6fc6e1a2bb83ee79a2ff22978/wp-content/themes/my-new-theme/functions.php

```php
<?php
function my_new_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'my-new-theme'),
    ));
}
add_action('after_setup_theme', 'my_new_theme_setup');

function my_new_theme_scripts() {
    wp_enqueue_style('my-new-theme-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'my_new_theme_scripts');
```

