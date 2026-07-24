<?php
/**
 * Plugin Name:       Theme Blocks
 * Plugin URI:        https://github.com/Denslav/Theme-Blocks
 * Description:       Registers custom dynamic Gutenberg blocks.
 * Version:           1.1.2
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Author:            Den Slav
 * Author URI:        https://github.com/Denslav
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       theme-blocks
 * Domain Path:       /languages
 *
 * @package ThemeBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Current plugin version.
 */
define( 'THEME_BLOCKS_VERSION', '1.1.2' );

/**
 * Absolute path to the plugin directory.
 */
define( 'THEME_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Load plugin translations.
 */
function theme_blocks_load_textdomain(): void {
	load_plugin_textdomain(
		'theme-blocks',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'theme_blocks_load_textdomain' );

/**
 * Register every block directory containing a block.json file.
 */
function theme_blocks_register_blocks(): void {
	$blocks_dir = THEME_BLOCKS_PATH . 'blocks';

	if ( ! is_dir( $blocks_dir ) ) {
		return;
	}

	$block_files = glob( trailingslashit( $blocks_dir ) . '*/block.json' );

	if ( false === $block_files ) {
		return;
	}

	foreach ( $block_files as $block_json ) {
		if ( is_readable( $block_json ) ) {
			register_block_type( dirname( $block_json ) );
		}
	}
}
add_action( 'init', 'theme_blocks_register_blocks' );

/**
 * Add a separate category for plugin blocks.
 *
 * @param array<int, array<string, mixed>> $categories Existing block categories.
 * @return array<int, array<string, mixed>>
 */
function theme_blocks_register_category( array $categories ): array {
	foreach ( $categories as $category ) {
		if ( isset( $category['slug'] ) && 'theme-blocks' === $category['slug'] ) {
			return $categories;
		}
	}

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
