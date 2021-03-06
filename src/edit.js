import { __ } from '@wordpress/i18n';

import { ContrastChecker, InspectorControls, PanelColorSettings, RichText, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
// import { useState } from '@wordpress/element';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	// console.log(attributes);
	const { blockColumns, blockRows, blockSize, blockBackground, blockColor, blockText, isBlockDraft } = attributes;

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody
						title = { __( 'Column & Row', 'sp-block' ) }
						icon = "grid-view"
					>
						<RangeControl
							label = "Columns"
							value = { blockColumns }
							onChange = { ( blockColumns ) => setAttributes( { blockColumns } ) }
							min = { 1 }
							max = { 10 }
						/>
						<RangeControl
							label = "Rows"
							value = { blockRows }
							onChange = { ( blockRows ) => setAttributes( { blockRows } ) }
							min = { 1 }
							max = { 10 }
						/>
					</PanelBody>
					{/* <PanelBody
						title = { __( 'Select Product', 'sp-block' ) }
						icon = "admin-plugins"
					>
						<SelectControl
							label = "Size"
							value = { blockSize }
							options = { [
								{ label: 'Big', value: '100%' },
								{ label: 'Medium', value: '50%' },
								{ label: 'Small', value: '25%' },
							] }
							onChange = { ( blockSize ) => setAttributes({ blockSize }) }
						/>
					</PanelBody> */}
					{/* <PanelBody
						title = { __( 'Block Content', 'sp-block' ) }
						icon = "admin-plugins"
					>
						<TextControl
							label = { __( 'Example Meta', 'sp-block' ) }
							help = { __( 'This is an example meta field.', 'sp-block' ) }
							onChange = { ( blockText ) => setAttributes( { blockText } ) }
							value = { blockText }
						/>
					</PanelBody> */}
					<PanelColorSettings
						title = { __( 'Color Settings', 'sp-block' ) }
						icon = "art"
						initialOpen = { false }
						colorSettings = { [
							{
								value: blockColor,
								onChange: ( blockColor ) =>  setAttributes( { blockColor } ),
								label: __( 'Font Color', 'sp-block' )
							},
							{
								value: blockBackground,
								onChange: ( blockBackground ) =>  setAttributes( { blockBackground } ),
								label: __( 'Background Color', 'sp-block' ),
							}
						] }
					>
							<ContrastChecker
								isLargeText = "false"
								textColor = { blockColor }
								backgroundColor = { blockBackground }
							/>
					</PanelColorSettings>
					<PanelBody
						title = { __( 'Block Display Settings', 'sp-block' ) }
						icon = "visibility"
					>
						<ToggleControl
							checked = { isBlockDraft }
							label = { __( 'Set Block as Draft', 'sp-block' ) }
							help = { __( 'If the block is set to draft it will not show on the front end..', 'sp-block' ) }
							onChange = { ( isBlockDraft ) => setAttributes( { isBlockDraft } ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<p
				{ ...useBlockProps({ className: isBlockDraft ? 'draft-block' : '' }) }
				style={ {
					backgroundColor: blockBackground,
					color: blockColor,
				} }
			>
				{/* <RichText
					className="block__text"
					onChange={ ( blockText ) => setAttributes( { blockText } ) }
					placeholder={ __( 'Block Text', 'sp-block' ) }
					tagName="span"
					value={ blockText }
				/> */}
				<ServerSideRender
                    block="sp-block/dynamic-blog-post"
                    attributes={ attributes }
                />
			</p>
		</>
	);
}
