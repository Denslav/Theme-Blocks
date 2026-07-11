<?php
/**
 * Server-side render template for the Test Block.
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$title          = isset( $attributes['title'] ) ? (string) $attributes['title'] : '';
$description    = isset( $attributes['description'] ) ? (string) $attributes['description'] : '';
$button_text    = isset( $attributes['buttonText'] ) ? (string) $attributes['buttonText'] : '';
$button_url     = isset( $attributes['buttonUrl'] ) ? (string) $attributes['buttonUrl'] : '';
$button_new_tab = ! empty( $attributes['buttonNewTab'] );
$images         = isset( $attributes['images'] ) && is_array( $attributes['images'] ) ? $attributes['images'] : array();
$cards          = isset( $attributes['cards'] ) && is_array( $attributes['cards'] ) ? $attributes['cards'] : array();
$list           = isset( $attributes['list'] ) && is_array( $attributes['list'] ) ? $attributes['list'] : array();

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'test-block',
	)
);
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="test-content">
		<?php if ( $title ) : ?>
			<h2 class="test-title">
				<?php echo wp_kses_post( $title ); ?>
			</h2>
		<?php endif; ?>

		<?php if ( $description ) : ?>
			<div class="test-description">
				<?php echo wp_kses_post( $description ); ?>
			</div>
		<?php endif; ?>

		<?php if ( $button_text && $button_url ) : ?>
			<a
				class="test-button"
				href="<?php echo esc_url( $button_url ); ?>"
				<?php if ( $button_new_tab ) : ?>
					target="_blank"
					rel="noopener noreferrer"
				<?php endif; ?>
			>
				<?php echo wp_kses_post( $button_text ); ?>
			</a>
		<?php endif; ?>

		<?php if ( $images ) : ?>
			<div class="test-images">
				<?php foreach ( $images as $image ) : ?>
					<?php
					$image_id  = isset( $image['id'] ) ? absint( $image['id'] ) : 0;
					$image_url = isset( $image['url'] ) ? (string) $image['url'] : '';
					$image_alt = isset( $image['alt'] ) ? (string) $image['alt'] : '';

					if ( $image_id ) {
						echo wp_get_attachment_image(
							$image_id,
							'large',
							false,
							array(
								'class'   => 'test-image',
								'loading' => 'lazy',
								'alt'     => $image_alt,
							)
						);
					} elseif ( $image_url ) {
						?>
						<img
							class="test-image"
							src="<?php echo esc_url( $image_url ); ?>"
							alt="<?php echo esc_attr( $image_alt ); ?>"
							loading="lazy"
						>
						<?php
					}
					?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<?php if ( $cards ) : ?>
			<div class="test-cards">
				<?php foreach ( $cards as $card ) : ?>
					<?php
					if ( ! is_array( $card ) ) {
						continue;
					}

					$card_title = isset( $card['title'] ) ? (string) $card['title'] : '';
					$card_text  = isset( $card['text'] ) ? (string) $card['text'] : '';
					$card_image = isset( $card['image'] ) && is_array( $card['image'] ) ? $card['image'] : array();
					$image_id   = isset( $card_image['id'] ) ? absint( $card_image['id'] ) : 0;
					$image_url  = isset( $card_image['url'] ) ? (string) $card_image['url'] : '';
					$image_alt  = isset( $card_image['alt'] ) ? (string) $card_image['alt'] : '';
					?>
					<article class="test-card">
						<?php if ( $image_id ) : ?>
							<?php
							echo wp_get_attachment_image(
								$image_id,
								'medium_large',
								false,
								array(
									'class'   => 'test-card-image',
									'loading' => 'lazy',
									'alt'     => $image_alt,
								)
							);
							?>
						<?php elseif ( $image_url ) : ?>
							<img
								class="test-card-image"
								src="<?php echo esc_url( $image_url ); ?>"
								alt="<?php echo esc_attr( $image_alt ); ?>"
								loading="lazy"
							>
						<?php endif; ?>

						<?php if ( $card_title ) : ?>
							<h3 class="test-card-title">
								<?php echo wp_kses_post( $card_title ); ?>
							</h3>
						<?php endif; ?>

						<?php if ( $card_text ) : ?>
							<div class="test-card-text">
								<?php echo wp_kses_post( $card_text ); ?>
							</div>
						<?php endif; ?>
					</article>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<?php if ( $list ) : ?>
			<ul class="test-list">
				<?php foreach ( $list as $item ) : ?>
					<?php if ( is_string( $item ) && '' !== trim( wp_strip_all_tags( $item ) ) ) : ?>
						<li><?php echo wp_kses_post( $item ); ?></li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>
</section>
