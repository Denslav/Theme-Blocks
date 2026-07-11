import { RichText } from '@wordpress/block-editor';
import { TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function BlockContent( {
	title,
	description,
	buttonText,
	buttonUrl,
	buttonNewTab,
	setAttributes,
} ) {
	return (
		<div className="edit-container__item edit-container__item--content">
			<RichText
				tagName="h2"
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				placeholder={ __( 'Add title…', 'theme-blocks' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
			/>

			<RichText
				tagName="p"
				value={ description }
				onChange={ ( value ) =>
					setAttributes( { description: value } )
				}
				placeholder={ __( 'Add description…', 'theme-blocks' ) }
			/>

			<RichText
				tagName="span"
				className="edit-container__button"
				value={ buttonText }
				onChange={ ( value ) => setAttributes( { buttonText: value } ) }
				placeholder={ __( 'Button text…', 'theme-blocks' ) }
				allowedFormats={ [] }
			/>

			<div className="edit-container__link-settings">
				<TextControl
					label={ __( 'Button URL', 'theme-blocks' ) }
					value={ buttonUrl || '' }
					onChange={ ( value ) =>
						setAttributes( { buttonUrl: value } )
					}
					type="url"
					placeholder="https://example.com/"
					autoComplete="off"
				/>

				<ToggleControl
					label={ __( 'Open link in a new tab', 'theme-blocks' ) }
					checked={ Boolean( buttonNewTab ) }
					onChange={ ( value ) =>
						setAttributes( { buttonNewTab: value } )
					}
				/>
			</div>
		</div>
	);
}
