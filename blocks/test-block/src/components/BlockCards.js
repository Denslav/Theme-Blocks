import {
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

function createCardId() {
	let randomPart = Math.random().toString( 36 ).slice( 2, 10 );
	return `card-${ Date.now() }-${ randomPart }`;
}

export default function BlockCards( { cards = [], setAttributes } ) {
	useEffect( () => {
		let requiresNormalization = cards.some( ( card ) => ! card?.itemId );

		if ( ! requiresNormalization ) {
			return;
		}

		let normalizedCards = cards.map( ( card ) => ( {
			...card,
			itemId: card?.itemId || createCardId(),
		} ) );

		setAttributes( { cards: normalizedCards } );
	}, [ cards, setAttributes ] );

	function updateCard( index, field, value ) {
		let newCards = [ ...cards ];

		newCards[ index ] = {
			...newCards[ index ],
			[ field ]: value,
		};

		setAttributes( { cards: newCards } );
	}

	function addCard() {
		let newCards = [
			...cards,
			{
				itemId: createCardId(),
				image: {},
				title: '',
				text: '',
			},
		];

		setAttributes( { cards: newCards } );
	}

	function removeCard( index ) {
		let newCards = cards.filter( ( _, itemIndex ) => itemIndex !== index );
		setAttributes( { cards: newCards } );
	}

	return (
		<div className="edit-container__item edit-container__item--cards">
			<h3 className="edit-container__section-title">
				{ __( 'Cards', 'theme-blocks' ) }
			</h3>

			<div className="edit-container__grid">
				{ cards.map( ( card, index ) => {
					let cardKey = card?.itemId || `card-${ index }`;

					return (
						<div
							key={ cardKey }
							className="edit-container__grid-card"
						>
							<div className="edit-container__grid-card-item">
								{ card.image?.url && (
									<img
										src={ card.image.url }
										alt={ card.image.alt || '' }
									/>
								) }

								<div className="edit-container__grid-card-btns">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( media ) => {
												if ( ! media?.url ) {
													return;
												}

												updateCard( index, 'image', {
													url: media.url,
													alt:
														media.alt ||
														media.alt_text ||
														media.title ||
														'',
													id: media.id,
												} );
											} }
											allowedTypes={ [ 'image' ] }
											value={ card.image?.id }
											render={ ( { open } ) => (
												<Button
													onClick={ open }
													variant="secondary"
												>
													{ card.image?.url
														? __(
																'Change',
																'theme-blocks'
														  )
														: __(
																'Add image',
																'theme-blocks'
														  ) }
												</Button>
											) }
										/>
									</MediaUploadCheck>

									{ card.image?.url && (
										<Button
											isDestructive
											variant="secondary"
											onClick={ () =>
												updateCard( index, 'image', {} )
											}
										>
											{ __(
												'Delete image',
												'theme-blocks'
											) }
										</Button>
									) }
								</div>
							</div>

							<div className="edit-container__grid-card-content">
								<RichText
									tagName="h3"
									value={ card.title || '' }
									onChange={ ( value ) =>
										updateCard( index, 'title', value )
									}
									placeholder={ __(
										'Card title…',
										'theme-blocks'
									) }
								/>

								<RichText
									tagName="p"
									value={ card.text || '' }
									onChange={ ( value ) =>
										updateCard( index, 'text', value )
									}
									placeholder={ __(
										'Card description…',
										'theme-blocks'
									) }
								/>

								<Button
									isDestructive
									variant="secondary"
									onClick={ () => removeCard( index ) }
								>
									{ __( 'Delete card', 'theme-blocks' ) }
								</Button>
							</div>
						</div>
					);
				} ) }
			</div>

			<Button
				variant="primary"
				className="edit-container__card-button"
				onClick={ addCard }
			>
				{ __( 'Add card', 'theme-blocks' ) }
			</Button>
		</div>
	);
}
