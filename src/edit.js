import { __ } from '@wordpress/i18n';

import { ContrastChecker, InspectorControls, PanelColorSettings, RichText, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { blockBackground, blockColor, blockText, isBlockDraft } = attributes;

	return [

		<InspectorControls>
			<Panel>
				<PanelBody
					title={ __( 'Block Content Settings', 'sp-block' ) }
					icon="admin-plugins"
				>
					<TextControl
						label={ __( 'Example Meta', 'sp-block' ) }
						help={ __( 'This is an example meta field.', 'sp-block' ) }
						onChange={ ( blockText ) => setAttributes( { blockText } ) }
						value={ blockText }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Block Color Settings', 'sp-block' ) }
					icon="art"
					initialOpen={ false }
					colorSettings={ [
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
					] }>
						<ContrastChecker
							isLargeText="false"
							textColor={blockColor}
							backgroundColor={blockBackground}
						/>
				</PanelColorSettings>
				<PanelBody
					title={ __( 'Block Display Settings', 'wholesome-plugin' ) }
					icon="visibility"
				>
					<ToggleControl
						checked={ isBlockDraft }
						label={ __( 'Set Block as Draft', 'wholesome-plugin' ) }
						help={ __( 'If the block is set to draft it will not show on the front end..', 'wholesome-plugin' ) }
						onChange={ ( isBlockDraft ) => setAttributes( { isBlockDraft } ) }
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>,

		<p
			{ ...useBlockProps({ className: isBlockDraft ? 'draft-block' : '' }) }
			style={ {
				backgroundColor: blockBackground,
				color: blockColor,
			} }
		>
			<RichText
				className="block__text"
				onChange={ ( blockText ) => setAttributes( { blockText } ) }
				placeholder={ __( 'Block Text', 'sp-block' ) }
				tagName="span"
				value={ blockText }
			/>
		</p>

	];
}
