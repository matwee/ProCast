<?php
	get_header();
?>

<article class='single-product'>
	<?php if ( have_posts() ) : ?>
	    <?php while ( have_posts() ) : the_post(); ?>
	
	<div class="pic">
			<?php the_content(); ?>
	</div>
			
	<div class="product-info">

		<h3> <?php the_title(); ?> </h3>

	   <?php endwhile; ?>
	<?php else : ?>
	   <?php // When no posts are found, output this text.?>
	   <?php  _e( 'Sorry, no posts matched your criteria.' ); ?>
	<?php endif; ?>
	<?php wp_reset_postdata(); ?>

	<?php global $wp_query; ?>
	<?php $postid = $wp_query->post->ID; ?>

		<h4> $<?php echo get_post_meta($postid, 'price', true); ?> </h4>

		<p> <?php echo get_post_meta($postid, 'description', true); ?> </p>

		<div class="btn-wrapper">
			<button class="bag-btn" data-id=<?php echo get_post_meta($postid, 'id', true); ?> >
				<i class="fas fa-shopping-cart"></i>
				Add to Cart
			</button>
		</div>
	</div>
	
	<?php wp_reset_query(); ?>
</article>

<?php
	get_footer();
?>
