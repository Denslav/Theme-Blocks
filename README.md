# Theme Blocks

Custom dynamic Gutenberg blocks for WordPress.

The plugin automatically registers every block that contains a `block.json` file inside the `blocks` directory. Block editor assets are written in JavaScript and SCSS, compiled with Webpack, and loaded from the `build` directory. Frontend markup is rendered on the server with PHP.

## Features

- Dynamic Gutenberg blocks rendered with PHP.
- Automatic block discovery from `blocks/*/block.json`.
- Separate **Theme Blocks** category in the block inserter.
- React-based editor interface.
- SCSS support for editor and frontend styles.
- Production and development builds with Webpack.
- WordPress internationalization support.
- Safe frontend output with WordPress escaping functions.

## Requirements

- WordPress 6.3 or newer.
- PHP 7.4 or newer.
- Node.js 18 or newer for development.
- npm 9 or newer for development.

The compiled files from the `build` directory are required on a production website. Node.js and npm are not required when the compiled files are already included in the plugin.

## Installation

### Install as a WordPress plugin

1. Download or clone the repository.
2. Make sure the `build` directory contains the compiled assets.
3. Copy the `theme-blocks` directory to:

   ```text
   wp-content/plugins/theme-blocks
   ```

4. Activate **Theme Blocks** in **WordPress → Plugins**.
5. Open the Gutenberg editor and find the blocks in the **Theme Blocks** category.

### Install from a ZIP archive

1. Create a ZIP archive containing the `theme-blocks` directory.
2. Open **WordPress → Plugins → Add New Plugin → Upload Plugin**.
3. Upload the archive and activate the plugin.

## Development

Open a terminal in the plugin directory and install the dependencies:

```bash
npm install
```

Start the development watcher:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Check the JavaScript source files:

```bash
npm run lint:js
```

## Project structure

```text
theme-blocks/
├── blocks/
│   └── test-block/
│       ├── block.json
│       ├── render.php
│       └── src/
│           ├── components/
│           ├── edit.js
│           ├── editor.scss
│           ├── index.js
│           ├── save.js
│           └── style.scss
├── build/
│   └── test-block/
│       ├── index.asset.php
│       ├── index.css
│       ├── index.js
│       └── style-index.css
├── languages/
├── package.json
├── package-lock.json
├── theme-blocks.php
└── webpack.config.js
```

## Included block

### Test Block

The included example block demonstrates:

- editable title and description;
- button text, URL, and new-tab option;
- image gallery with drag-and-drop sorting;
- repeatable cards with images, titles, and descriptions;
- repeatable list items;
- wide and full alignment support;
- spacing and color controls;
- server-side rendering.

The block name is:

```text
theme/test-block
```

## Adding a new block

Create a new directory inside `blocks`:

```text
blocks/hero/
```

Recommended structure:

```text
blocks/hero/
├── block.json
├── render.php
└── src/
    ├── edit.js
    ├── editor.scss
    ├── index.js
    ├── save.js
    └── style.scss
```

### 1. Add `block.json`

Example:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "theme/hero",
  "version": "1.0.0",
  "title": "Hero",
  "category": "theme-blocks",
  "textdomain": "theme-blocks",
  "editorScript": "file:../../build/hero/index.js",
  "style": "file:../../build/hero/style-index.css",
  "editorStyle": "file:../../build/hero/index.css",
  "render": "file:./render.php",
  "attributes": {},
  "supports": {
    "anchor": true,
    "align": ["wide", "full"],
    "html": false
  }
}
```

The directory name, build path, and Webpack entry name must match:

```text
blocks/hero/
build/hero/
```

### 2. Register the block in JavaScript

`blocks/hero/src/index.js`:

```javascript
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

import './style.scss';
import './editor.scss';

registerBlockType('theme/hero', {
    edit: Edit,
    save,
});
```

For a dynamic block, `save.js` returns `null`:

```javascript
export default function save() {
    return null;
}
```

### 3. Add the PHP render template

`blocks/hero/render.php`:

```php
<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'theme-hero',
    )
);
?>

<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <!-- Block markup -->
</section>
```

Use the appropriate WordPress escaping function for every value:

- `esc_html()` for plain text;
- `esc_attr()` for attributes;
- `esc_url()` for URLs;
- `wp_kses_post()` for controlled rich text;
- `wp_get_attachment_image()` for media-library images.

### 4. Build the assets

```bash
npm start
```

or:

```bash
npm run build
```

Webpack automatically finds every file matching:

```text
blocks/*/src/index.js
```

The generated files will be placed in:

```text
build/<block-directory>/
```

No PHP registration code is required for each new block. The plugin automatically registers all directories containing a valid `block.json` file.

## Dynamic rendering

The plugin uses dynamic blocks. Gutenberg stores the block attributes in the post content, while the frontend markup is generated by `render.php`.

This approach allows you to:

- update frontend markup without resaving every post;
- use WordPress APIs during rendering;
- output responsive images with attachment IDs;
- sanitize and validate attributes on the server;
- display dynamic data.

## Translations

The plugin text domain is:

```text
theme-blocks
```

PHP strings should use WordPress translation functions:

```php
__( 'Theme Blocks', 'theme-blocks' );
```

JavaScript strings should use `@wordpress/i18n`:

```javascript
import { __ } from '@wordpress/i18n';

let label = __('Add image', 'theme-blocks');
```

Translation files can be stored in the `languages` directory.

## Troubleshooting

### The block does not appear in Gutenberg

Check that:

- the plugin is active;
- the block has a valid `block.json` file;
- the `name` property is unique;
- the files referenced by `editorScript`, `style`, and `editorStyle` exist;
- the corresponding directory exists in `build`;
- the production build completed without errors.

### Webpack creates `build/undefined`

Use `path.dirname()` and `path.basename()` to determine block directory names. Do not split paths manually with `/`, because Windows uses backslashes.

The included `webpack.config.js` already handles Windows, Linux, and macOS paths.

### npm tries to use an unavailable private registry

Check the current registry:

```bash
npm config get registry
```

It should normally return:

```text
https://registry.npmjs.org/
```

The included `.npmrc` sets the official npm registry for this project.

### Styles do not update

Stop the watcher and rebuild the assets:

```bash
npm run build
```

Then clear the browser cache and any WordPress caching plugin.

## Author

**Den Slav**

## Version

Current plugin version: **1.1.1**

## License

A license has not yet been specified. Add a `LICENSE` file before distributing the plugin as an open-source project.
