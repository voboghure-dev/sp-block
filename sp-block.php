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
				'blockColumns' => [
					'default' => 1,
					'type'    => 'number',
				],
				'blockRows' => [
					'default' => 1,
					'type'    => 'number',
				],
				// 'blockSize' => [
				// 	'default' => null,
				// 	'type'    => 'string',
				// ],
				'blockText' => [
					'default' => 'SP Block Plugin – hello from PHP!',
					'type'    => 'string',
				],
				'blockColor' => [
					'default' => '',
					'type'    => 'string',
				],
				'blockBackground' => [
					'default' => '',
					'type'    => 'string',
				],
				'isBlockDraft' => [
					'default' => '',
					'type'    => 'string',
				],
			],
			'render_callback' => 'render_callback_blog_post',
		]
	);
}
add_action( 'init', 'sp_block_init' );

function render_callback_blog_post( $attributes, $content ) {
	// Get external products.
	$limit = (int) $attributes['blockColumns'] * (int) $attributes['blockRows'];
	// log_it($limit);
	$args = array(
		'type'  => 'bundle',
		'limit' => $limit,
		'order' => 'DESC',
	);
	$products = wc_get_products( $args );
	ob_start();
	foreach ( $products as $product ) {
		echo '<div class="pb-wc-product-bundles-item">';

		echo '<div class="pb-wc-product-bundles-item-image">';
		echo $product->get_image( 'woocommerce_thumbnail', array( 'class' => 'bundle_image' ) );
		echo '</div>';

		echo '<div class="pb-wc-product-bundles-item-name">';
		echo $product->get_name();
		echo '</div>';

		echo '<div class="pb-wc-product-bundles-item-short-desc">';
		echo $product->get_short_description();
		echo '</div>';

		echo '</div>';
	}
	// log_it($attributes);
	return ob_get_clean();

}

function sp_remove_blocks_in_draft( $pre_render, $block ) {

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
// add_filter( 'pre_render_block', 'sp_remove_blocks_in_draft', 0, 2 );

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
