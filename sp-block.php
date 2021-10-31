<?php
/**
 * Plugin Name:       StorePress Block
 * Description:       Custom gutenberg block for StorePress
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            voboghure
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sp-block
 *
 * @package           sp-block
 */

/**
 * Registers the block
 */
function sp_block_init() {
	// register_block_type( __DIR__ );

	register_block_type(
		__DIR__,
		[
			'attributes'      => [
				'blockText' => [
					'default' => 'SP Block Plugin – hello from the editor!',
					'type'    => 'string',
				],
				'blockInput' => [
					'default' => 'This is funny',
					'type' => 'string',
				]
			],
			'render_callback' => 'render_callback_blog_post',
		]
	);
}
add_action( 'init', 'sp_block_init' );

function render_callback_blog_post( $attributes, $content ) {
	$block_text = esc_html( $attributes['blockText'] );
	// log_it($attributes);
	return "<p class='sp-block-dynamic-blog-post'>$block_text</p>";
}

function wholesomecode_wholesome_plugin_remove_blocks_in_draft( $pre_render, $block ) {

	// If we are in the admin interface, bail.
	if ( is_admin() ) {
		return $pre_render;
	}

	// If the block is draft, do not render.
	if (
		isset( $block['attrs'] ) &&
		isset( $block['attrs']['isBlockDraft'] ) &&
		$block['attrs']['isBlockDraft']
	) {
		return false;
	}

	// Otherwise, render the block.
	return $pre_render;
}
add_filter( 'pre_render_block', 'wholesomecode_wholesome_plugin_remove_blocks_in_draft', 0, 2 );

/**
 * Create custom category
 */
function sp_block_categories( $categories ) {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'storepress-blocks',
				'title' => __( 'StorePress Blocks', 'sp-block' ),
			],
		]
	);
}
add_filter( 'block_categories_all', 'sp_block_categories' );

/**
 * Log function to view any data in wp-content/debug.log
 * uses: log_it($variable);
 */
if ( ! function_exists( 'log_it' ) ) {
	function log_it( $message ) {
		if ( WP_DEBUG === true ) {
			if ( is_array( $message ) || is_object( $message ) ) {
				error_log( "\r\n" . print_r( $message, true ) );
			} else {
				error_log( $message );
			}
		}
	}
}
