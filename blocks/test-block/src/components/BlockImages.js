import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function createItemId( mediaId = 'image' ) {
	let randomPart = Math.random().toString( 36 ).slice( 2, 10 );
	return `${ mediaId }-${ Date.now() }-${ randomPart }`;
}

export default function BlockImages( { images = [], setAttributes } ) {
	useEffect( () => {
		let requiresNormalization = images.some( ( image ) => ! image?.itemId );

		if ( ! requiresNormalization ) {
			return;
		}

		let normalizedImages = images.map( ( image ) => ( {
			...image,
			itemId: image?.itemId || createItemId( image?.id ),
		} ) );

		setAttributes( { images: normalizedImages } );
	}, [ images, setAttributes ] );

	let reorder = ( list, startIndex, endIndex ) => {
		let result = Array.from( list );
		let [ removed ] = result.splice( startIndex, 1 );
		result.splice( endIndex, 0, removed );
		return result;
	};

	let onDragEnd = ( result ) => {
		if ( ! result.destination ) {
			return;
		}

		if ( result.source.index === result.destination.index ) {
			return;
		}

		let newImages = reorder(
			images,
			result.source.index,
			result.destination.index
		);

		setAttributes( { images: newImages } );
	};

	return (
		<div className="edit-container__item edit-container__item--images">
			<h3 className="edit-container__section-title">
				{ __( 'Images', 'theme-blocks' ) }
			</h3>

			<DragDropContext onDragEnd={ onDragEnd }>
				<Droppable droppableId="theme-block-images">
					{ ( provided ) => (
						<div
							className="edit-container__grid"
							ref={ provided.innerRef }
							{ ...provided.droppableProps }
						>
							{ images.map( ( image, index ) => {
								let draggableId =
									image?.itemId ||
									`${ image?.id || 'image' }-${ index }`;

								return (
									<Draggable
										key={ draggableId }
										draggableId={ draggableId }
										index={ index }
									>
										{ ( dragProvided ) => (
											<div
												className="edit-container__grid-item"
												ref={ dragProvided.innerRef }
												{ ...dragProvided.draggableProps }
												{ ...dragProvided.dragHandleProps }
												style={ {
													...dragProvided
														.draggableProps.style,
												} }
											>
												{ image?.url && (
													<img
														src={ image.url }
														alt={ image.alt || '' }
													/>
												) }

												<div className="edit-container__actions">
													<MediaUploadCheck>
														<MediaUpload
															onSelect={ (
																media
															) => {
																if (
																	! media?.url
																) {
																	return;
																}

																let newImages =
																	[
																		...images,
																	];

																newImages[
																	index
																] = {
																	...newImages[
																		index
																	],
																	url: media.url,
																	id: media.id,
																	alt:
																		media.alt ||
																		media.alt_text ||
																		media.title ||
																		'',
																};

																setAttributes( {
																	images: newImages,
																} );
															} }
															allowedTypes={ [
																'image',
															] }
															value={ image?.id }
															render={ ( {
																open,
															} ) => (
																<Button
																	onClick={
																		open
																	}
																	variant="secondary"
																>
																	{ __(
																		'Change',
																		'theme-blocks'
																	) }
																</Button>
															) }
														/>
													</MediaUploadCheck>

													<Button
														onClick={ () => {
															let newImages =
																images.filter(
																	(
																		_,
																		itemIndex
																	) =>
																		itemIndex !==
																		index
																);
															setAttributes( {
																images: newImages,
															} );
														} }
														variant="secondary"
														isDestructive
													>
														{ __(
															'Delete',
															'theme-blocks'
														) }
													</Button>
												</div>
											</div>
										) }
									</Draggable>
								);
							} ) }

							{ provided.placeholder }
						</div>
					) }
				</Droppable>
			</DragDropContext>

			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) => {
						if ( ! media?.url ) {
							return;
						}

						let newImages = [
							...images,
							{
								itemId: createItemId( media.id ),
								url: media.url,
								id: media.id,
								alt:
									media.alt ||
									media.alt_text ||
									media.title ||
									'',
							},
						];

						setAttributes( { images: newImages } );
					} }
					allowedTypes={ [ 'image' ] }
					render={ ( { open } ) => (
						<Button
							onClick={ open }
							variant="primary"
							className="add-btn"
						>
							{ __( 'Add image', 'theme-blocks' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);
}
