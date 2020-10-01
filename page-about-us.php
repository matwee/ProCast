<!-- 
Template Name: About Us Page
-->
<?php
	get_header();
?>



<?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>
    	<div class="title">
    		<h1> <?php the_title(); ?> </h1>
    		<div class="banner-pic"></div>
    	</div>
      <div class="title-bottom">
        <div class="content">
            <p> 
              <?php the_content(); ?> 
            </p>
        </div>
      </div>
   <?php endwhile; ?>
<?php else : ?>
   <?php // When no posts are found, output this text.?>
   <?php  _e( 'Sorry, no posts matched your criteria.' ); ?>
<?php endif; ?>
<?php wp_reset_postdata(); ?>



<?php
	get_footer();
?>
