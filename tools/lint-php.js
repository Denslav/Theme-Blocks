let fs = require( 'fs' );
let path = require( 'path' );
let childProcess = require( 'child_process' );

let ignoredDirectories = new Set( [ '.git', 'node_modules', 'vendor' ] );
let phpFiles = [];

function collectPhpFiles( directory ) {
	let entries = fs.readdirSync( directory, { withFileTypes: true } );

	for ( let entry of entries ) {
		if ( ignoredDirectories.has( entry.name ) ) {
			continue;
		}

		let entryPath = path.join( directory, entry.name );

		if ( entry.isDirectory() ) {
			collectPhpFiles( entryPath );
			continue;
		}

		if ( entry.isFile() && '.php' === path.extname( entry.name ) ) {
			phpFiles.push( entryPath );
		}
	}
}

collectPhpFiles( process.cwd() );

if ( 0 === phpFiles.length ) {
	console.log( 'No PHP files found.' );
	process.exit( 0 );
}

let hasErrors = false;

for ( let phpFile of phpFiles.sort() ) {
	let result = childProcess.spawnSync( 'php', [ '-l', phpFile ], {
		encoding: 'utf8',
	} );

	let output = `${ result.stdout || '' }${ result.stderr || '' }`.trim();

	if ( output ) {
		console.log( output );
	}

	if ( 0 !== result.status ) {
		hasErrors = true;
	}
}

process.exit( hasErrors ? 1 : 0 );
