import { useBlockProps } from '@wordpress/block-editor';

import BlockImages from './components/BlockImages';
import BlockContent from './components/BlockContent';
import BlockCards from './components/BlockCards';
import BlockList from './components/BlockList';

export default function Edit( { attributes, setAttributes } ) {
	let {
		title,
		description,
		buttonText,
		buttonUrl,
		buttonNewTab,
		images = [],
		cards = [],
		list = [],
	} = attributes;

	let blockProps = useBlockProps( {
		className: 'edit-container',
	} );

	return (
		<div { ...blockProps }>
			<BlockContent
				title={ title }
				description={ description }
				buttonText={ buttonText }
				buttonUrl={ buttonUrl }
				buttonNewTab={ buttonNewTab }
				setAttributes={ setAttributes }
			/>

			<BlockImages images={ images } setAttributes={ setAttributes } />

			<BlockCards cards={ cards } setAttributes={ setAttributes } />

			<BlockList list={ list } setAttributes={ setAttributes } />
		</div>
	);
}
