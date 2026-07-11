import { RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function BlockList( { list = [], setAttributes } ) {
	function updateItem( index, value ) {
		let newList = [ ...list ];
		newList[ index ] = value;
		setAttributes( { list: newList } );
	}

	function addItem() {
		let newList = [ ...list, '' ];
		setAttributes( { list: newList } );
	}

	function removeItem( index ) {
		let newList = list.filter( ( _, itemIndex ) => itemIndex !== index );
		setAttributes( { list: newList } );
	}

	return (
		<div className="edit-container__item edit-container__item--list">
			<h3 className="edit-container__section-title">
				{ __( 'List', 'theme-blocks' ) }
			</h3>

			{ list.length > 0 && (
				<ul className="edit-container__list">
					{ list.map( ( item, index ) => (
						<li
							key={ `list-item-${ index }` }
							className="edit-container__list-item"
						>
							<RichText
								tagName="span"
								value={ item }
								onChange={ ( value ) =>
									updateItem( index, value )
								}
								placeholder={ __(
									'List item…',
									'theme-blocks'
								) }
							/>

							<Button
								isDestructive
								variant="tertiary"
								onClick={ () => removeItem( index ) }
								label={ __(
									'Delete list item',
									'theme-blocks'
								) }
							>
								×
							</Button>
						</li>
					) ) }
				</ul>
			) }

			<Button onClick={ addItem } variant="secondary">
				{ __( 'Add list item', 'theme-blocks' ) }
			</Button>
		</div>
	);
}
