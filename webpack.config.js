let defaultConfig = require('@wordpress/scripts/config/webpack.config');
let path = require('path');
let { globSync } = require('glob');

let entries = {};

for (let file of globSync('blocks/*/src/index.js')) {
	let blockDirectory = path.dirname(path.dirname(file));
	let blockName = path.basename(blockDirectory);

	entries[`${blockName}/index`] = path.resolve(__dirname, file);
}

module.exports = {
	...defaultConfig,
	entry: entries,
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		clean: true,
	},
};