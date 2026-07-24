=== Theme Blocks ===
Contributors: denslav
Tags: gutenberg, blocks, dynamic blocks, block editor
Requires at least: 6.3
Tested up to: 7.0
Stable tag: 1.1.2
Requires PHP: 7.4
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Registers custom dynamic Gutenberg blocks from individual block directories.

== Description ==

Theme Blocks provides a lightweight structure for developing and registering custom dynamic Gutenberg blocks.

The plugin automatically scans `blocks/*/block.json` and registers every matching block directory. The included Test Block is an example intended to demonstrate editor components, dynamic PHP rendering and compiled assets.

== Installation ==

1. Upload the `theme-blocks` directory to `/wp-content/plugins/`.
2. Activate Theme Blocks through the Plugins screen in WordPress.
3. Open the block editor and locate blocks in the Theme Blocks category.

== Frequently Asked Questions ==

= Is the Test Block required? =

No. It is an example that can be copied and adapted when creating project-specific blocks.

= How do I add another block? =

Create a new directory inside `blocks`, add a valid `block.json`, editor source files and a PHP render file, then run the production build.

= Does the plugin store data outside post content? =

No. The current plugin infrastructure does not create custom database tables or persistent plugin options.

== Changelog ==

= 1.1.2 =

* Improved plugin bootstrap and prevented duplicate block categories.
* Added release, linting and formatting commands.
* Added plugin documentation, translation template and license files.
* Added release archive configuration and repository housekeeping files.
* Left the example Test Block and its compiled assets unchanged.

= 1.1.1 =

* Previous plugin release.
