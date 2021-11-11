import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import Edit from './edit';

registerBlockType( 'sp-block/dynamic-blog-post', {
	title: __( 'Dynamic Blog Post' ),

	description: __( 'A block for Blog Post.' ),

	category: 'storepress-blocks',

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: () => null,

	attributes: {
		blockColumns: {
			default: 1,
			type: 'number'
		},
		blockRows: {
			default: 1,
			type: 'number'
		},
		// blockSize: {
		// 	default: '',
		// 	type: 'string',
	  	// },
		blockText: {
			default: 'SP Block Plugin – hello from the editor!',
			type: 'string',
	  	},
		blockColor: {
			type: 'string',
		},
		blockBackground: {
			type: 'string',
		},
		isBlockDraft: {
			default: false,
			type: 'boolean',
		}
	},
} );
