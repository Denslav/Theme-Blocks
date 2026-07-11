<?php
/**
 * Plugin Name: Theme Blocks
 * Description: Registers custom dynamic Gutenberg blocks.
 * Version: 1.1.1
 * Author: Den Slav
 * Text Domain: theme-blocks
 * Domain Path: /languages
 * Requires at least: 6.3
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load plugin translations.
 */
function theme_blocks_load_textdomain() {
	load_plugin_textdomain(
		'theme-blocks',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'theme_blocks_load_textdomain' );

/**
 * Register all blocks that contain a block.json file.
 */
function theme_blocks_register_blocks() {
	$blocks_dir  = plugin_dir_path( __FILE__ ) . 'blocks';
	$block_files = glob( $blocks_dir . '/*/block.json' );

	if ( ! is_array( $block_files ) ) {
		return;
	}

	foreach ( $block_files as $block_json ) {
		register_block_type( dirname( $block_json ) );
	}
}
add_action( 'init', 'theme_blocks_register_blocks' );

/**
 * Add a separate category for plugin blocks.
 *
 * @param array $categories Existing block categories.
 * @return array
 */
function theme_blocks_register_category( $categories ) {
	array_unshift(
		$categories,
		array(
			'slug'  => 'theme-blocks',
			'title' => __( 'Theme Blocks', 'theme-blocks' ),
			'icon'  => null,
		)
	);

	return $categories;
}
add_filter( 'block_categories_all', 'theme_blocks_register_category' );
